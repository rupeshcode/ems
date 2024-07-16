export const LAYERS_VISIBLE_BY_DEFAULT = new Set([
  "State",
  "District",
  "Taluka",
  "Village",
]);

export const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKENDURL;

export const SEARCH_INPUT_REGEX = /^[\w\s.,-]{0,}$/;
