import Map from "ol/Map";
import { create } from "zustand";
import { createSelectors } from "./create-selectors";
import { Layer } from "ol/layer";
import { Coordinate } from "ol/coordinate";
import CropFilter from "ol-ext/filter/Crop";

interface MapState {
  map: Map;
  setMap: (map: Map) => void;

  latLon: Array<number>;
  setLatLon: (latLon: Array<number>) => void;

  drawnCoordinates: Coordinate[];
  setDrawnCoordinates: (coords: Coordinate[]) => void;

  selectedLayers: Array<Layer>;
  setSelectedLayers: (layers: Array<Layer>) => void;

  wfsLayer: string;
  setWfsLayer: (layerName: string) => void;

  clusterLayer: string;
  setClusterLayer: (layerName: string) => void;

  heatMapLayer: string;
  setHeatMapLayer: (layerName: string) => void;

  navigationCropFilter: CropFilter;
  setNavigationCropFilter: (filter: CropFilter) => void;
}

const useMapStoreBase = create<MapState>()((set) => ({
  map: new Map(),
  setMap: (map: Map) => set({ map }),

  drawnCoordinates: [],
  setDrawnCoordinates: (coords) => set({ drawnCoordinates: coords }),

  selectedLayers: [],
  setSelectedLayers: (layers: Array<Layer>) => set({ selectedLayers: layers }),

  latLon: [],
  setLatLon: (latLon: Array<number>) => set({ latLon }),

  wfsLayer: "",
  setWfsLayer: (layerName: string) => set({ wfsLayer: layerName }),

  clusterLayer: "",
  setClusterLayer: (layerName: string) => set({ clusterLayer: layerName }),

  heatMapLayer: "",
  setHeatMapLayer: (layerName: string) => set({ heatMapLayer: layerName }),

  navigationCropFilter: new CropFilter(),
  setNavigationCropFilter: (filter: CropFilter) =>
    set({ navigationCropFilter: filter }),
}));

export const useMapStore = createSelectors(useMapStoreBase);
