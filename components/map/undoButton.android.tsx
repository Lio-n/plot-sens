import { Ionicons } from "@react-native-vector-icons/ionicons";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

const UndoButton = (props: TouchableOpacityProps) => {
  return (
    <TouchableOpacity {...props} style={[props.style, styles.locationButton]}>
      <Ionicons name="return-down-back-outline" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default UndoButton;

const styles = StyleSheet.create({
  locationButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
});
