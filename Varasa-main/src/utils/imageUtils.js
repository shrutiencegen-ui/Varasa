const BACKEND_URL = "https://varasa-1.onrender.com";

export function getImageUrl(path) {
  if (!path) return "";

  if (path.startsWith("http")) return path;

  return BACKEND_URL + path;
}