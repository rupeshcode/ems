import { eQuery } from "@utils/json-to-layers";
import { fetchGis } from "./fetcher";
import { owsurl } from "@components/GisMap/layer-groups/layer-urls";

export const fetchFeaturesFromWfs = async (
  layerName: string,
  bbox?: string,
  cql?: string,
  signal?: AbortSignal
) => {
  const wfsUrl =
    `${owsurl}?service=WFS&version=1.0.0&request=GetFeature&typeName=${layerName}&SRSName=EPSG:4326&outputFormat=application/json` +
    (bbox ? `&bbox=${bbox},EPSG:3857` : ``) +
    (cql ? `&CQL_FILTER=${cql}` : "");
  const res = await fetchGis(await eQuery(wfsUrl), { signal });
  return (await res.json()) as any;
};
