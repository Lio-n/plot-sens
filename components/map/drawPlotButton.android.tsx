import { Ionicons } from "@react-native-vector-icons/ionicons";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

const DrawPlotButton = (
  props: React.PropsWithoutRef<TouchableOpacityProps> &
    React.RefAttributes<View> & { isDrawing: boolean }
) => {
  return (
    <TouchableOpacity style={[styles.locationButton]} {...props}>
      <Ionicons
        name={props.isDrawing ? "leaf" : "leaf-outline"}
        size={24}
        color={props.isDrawing ? "red" : "black"}
      />
    </TouchableOpacity>
  );
};

export default DrawPlotButton;

const styles = StyleSheet.create({
  locationButton: {
    position: "absolute",
    backgroundColor: "white",
    bottom: 20,
    left: 20,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    zIndex: 99,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
});
