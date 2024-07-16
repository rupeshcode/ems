import { create } from "zustand";
import { createSelectors } from "./create-selectors";
import { persist, createJSONStorage } from "zustand/middleware";
import { Coordinate } from "ol/coordinate";
import VectorSource from "ol/source/Vector";

interface NavigationState {
  terrain3dLayers: { name: string; url: string }[];
  setTerrain3dLayers: (layers: { name: string; url: string }[]) => void;

  kmlKmzWkt: string;
  setKmlKmzWkt: (wkt: string) => void;
  wktLength: number;
  setWktLength: (wktLength: number) => void;

  nocforkmllist: { [key: string]: string | number }[];
  setNocforkmllist: (list: { [key: string]: string | number }[]) => void;

  drawforwkt: string;
  setDrawforwkt: (wkt: string) => void;

  agricultureRequest: string | null;
  setAgricultureRequest: (request: string) => void;

  machineryRequest: string | null;
  setMachineryRequest: (request: string) => void;

  expertCategory: string | null;
  setExpertCategory: (category: string) => void;

  feedbackCategory: string | null;
  setFeedbackCategory: (category: string) => void;

  printData: {
    visibleLayers: (string | VectorSource)[];
    center: Coordinate;
    resolution: number;
    mapTitle: string;
    dataSource: string;
    disclaimer: string;
  };
  setPrintData: (data: {
    visibleLayers: (string | VectorSource)[];
    center: Coordinate;
    resolution: number;
    mapTitle: string;
    dataSource: string;
    disclaimer: string;
  }) => void;

  queryBuilder: string;
  setQueryBuilder: (queryBuilder: string) => void;

  cfpiReportData: { wkt: string; tblname: string; range: string; label: string };
  setCfpiReportData: (cReportData: {
    wkt: string;
    tblname: string;
    range: string;
    label: string;
  }) => void;

  selectedAgencies: string[];
  setSelectedAgencies: (selectedAgencies: string[]) => void;

  selectedStatuses: string[];
  setSelectedStatuses: (selectedStatuses: string[]) => void;

  selectedSanctions: string[];
  setSelectedSanctions: (selectedSanctions: string[]) => void;

  selectedFundings: string[];
  setSelectedFundings: (selectedFundings: string[]) => void;

  selectedSpecs: string[];
  setSelectedSpecs: (selectedSpecs: string[]) => void;

  selectedTitle: string;
  setSelectedTitle: (title: string) => void;

  sidebar: boolean;
  setSidebar: (sidebarState: boolean) => void;
  viewOnMap?: Record<string, any>;
  setViewOnMap: (viewOnMap?: Record<string, any>) => void;
}

const useNavigationStoreBase = create<NavigationState>()(
  persist(
    (set) => ({
      sidebar: true,
      setSidebar: (sidebarState) => set({ sidebar: sidebarState }),

      selectedTitle: "",
      setSelectedTitle: (title: string) => set({ selectedTitle: title }),
      viewOnMap: undefined,
      setViewOnMap: (viewOnMap) => set({ viewOnMap }),

      terrain3dLayers: [],
      setTerrain3dLayers: (layers) => set({ terrain3dLayers: layers }),

      kmlKmzWkt: "",
      setKmlKmzWkt: (wkt: string) => set({ kmlKmzWkt: wkt }),

      wktLength: 0,
      setWktLength: (wktLength: number) => set({ wktLength }),

      nocforkmllist: [],
      setNocforkmllist: (list) => set({ nocforkmllist: list }),

      drawforwkt: "",
      setDrawforwkt: (wkt: string) => set({ drawforwkt: wkt }),

      printData: {
        visibleLayers: [],
        center: [],
        resolution: 0,
        mapTitle: "",
        dataSource: "",
        disclaimer: "",
      },
      setPrintData: (data) => set({ printData: data }),

      queryBuilder: "",
      setQueryBuilder: (queryBuilder: string) => set({ queryBuilder }),

      cfpiReportData: { wkt: "", tblname: "", range: "", label: "" },
      setCfpiReportData: (cReportData) => set({ cfpiReportData: cReportData }),

      selectedAgencies: [],
      setSelectedAgencies: (selectedAgencies: string[]) => set({ selectedAgencies }),

      selectedStatuses: [],
      setSelectedStatuses: (selectedStatuses: string[]) => set({ selectedStatuses }),

      selectedSanctions: [],
      setSelectedSanctions: (selectedSanctions: string[]) => set({ selectedSanctions }),

      selectedFundings: [],
      setSelectedFundings: (selectedFundings: string[]) => set({ selectedFundings }),

      selectedSpecs: [],
      setSelectedSpecs: (selectedSpecs: string[]) => set({ selectedSpecs }),

      agricultureRequest: null,
      setAgricultureRequest: (agricultureRequest) => set({ agricultureRequest }),

      machineryRequest: null,
      setMachineryRequest: (machineryRequest) => set({ machineryRequest }),

      expertCategory: null,
      setExpertCategory: (expertCategory) => set({ expertCategory }),

      feedbackCategory: null,
      setFeedbackCategory: (feedbackCategory: string) => set({ feedbackCategory }),
    }),

    {
      name: "navigation-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useNavigationStore = createSelectors(useNavigationStoreBase);
