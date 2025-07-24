import Mapbox from "@rnmapbox/maps";
import * as turf from "@turf/turf";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const SHAPE_SOURCE: GeoJSON.Feature = {
  geometry: {
    coordinates: [0, 0],
    type: "Point",
  },
  properties: {},
  type: "Feature",
};

const GEOMETRY_TYPE = {
  Polygon: {
    id: "polygonID",
    style: {
      fillColor: "rgba(0,150,255,0.3)",
      fillOutlineColor: "#007AFF",
    },
  },
  LineString: {
    id: "lineID",
    style: { lineColor: "#007AFF", lineWidth: 3 },
  },
  Point: {
    id: "pointID",
    style: { iconImage: "marker-15", iconSize: 1.5 },
  },
};

interface GEOMETRY_SHAPE {
  Polygon: GeoJSON.Feature;
  LineString: GeoJSON.Feature;
  Point: GeoJSON.Feature;
}

interface GEOSHAPES {
  points: number[][];
  geoType: "Point" | "LineString" | "Polygon";
}

const renderGeoType = (
  geoType: "Point" | "LineString" | "Polygon"
): React.JSX.Element => {
  switch (geoType) {
    case "Polygon":
      return (
        <Mapbox.FillLayer
          id="POLYGON_POINT_FILL"
          sourceID="GEO_SHAPE"
          style={{
            fillColor: "rgba(0,150,255,0.3)",
            fillOutlineColor: "#007AFF",
          }}
        />
      );
    case "LineString":
      return (
        <Mapbox.LineLayer
          id="LINESTRING_POINT_FILL"
          sourceID="GEO_SHAPE"
          style={{
            lineColor: "#007AFF",
            lineWidth: 4,
            lineOpacity: 0.8,
            lineJoin: "round",
            lineCap: "round",
            lineDasharray: [2, 4],
          }}
        />
      );
    default:
      return (
        <Mapbox.SymbolLayer
          id="POINT_FILL"
          sourceID="GEO_SHAPE"
          style={{ iconImage: "marker-11", iconSize: 2 }}
        />
      );
  }
};

const GeoShapes = ({ points, geoType }: GEOSHAPES) => {
  const GEOMETRY_SHAPE: GEOMETRY_SHAPE = {
    Polygon: {
      ...SHAPE_SOURCE,
      geometry: {
        type: "Polygon",
        coordinates: [[...points, points[0]]],
      },
    },
    LineString: {
      ...SHAPE_SOURCE,
      geometry: {
        type: "LineString",
        coordinates: points,
      },
    },
    Point: {
      ...SHAPE_SOURCE,
      geometry: {
        type: "Point",
        coordinates: points[0],
      },
    },
  };

  if (!points.length) return null;

  return (
    <View>
      <Mapbox.MarkerView coordinate={points[0]}>
        <View
          style={{
            width: 10,
            height: 10,
            backgroundColor: "#ff2a00df",
            borderRadius: 20,
          }}
        ></View>
      </Mapbox.MarkerView>

      {points.length >= 2 && (
        <>
          <Mapbox.ShapeSource id="GEO_SHAPE" shape={GEOMETRY_SHAPE[geoType]}>
            {renderGeoType(geoType)}
          </Mapbox.ShapeSource>
          <Mapbox.MarkerView coordinate={points[points.length - 1]}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: "#ff00f783",
                borderRadius: 20,
              }}
            ></View>
          </Mapbox.MarkerView>
        </>
      )}
    </View>
  );
};

const PolygonCollection = ({ points }: Pick<GEOSHAPES, "points">) => {
  const [shapeSource, setShapeSource] = useState<GeoJSON.FeatureCollection>({
    type: "FeatureCollection",
    features: [SHAPE_SOURCE],
  });
  const [centroid, setCentroid] = useState<GeoJSON.Feature>();
  const [area, setArea] = useState<string>();

  useEffect(() => {
    setShapeSource({
      type: "FeatureCollection",
      features: [
        ...shapeSource.features,
        {
          ...SHAPE_SOURCE,
          geometry: {
            type: "Polygon",
            coordinates: [points],
          },
        },
      ],
    });

    const centroid = turf.centroid({
      ...SHAPE_SOURCE,
      geometry: {
        type: "Polygon",
        coordinates: [points],
      },
    });

    const area = turf.area({
      ...SHAPE_SOURCE,
      geometry: {
        type: "Polygon",
        coordinates: [points],
      },
    });

    setArea(area.toFixed(0));
    setCentroid(centroid);
  }, [points]);

  return (
    <>
      <Mapbox.ShapeSource id="POLYGON_COLLECTION" shape={shapeSource}>
        <Mapbox.FillLayer
          id="POLYGON_COLLECTION_POINT_FILL"
          style={{
            fillColor: "rgba(223, 34, 204, 0.61)",
            fillOutlineColor: "#3ce712ff",
          }}
        />
      </Mapbox.ShapeSource>
      {centroid?.geometry && (
        <Mapbox.MarkerView coordinate={centroid.geometry.coordinates}>
          <View
            style={{ backgroundColor: "white", padding: 6, borderRadius: 4 }}
          >
            <Text>{area} m2</Text>
          </View>
        </Mapbox.MarkerView>
      )}
    </>
  );
};

export { PolygonCollection };
export default GeoShapes;

const styles = StyleSheet.create({
  shape: {},
  layer: {},
});
