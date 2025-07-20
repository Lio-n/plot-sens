import Mapbox from '@rnmapbox/maps';
import React from 'react';
import { StyleSheet, View } from 'react-native';

Mapbox.setAccessToken('sk.eyJ1IjoibGlvLW4iLCJhIjoiY21kYnJ6b3ZqMDNzdzJsb2liOGg1Y2VibiJ9.TCAfwIUmASphf7cDS-yi9Q');

const App = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map} logoEnabled={false} attributionEnabled={false}/>
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
  },
  map: {
    width:"100%",
    height:"100%"
  }
});