import Mapbox from "@rnmapbox/maps";
import { useState } from "react";

Mapbox.setAccessToken(process.env["EXPO_PUBLIC_MAPBOX_TOKEN"] || null);
export const GeofenceMap = () => {
  const [polygonCoords, setPolygonCoords] = useState<number[][]>([[0, 0]]);

  const handlePress = (e: { geometry: any }) => {
    const { geometry } = e;
    setPolygonCoords([...polygonCoords, geometry.coordinates]);
  };

  return (
    <Mapbox.MapView style={{ flex: 1 }} onPress={handlePress}>
      <Mapbox.Camera zoomLevel={15} centerCoordinate={[-58.41, -34.61]} />
    </Mapbox.MapView>
  );
};
