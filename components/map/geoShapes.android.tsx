import Mapbox from "@rnmapbox/maps";
import { StyleSheet, TouchableOpacity, View } from "react-native";

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
            fillColor: "#41b7c4b5",
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
            lineWidth: 2,
            lineOpacity: 0.8,
            lineJoin: "round",
            lineCap: "round",
            lineDasharray: [1, 2],
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

const GeoShapes = ({
  points,
  geoType,
  onClose,
}: GEOSHAPES & { onClose: () => void }) => {
  const GEOMETRY_SHAPE: GEOMETRY_SHAPE = {
    Polygon: {
      properties: {},
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[...points, points[0]]],
      },
    },
    LineString: {
      properties: {},
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: points,
      },
    },
    Point: {
      properties: {},
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: points[0],
      },
    },
  };

  if (!points.length) return null;

  return (
    <View key="ON_CLOSE">
      <Mapbox.MarkerView coordinate={points[0]} key="ON_CLOSE_MARKER">
        <TouchableOpacity onPressOut={onClose}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: "#ff2a00df",
              alignItems: "center",
              justifyContent: "center",
              borderColor: "#ffffff",
              borderWidth: 2,
            }}
          >
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#ffffff",
              }}
            />
          </View>
        </TouchableOpacity>
      </Mapbox.MarkerView>

      {points.length >= 2 ? (
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
      ) : (
        <></>
      )}
    </View>
  );
};

export default GeoShapes;

const styles = StyleSheet.create({
  shape: {},
  layer: {},
});
//  style={{
//             lineColor: "#007AFF",
//             lineWidth: 4,
//             lineOpacity: 0.8,
//             lineJoin: "round",
//             lineCap: "round",
//             lineDasharray: [2, 4],
//           }}
