export const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const token = window.sessionStorage.getItem("-__-");
  return token && token.trim().length > 0 && token;
};
