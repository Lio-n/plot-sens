Point -> LineString -> Polygon
https://github.com/nitaliano/react-native-mapbox-gl/blob/v6/example/src/components/GeoJSONSource.js
ICON_IMAGE = https://api.mapbox.com/styles/v1/mapbox/streets-v11/sprite@2x.json?access_token=sk.eyJ1IjoibGlvLW4iLCJhIjoiY21kYnJ6b3ZqMDNzdzJsb2liOGg1Y2VibiJ9.TCAfwIUmASphf7cDS-yi9Q
CALC_AREA = https://www.calcmaps.com/map-area/
<Mapbox.ShapeSource id="smileyFaceSource" shape={smileyFaceGeoJSON}>
<Mapbox.FillLayer
id="smileyFaceFill"
style={{
            fillAntialias: true,
            fillColor: "white",
            fillOutlineColor: "rgba(255, 255, 255, 0.84)",
          }}/>
</Mapbox.ShapeSource>

// El proceso deberia de ser el siguiente, al tocar el mapa se deberia de añadir un punto(Point), luego un segundo toque se deberia de forma una linea entre ambos puntos(LineString), y un tercer toque deberia de formar un area(Polygon). Para cerrar el area un tercer toque al punto inicial; Con esto se tendria un area de una parcela

          <Mapbox.ShapeSource id="POLYGON_COLLECTION" shape={polygonTurf}>
            <Mapbox.FillLayer
              id="POLYGON_POINT_FILL"
              style={{
                fillColor: "rgba(223, 34, 204, 0.9)",
                fillOutlineColor: "#3ce712ff",
              }}
            />
          </Mapbox.ShapeSource>

const smileyFaceGeoJSON: GeoJSON.FeatureCollection = {
type: "FeatureCollection",
features: [
{
type: "Feature",
properties: {},
geometry: {
type: "Polygon",
coordinates: [
[
[-50.2734375, 55.578344672182],
[-53.4375, 47.989921667414],
[-42.5390625, 47.989921667414],
[-41.484375, 55.578344672182],
[-50.2734375, 55.578344672182],
],
],
},
},
{
type: "Feature",
properties: {},
geometry: {
type: "Polygon",
coordinates: [
[
[-26.71875, 54.977613670696],
[-27.7734375, 47.517200697839],
[-15.46875, 48.458351882809],
[-18.6328125, 54.977613670696],
[-26.71875, 54.977613670696],
],
],
},
},
{
type: "Feature",
properties: {},
geometry: {
type: "Polygon",
coordinates: [
[
[-52.734375, 39.095962936306],
[-32.34375, 29.840643899834],
[-14.0625, 38.822590976177],
[-14.0625, 30.448673679288],
[-32.34375, 21.943045533438],
[-53.7890625, 28.613459424004],
[-52.734375, 39.095962936306],
],
],
},
},
],
};
