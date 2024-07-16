import { BACKEND_API_URL } from "@utils/constants";
import { d, e } from "@utils/crypto";
import { getToken } from "@utils/token";
import ky, { HTTPError } from "ky";
import Router from "next/router";
import { getFingerprint } from "@services/fingerprint";
import nProgress from "nprogress";

interface FetcherProps {
  path: string;
  shouldEncrypt?: boolean;
  shouldDecrypt?: boolean;
}

interface JsonResult {
  message: string;
}

export const gisHeaders = async () => ({
  fp: getFingerprint(),
  ...(process.env.NODE_ENV === "production" && {
    Authorization: `Bearer ${getToken()}`,
  }),
  ...(process.env.NODE_ENV !== "production" && {
    "allow-gis": "%?Y?_TYqc2QM7^p4t#>c",
  }),
});

export const fetchGis = async (url: string, kyOptions?: Parameters<typeof ky>[1]) =>
  ky.get(url, { headers: await gisHeaders() });

export const fetcher = async (
  { path, shouldEncrypt = true, shouldDecrypt = true }: FetcherProps,
  kyOptions?: Parameters<typeof ky>[1]
) => {
  // console.log("before request", path);
  if (shouldEncrypt && kyOptions?.json) {
    // console.log("json body", kyOptions.json);
    kyOptions.json = {
      data: await e(kyOptions.json as object),
    };
    // console.log("encrypted request body", kyOptions.json);
  }
  let json: JsonResult | undefined;
  try {
    nProgress.start();
    json = await ky(BACKEND_API_URL + path, {
      method: kyOptions?.method ?? "POST",
      headers: {
        ...kyOptions?.headers,
        Authorization: `Bearer ${getToken()}`,
        fp: getFingerprint(),
      },
      ...kyOptions,
    }).json<JsonResult>();
  } catch (err) {
    // console.log("error in fetcher");
    // console.log(Object.entries(err));
    if (kyOptions?.signal?.aborted) {
      return null;
    }
    if (err instanceof HTTPError) {
      const { response } = err;
      if (response.status === 401) {
        localStorage.clear();
        sessionStorage.clear();
        Router.push("/login/");
        return null;
      } else if (response.status >= 400 && response.status <= 500) {
        return await response.json();
      } else {
        return {};
      }
    }
  } finally {
    nProgress.done();
  }
  if (!shouldDecrypt) {
    return json;
  }
  // console.log("received response");
  // console.log("json parsed response", json);
  const encJsonString = json?.message;
  // console.log("encJsonString", encJsonString);
  const decJsonString = await d(encJsonString!);
  // console.log("decJsonString", decJsonString);
  const decJson = JSON.parse(decJsonString);
  // console.log("decJson", decJson);
  return decJson;
};
