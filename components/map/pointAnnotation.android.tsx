import Mapbox from "@rnmapbox/maps";
import { StyleSheet } from "react-native";
import { Marker } from "./data";

const PointAnnotation = (
  props: { data: Marker } & Partial<Mapbox.PointAnnotation>
) => {
  return (
    <>
      <Mapbox.PointAnnotation
        style={styles.point}
        id={props.data.id}
        title={props.data.title}
        coordinate={props.data.coordinates}
        draggable
        {...props}
      >
        <Mapbox.Callout title={props.data.title} />
      </Mapbox.PointAnnotation>
    </>
  );
};

export default PointAnnotation;

const styles = StyleSheet.create({
  point: {},
});
