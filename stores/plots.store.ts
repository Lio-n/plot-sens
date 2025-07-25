import { Plot } from "@/helpers/parserPolygonFeature.helper";
import { create } from "zustand";

interface PlotState {
  plots: Plot[];
  savePlot: (newPlot: Plot) => void;
  removePlot: (_ID: number) => void;
}

export const usePlotStore = create<PlotState>((set) => ({
  plots: [],
  savePlot: (newPlot: Plot) => {
    try {
      set((state) => ({ plots: [...state.plots, newPlot] }));
    } catch (error) {
      console.error("Error getting location:", error);
    }
  },
  removePlot: (_ID: number) => {
    try {
      set((state) => {
        const newPlots = state.plots.filter((item) => item._ID !== _ID);

        return { plots: newPlots };
      });
    } catch (error) {
      console.error("Error getting location:", error);
    }
  },
}));
