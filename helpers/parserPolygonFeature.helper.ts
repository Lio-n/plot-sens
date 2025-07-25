import getRandomInt from "@/helpers/randomNumber.helper";
import * as turf from "@turf/turf";

interface Plot {
  _ID: number;
  geo_json: GeoJSON.Feature;
  area: number;
  center_coordinates: GeoJSON.Feature;
}

const parsePolygonFeature = (points: number[][]): Plot => {
  const geo_json: GeoJSON.Feature = {
    properties: {},
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [points],
    },
  };

  const center_coordinates = turf.centroid(geo_json);
  const area = turf.area(geo_json);

  return {
    _ID: getRandomInt(),
    geo_json,
    area,
    center_coordinates,
  };
};

export type { Plot };
export default parsePolygonFeature;
