type StyleURL = {
  name: string;
  url: string;
};

const STYLES_URL: StyleURL[] = [
  {
    name: "Mapbox Streets",
    url: "mapbox://styles/mapbox/streets-v12",
  },
  {
    name: "Mapbox Outdoors",
    url: "mapbox://styles/mapbox/outdoors-v12",
  },
  {
    name: "Mapbox Light",
    url: "mapbox://styles/mapbox/light-v11",
  },
  {
    name: "Mapbox Dark",
    url: "mapbox://styles/mapbox/dark-v11",
  },
  {
    name: "Mapbox Satellite",
    url: "mapbox://styles/mapbox/satellite-v9",
  },
  {
    name: "Mapbox Satellite Streets",
    url: "mapbox://styles/mapbox/satellite-streets-v12",
  },
  {
    name: "Mapbox Navigation Day",
    url: "mapbox://styles/mapbox/navigation-day-v1",
  },
  {
    name: "Mapbox Navigation Night",
    url: "mapbox://styles/mapbox/navigation-night-v1",
  },
];

export { STYLES_URL };
export type { StyleURL };
