import Map from "@/components/map/index.android";
import { StyleSheet, View } from "react-native";

const App = () => {
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
