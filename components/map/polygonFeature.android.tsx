import { Plot } from "@/helpers/parserPolygonFeature.helper";
import Mapbox from "@rnmapbox/maps";
import { Text, View } from "react-native";

const PolygonFeature = ({ plot }: { plot: Plot }) => {
  return (
    <>
      <Mapbox.ShapeSource
        id={"POLYGON_FEATURE_" + plot._ID}
        shape={plot?.geo_json}
      >
        <Mapbox.FillLayer
          id={"POLYGON_FEATURE_FILL_" + plot._ID}
          style={{
            fillColor: "rgba(223, 34, 204, 0.61)",
            fillOutlineColor: "#3ce712ff",
          }}
        />
      </Mapbox.ShapeSource>
      <Mapbox.MarkerView
        coordinate={plot?.center_coordinates.geometry.coordinates}
      >
        <View style={{ backgroundColor: "white", padding: 6, borderRadius: 4 }}>
          <Text>{plot?.area.toFixed(0)} m2</Text>
          <Text>ID : {plot?._ID}</Text>
        </View>
      </Mapbox.MarkerView>
    </>
  );
};

export default PolygonFeature;
