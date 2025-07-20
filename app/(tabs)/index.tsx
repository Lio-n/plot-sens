import Mapbox from "@rnmapbox/maps";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
Mapbox.setAccessToken(
  "sk.eyJ1IjoibGlvLW4iLCJhIjoiY21kYnJ6b3ZqMDNzdzJsb2liOGg1Y2VibiJ9.TCAfwIUmASphf7cDS-yi9Q"
);
const ARGENTINA_COORS = [-38.416097, -63.616672];

const App = () => {
  const [userLocation, setUserLocation] = useState([0, 0]);
  const [currLoc, setCurrLoc] = useState(ARGENTINA_COORS);
  const gotToMyLocation = (loc: number[]) => {
    console.log("gotToMyLocation actual:", loc);

    setCurrLoc(loc);
  };

  return (
    <View style={styles.page}>
      <Text style={{ color: "black", fontSize: 24, marginTop: 32 }}>
        lat : {userLocation[0]} - lon : {userLocation[1]}
      </Text>
      <Button
        onPress={() => gotToMyLocation(userLocation)}
        title="Go to my location"
        color="#841584"
      />
      <View style={styles.container}>
        <Mapbox.MapView
          projection="globe"
          style={styles.map}
          logoEnabled={false}
          attributionEnabled={false}
        >
          <Mapbox.UserLocation onUpdate={(location)=>{
            console.log("UserLocation actual:", location);
            if(location.coords.altitude)setUserLocation([location.coords.altitude,location.coords.longitude])}} />
          <Mapbox.Camera
            followZoomLevel={16}
            followUserLocation
            animationMode={"flyTo"}
            centerCoordinate={currLoc}
          />
          {/* <Mapbox.PointAnnotation
            draggable={true}
            id="asd"
            onDragEnd={(feature) => {
              console.log(feature);
            }}
            coordinate={[-32.522779, -55.765835]}
          >
            <View
              style={{
                height: 30,
                width: 30,
                backgroundColor: "#cc0000ff",
                borderRadius: 50,
                borderColor: "#fff",
                borderWidth: 3,
              }}
            />
          </Mapbox.PointAnnotation> */}
        </Mapbox.MapView>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  page: {},
  container: {
    marginTop: 100,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
