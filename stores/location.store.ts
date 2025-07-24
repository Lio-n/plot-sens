import getUserLocation from '@/lib/location';
import * as Location from 'expo-location';
import { create } from 'zustand';

interface LocationState {
  coords: Location.LocationObject['coords'] | null;
  permissionGranted: boolean;
  getLocation: () => Promise<void>;
}

export const useLocationStore = create<LocationState>((set) => ({
  coords: null,
  permissionGranted: false,
  getLocation: async () => {
    try {
     const data = await getUserLocation()
      // console.info("getLocation : ", data);

      set(data);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  },
}));
