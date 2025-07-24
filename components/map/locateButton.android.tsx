import { useLocationStore } from "@/stores/location.store";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { CameraRef } from "@rnmapbox/maps/lib/typescript/src/components/Camera";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

const LocateButton = (
  props: {
    cameraRef: React.RefObject<CameraRef | null>;
  } & TouchableOpacityProps
) => {
  const { coords: userLocation } = useLocationStore();

  return (
    <TouchableOpacity
      onPress={() => {
        if (props.cameraRef.current && userLocation) {
          props.cameraRef.current.setCamera({
            centerCoordinate: [userLocation.longitude, userLocation.latitude],
            zoomLevel: 15,
            animationDuration: 1000,
          });
        }
      }}
      style={[props.style, styles.locationButton]}
    >
      <Ionicons name="locate" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default LocateButton;

const styles = StyleSheet.create({
  locationButton: {
    position: "absolute",
    backgroundColor: "white",
    top: 8,
    left: 8,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    zIndex: 99,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
});
