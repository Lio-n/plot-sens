import { ThemedText } from "@/components/ThemedText";
import parsePolygonFeature from "@/helpers/parserPolygonFeature.helper";
import { useLocationStore } from "@/stores/location.store";
import { usePlotStore } from "@/stores/plots.store";
import Ionicons from "@react-native-vector-icons/ionicons";
import Mapbox from "@rnmapbox/maps";
import * as turf from "@turf/turf";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { markers } from "./data";
import DrawPlotButton from "./drawPlotButton.android";
import GeoShapes from "./geoShapes.android";
import LocateButton from "./locateButton.android";
import PointAnnotation from "./pointAnnotation.android";
import PolygonFeature from "./polygonFeature.android";

const Alert = () => {
  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        top: 0,
        padding: 24,
        zIndex: 99,
        backgroundColor: "#ff0000d7",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Ionicons
        name="alert-circle"
        size={32}
        color="white"
        style={{ verticalAlign: "middle" }}
      />
      <Text
        style={{
          textAlign: "center",
          color: "white",
          fontSize: 24,
          fontWeight: "600",
        }}
      >
        Drawing activated
      </Text>
    </View>
  );
};
Mapbox.setAccessToken(process.env["EXPO_PUBLIC_MAPBOX_TOKEN"] || null);

const getGeoType = (
  pointsCount: number
): "Point" | "LineString" | "Polygon" => {
  switch (pointsCount) {
    case 1:
      return "Point";
    case 2:
      return "LineString";
    default:
      return "Polygon";
  }
};
type POINTS = number[][];

const closePolygon = (points: POINTS, lastCoord: number[]): boolean => {
  let shouldClose = false;

  if (points.length >= 3) {
    const firstPoint = points[0];
    const tappedPoint = turf.point(lastCoord);
    const initialPoint = turf.point(firstPoint);
    const dist = turf.distance(tappedPoint, initialPoint, {
      units: "kilometers",
    });

    // cerca de 10mts
    if (dist < 0.01) shouldClose = true;
  }

  return shouldClose;
};

const Map = () => {
  const { savePlot, plots: plotsStore } = usePlotStore();
  const cameraRef = useRef<Mapbox.Camera>(null);
  const { getLocation, coords: userLocation } = useLocationStore();
  const [points, setPoints] = useState<POINTS>([]);
  const [geoType, setGeoType] = useState<"Point" | "LineString" | "Polygon">(
    "Point"
  );
  const [isDrawing, setIsDrawing] = useState(false);

  // const [polygonCollection, setPolygonCollection] = useState<Plot[]>([]);

  const handleMapPress = (e: GeoJSON.Feature) => {
    const coord = e.geometry.coordinates;

    const shouldClose = closePolygon(points, coord);
    console.info("SHOULD_CLOSE : ", shouldClose);

    if (shouldClose) {
      const newPoints = [...points, points[0]];
      const parsedPolygon = parsePolygonFeature(newPoints);

      // setPolygonCollection([...polygonCollection, parsedPolygon]);
      savePlot(parsedPolygon);
      setPoints([]);
      return;
    }
    const newPoints = [...points, coord];
    const newGeoType = getGeoType(newPoints.length);

    setGeoType(newGeoType);
    setPoints(newPoints);
  };

  useEffect(() => {
    getLocation();
  }, []);

  if (!userLocation) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          margin: 32,
        }}
      >
        <ThemedText>Loading location...</ThemedText>
      </View>
    );
  }
  return (
    <View style={{ position: "relative" }}>
      {isDrawing && <Alert />}
      <LocateButton cameraRef={cameraRef} />
      <DrawPlotButton
        onPress={() => {
          setIsDrawing(!isDrawing);
        }}
        isDrawing={isDrawing}
      />

      <Mapbox.MapView
        onDidFinishLoadingMap={() => {
          cameraRef.current?.setCamera({
            centerCoordinate: [userLocation.longitude, userLocation.latitude],
            zoomLevel: 18,
            animationDuration: 1000,
          });
        }}
        scaleBarEnabled={false}
        compassEnabled
        projection="globe"
        style={styles.map}
        logoEnabled={false}
        attributionEnabled={false}
        onPress={(e) => {
          if (isDrawing) handleMapPress(e);
        }}
      >
        <Mapbox.UserLocation />
        <Mapbox.Camera ref={cameraRef} animationMode={"flyTo"} />

        {markers.map((marker) => (
          <PointAnnotation data={marker} key={marker.id} />
        ))}

        <GeoShapes points={points} geoType={geoType} />
        {!!plotsStore.length &&
          plotsStore.map((item, _i) => <PolygonFeature plot={item} key={_i} />)}
      </Mapbox.MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  point: {},
  smileyFace: {},
});

// Point -> LineString -> Polygon
/*
// https://github.com/nitaliano/react-native-mapbox-gl/blob/v6/example/src/components/GeoJSONSource.js
ICON_IMAGE = https://api.mapbox.com/styles/v1/mapbox/streets-v11/sprite@2x.json?access_token=sk.eyJ1IjoibGlvLW4iLCJhIjoiY21kYnJ6b3ZqMDNzdzJsb2liOGg1Y2VibiJ9.TCAfwIUmASphf7cDS-yi9Q
CALC_AREA = https://www.calcmaps.com/map-area/
        <Mapbox.ShapeSource id="smileyFaceSource" shape={smileyFaceGeoJSON}>
          <Mapbox.FillLayer
            id="smileyFaceFill"
            style={{
              fillAntialias: true,
              fillColor: "white",
              fillOutlineColor: "rgba(255, 255, 255, 0.84)",
            }}
          />
        </Mapbox.ShapeSource>
*/

// El proceso deberia de ser el siguiente, al tocar el mapa se deberia de añadir un punto(Point), luego un segundo toque se deberia de forma una linea entre ambos puntos(LineString), y un tercer toque deberia de formar un area(Polygon). Para cerrar el area un tercer toque al punto inicial; Con esto se tendria un area de una parcela

/*
 {polygonTurf && (
          <Mapbox.ShapeSource id="POLYGON_COLLECTION" shape={polygonTurf}>
            <Mapbox.FillLayer
              id="POLYGON_POINT_FILL"
              style={{
                fillColor: "rgba(223, 34, 204, 0.9)",
                fillOutlineColor: "#3ce712ff",
              }}
            />
          </Mapbox.ShapeSource>
  )}


  const smileyFaceGeoJSON: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-50.2734375, 55.578344672182],
            [-53.4375, 47.989921667414],
            [-42.5390625, 47.989921667414],
            [-41.484375, 55.578344672182],
            [-50.2734375, 55.578344672182],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-26.71875, 54.977613670696],
            [-27.7734375, 47.517200697839],
            [-15.46875, 48.458351882809],
            [-18.6328125, 54.977613670696],
            [-26.71875, 54.977613670696],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-52.734375, 39.095962936306],
            [-32.34375, 29.840643899834],
            [-14.0625, 38.822590976177],
            [-14.0625, 30.448673679288],
            [-32.34375, 21.943045533438],
            [-53.7890625, 28.613459424004],
            [-52.734375, 39.095962936306],
          ],
        ],
      },
    },
  ],
};

*/
