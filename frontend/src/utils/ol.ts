import { Extent } from "ol/extent";
import { transformExtent } from "ol/proj";
import { kml as toGeoJson } from "@tmcw/togeojson";
import {
  Geometry,
  LineString,
  LinearRing,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from "ol/geom";
import { Feature } from "ol";
import { GeoJSON, KML, WKT } from "ol/format";
import * as turfHelpers from "@turf/helpers";
import JSZip from "jszip";
import JSZipSync from "jszip-sync";
import BaseLayer from "ol/layer/Base";
import LayerGroup from "ol/layer/Group";
import { Coordinate } from "ol/coordinate";
import { Layer } from "ol/layer";
import { TileWMS } from "ol/source";

export const indiaExtent4326: Extent = [68.11, 6.4, 96.41, 37.5];
export const indiaExtent3857 = transformExtent(
  indiaExtent4326,
  "EPSG:4326",
  "EPSG:3857"
);
export const jammuExtent4326: Extent = [73.34, 32.25, 76.8, 35.18];
export const jammuExtent3857 = transformExtent(
  jammuExtent4326,
  "EPSG:4326",
  "EPSG:3857"
);

export const readKmlFromFile = async (kmlOrKmzFile: File) => {
  let kmlText: string = "";
  if (kmlOrKmzFile.type === "application/vnd.google-earth.kmz") {
    const buffer = await kmlOrKmzFile.arrayBuffer();
    kmlText = await readKmlFromKmzBuffer(buffer);
  } else {
    kmlText = await kmlOrKmzFile.text();
  }
  return kmlText;
};

const jszip = new JSZip();

export const readKmlFromKmzBuffer = async (buffer: ArrayBuffer) => {
  let kmlData: string = "";
  await jszip.loadAsync(buffer);
  const kmlFile = jszip.file(/\.kml$/i)[0];
  if (kmlFile) {
    kmlData = await kmlFile.async("string");
  }
  return kmlData || "";
};

export const kmlToGeoJson = (kmlText: string) => {
  const kmlDoc = new DOMParser().parseFromString(kmlText, "text/xml");
  const converted = toGeoJson(kmlDoc);
  return converted;
};

const takeFirstTwo = (point: Coordinate) => point.slice(0, 2);

export const to2dGeometry = (geometry: Geometry) => {
  const cloned = geometry.clone();
  if (cloned instanceof Point) {
    cloned.setCoordinates((geometry as Point).getCoordinates().slice(0, 2));
  } else if (
    cloned instanceof LineString ||
    cloned instanceof MultiPoint ||
    cloned instanceof LinearRing
  ) {
    cloned.setCoordinates((geometry as LineString).getCoordinates().map(takeFirstTwo));
  } else if (cloned instanceof Polygon || cloned instanceof MultiLineString) {
    cloned.setCoordinates(
      (geometry as Polygon).getCoordinates().map((polygon) => polygon.map(takeFirstTwo))
    );
  }
  return cloned;
};

const jsZipSync = new JSZipSync();

export function getKMLData(buffer: ArrayBuffer) {
  const kmlData = jsZipSync.sync(() => {
    let text = "";
    jsZipSync.loadAsync(buffer).then(() => {
      const kmlFile = jsZipSync.file(/\.kml$/i)[0];
      kmlFile.async("string").then((kmlText: string) => {
        text = kmlText;
      });
    });
    return text;
  });
  return kmlData;
}

async function getKMLImage(href) {
  const index = window.location.href.lastIndexOf("/");
  if (index !== -1) {
    const kmlFile = jszip.file(href.slice(index + 1));
    if (kmlFile) {
      const buffer = await kmlFile.async("arraybuffer");
      return URL.createObjectURL(new Blob([buffer]));
    }
  }
  return href;
}

export class KMZ extends KML {
  constructor(opt_options: ConstructorParameters<typeof KML>[0]) {
    const options = opt_options || {};
    super(options);
  }

  getType() {
    return "arraybuffer" as const;
  }

  readFeature(
    source: Document | Element | Object | string,
    options: Parameters<KML["readFeature"]>[1]
  ) {
    const kmlData = getKMLData(source);
    return super.readFeature(kmlData, options);
  }

  readFeatures(
    source: Document | Element | Object | string,
    options: Parameters<KML["readFeatures"]>[1]
  ) {
    const kmlData = getKMLData(source);
    return super.readFeatures(kmlData, options);
  }
}

export const isLayerGroup = (layer: BaseLayer): layer is LayerGroup =>
  layer instanceof LayerGroup;

export const makeFeatures = (featureCollectionJson: any) =>
  new GeoJSON({
    featureProjection: "EPSG:3857",
    dataProjection: "EPSG:4326",
  }).readFeatures(featureCollectionJson);

export const generateCql = (
  selectedAgencies: string[],
  selectedStatuses: string[],
  selectedSanctions: string[],
  selectedFundings: string[],
  selectedSpecs: string[]
) => {
  const cqlParts = [
    selectedAgencies.map((agency) => `owner='${agency}'`).join(" OR "),
    selectedStatuses.map((status) => `status_f='${status}'`).join(" OR "),
    selectedSanctions.map((status) => `sanction_a='${status}'`).join(" OR "),
    selectedFundings.map((status) => `funding__1='${status}'`).join(" OR "),
    selectedSpecs.map((status) => `specificat='${status}'`).join(" OR "),
  ];
  const nonEmptyParts = cqlParts.filter((part) => part.trim().length > 0);
  if (nonEmptyParts.length === 1) {
    return nonEmptyParts[0];
  }
  return nonEmptyParts.map((part) => `(${part})`).join(" AND ");
};

export const updateLayerCql = (
  layer: Layer,
  cql: string | null,
  visibility: boolean
) => {
  const params = (layer.getSource() as TileWMS).getParams();
  params.CQL_FILTER = cql;
  (layer.getSource() as TileWMS).updateParams(params);
  (layer.getSource() as TileWMS).refresh();
  layer.changed();
  layer.setVisible(visibility);
};
