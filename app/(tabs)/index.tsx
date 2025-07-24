import Map from "@/components/map/index.android";
import { ThemedText } from "@/components/ThemedText";
import { useLocationStore } from "@/stores/location.store";
import { StyleSheet, View } from "react-native";

const App = () => {
  const { coords: userLocation } = useLocationStore();

  return (
    <View style={styles.page}>
      <View style={{ marginTop: 80 }}>
        <ThemedText style={{ fontSize: 28 }}>
          lat : {userLocation?.latitude}
        </ThemedText>
        <ThemedText style={{ fontSize: 28, marginTop: 20 }}>
          lon : {userLocation?.longitude}
        </ThemedText>
      </View>
      <Map />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  page: {},
});
