import { StyleURL } from "@/constants/map.contant";
import { create } from "zustand";

interface MapState {
  stylesURL: StyleURL[];
}

export const useMapStore = create<MapState>((set) => ({
  stylesURL: [],
}));
