import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Plot } from "@/helpers/parserPolygonFeature.helper";
import { usePlotStore } from "@/stores/plots.store";
import Ionicons from "@react-native-vector-icons/ionicons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const CollapsibleItem = ({ item }: { item: Plot }) => {
  const { removePlot } = usePlotStore();

  return (
    <Collapsible title={"_ID : " + item._ID}>
      <TouchableOpacity
        style={{ display: "flex", alignItems: "flex-end" }}
        onPress={() => {
          removePlot(item._ID);
        }}
      >
        <Ionicons name="trash-outline" size={24} color={"#ff4f4fff"} />
      </TouchableOpacity>
      <ThemedText
        style={{
          fontFamily: "SpaceMono",
          color: "#00ffddff",
          fontWeight: "900",
          letterSpacing: 1,
        }}
      >
        Area :{" "}
        <ThemedText type="defaultSemiBold">
          {item.area.toFixed(0)} m2
        </ThemedText>
      </ThemedText>

      <ThemedText
        style={{
          fontFamily: "SpaceMono",
          color: "#00ffddff",
          fontWeight: "900",
          letterSpacing: 1,
        }}
      >
        Center Coordinates :{" "}
        <ThemedText type="defaultSemiBold">
          {item.center_coordinates.geometry.coordinates[0]}
        </ThemedText>{" "}
        <ThemedText type="defaultSemiBold">
          {item.center_coordinates.geometry.coordinates[1]}
        </ThemedText>
      </ThemedText>

      <ThemedText
        style={{
          fontFamily: "SpaceMono",
          color: "#00ffddff",
          fontWeight: "900",
          letterSpacing: 1,
        }}
      >
        Geo JSON :{" "}
      </ThemedText>
      <View
        style={{
          padding: 20,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "#434343ff",
          borderRadius: 10,
        }}
      >
        <ThemedText type="defaultSemiBold" style={{ fontSize: 14 }}>
          {JSON.stringify(item.geo_json, null, 2)}
        </ThemedText>
      </View>
    </Collapsible>
  );
};

export default function PlotScreen() {
  const { plots } = usePlotStore();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons
          name="grid"
          size={250}
          color="#808080"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Plots</ThemedText>
      </ThemedView>

      {plots.length &&
        plots.map((item) => <CollapsibleItem item={item} key={item._ID} />)}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -70,
    left: 5,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
