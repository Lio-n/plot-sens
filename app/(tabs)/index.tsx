import Map from "@/components/map/index.android";
import { useLocationStore } from "@/stores/location.store";
import { StyleSheet, View } from "react-native";

const App = () => {
  const { coords: userLocation } = useLocationStore();

  return (
    <View style={styles.page}>
      <Map />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  page: {},
});
