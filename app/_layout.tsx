import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';


export default function RootLayout() {
    const [hasLocationPermissions,sethasLocationPermissions] = useState(false)

  const requestLocationPermission = async  () => 
  {
    try {
const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);

  /*
  ACCESS_COARSE_LOCATION:
    - Access the device’s location at a coarse level of accuracy, typically based on cell tower or WiFi network information.
  ACCESS_FINE_LOCATION : 
    - This permission allows an app to access the device’s location at a fine level of accuracy, using GPS or other satellite-based positioning methods
    - More acurrent than ACCESS_COARSE_LOCATION.
  */

    const hasLocationPermission =
      granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED;

      if (hasLocationPermission) {
        sethasLocationPermissions(true)
        console.log("You can use the location")
        alert("You can use the location");
      } else {
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  useEffect(()=>{

      requestLocationPermission()

  },[])

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
