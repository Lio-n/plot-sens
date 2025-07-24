    type Marker = {
    id: string;
    title: string;
    coordinates: [number, number];
    color: string;
  };
  
  const markers: Marker[] = [
    {
      id: "marker1",
      title: "Marker 1",
      coordinates: [-58.0145, -31.326],
      color: "red",
    },
    {
      id: "marker2",
      title: "Marker 2",
      coordinates: [-58.0146, -31.327],
      color: "blue",
    },
  ];

  export { markers };
export type { Marker };
