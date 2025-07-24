import * as Location from "expo-location";

const getUserLocation = async (): Promise<{
  coords: Location.LocationObjectCoords | null;
  permissionGranted: boolean;
}> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return { coords: null, permissionGranted: false };
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });

    return {
      coords: location.coords,
      permissionGranted: true,
    };
  } catch (error) {
    console.error("Error requesting location permission:", error);
    return { coords: null, permissionGranted: false };
  }
};

export default getUserLocation