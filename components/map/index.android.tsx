import { ThemedText } from "@/components/ThemedText";
import parsePolygonFeature from "@/helpers/parserPolygonFeature.helper";
import { useLocationStore } from "@/stores/location.store";
import { usePlotStore } from "@/stores/plots.store";
import Ionicons from "@react-native-vector-icons/ionicons";
import Mapbox from "@rnmapbox/maps";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { markers } from "./data";
import DrawPlotButton from "./drawPlotButton.android";
import GeoShapes from "./geoShapes.android";
import LocateButton from "./locateButton.android";
import PointAnnotation from "./pointAnnotation.android";
import PolygonFeature from "./polygonFeature.android";
import UndoButton from "./undoButton.android";

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
    case 3:
      return "LineString";
    default:
      return "Polygon";
  }
};
type POINTS = number[][];

const Map = () => {
  const { lat, lng } = useLocalSearchParams();
  const cameraRef = useRef<Mapbox.Camera>(null);
  const { savePlot, plots: plotsStore } = usePlotStore();

  const { getLocation, coords: userLocation } = useLocationStore();
  const [points, setPoints] = useState<POINTS>([]);
  const [geoType, setGeoType] = useState<"Point" | "LineString" | "Polygon">(
    "Point"
  );
  const [isDrawing, setIsDrawing] = useState(false);

  // const [polygonCollection, setPolygonCollection] = useState<Plot[]>([]);

  const closePolygon = (): void => {
    if (points.length >= 2) {
      const newPoints = [...points, points[0]];
      const parsedPolygon = parsePolygonFeature(newPoints);

      // setPolygonCollection([...polygonCollection, parsedPolygon]);
      savePlot(parsedPolygon);
      setPoints([]);
    }
  };

  const handleMapPress = (e: GeoJSON.Feature) => {
    const coord = e.geometry.coordinates;

    const newPoints = [...points, coord];
    const newGeoType = getGeoType(newPoints.length);

    setGeoType(newGeoType);
    setPoints(newPoints);
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (!isDrawing) {
      setPoints([]);
    }
  }, [isDrawing]);

  useEffect(() => {
    if (lat && lng) {
      cameraRef.current?.setCamera({
        centerCoordinate: [Number(lng), Number(lat)],
        zoomLevel: 18,
        animationDuration: 1000,
      });
    }
  }, [lat, lng]);

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
      {isDrawing ? <Alert /> : <></>}

      <View
        style={{
          position: "absolute",
          bottom: 20,
          zIndex: 5,
          left: 20,
          gap: 20,
        }}
      >
        {isDrawing && points.length ? (
          <UndoButton
            onPress={() => {
              if (points) {
                const aux = [...points];

                aux.pop();

                const newGeoType = getGeoType(aux.length);
                setGeoType(newGeoType);
                setPoints(aux);
              }
            }}
          />
        ) : (
          <></>
        )}
        <DrawPlotButton
          onPress={() => {
            setIsDrawing(!isDrawing);
          }}
          isDrawing={isDrawing}
        />
      </View>

      <LocateButton cameraRef={cameraRef} />

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

        <GeoShapes points={points} geoType={geoType} onClose={closePolygon} />
        {!!plotsStore.length ? (
          plotsStore.map((item, _i) => <PolygonFeature plot={item} key={_i} />)
        ) : (
          <></>
        )}
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
