import { auth } from "../firebase";

let serverURL = "https://serene-galileo-f84e05.netlify.app";

function getUrl(path) {
  const url = new URL(serverURL);
  url.pathname = [".netlify/functions", path].join("/");
  return url;
}

export default {
  get users() {
    return getUrl("users");
  },
  get role() {
    return getUrl("role");
  },
  get timestamp() {
    return getUrl("timestamp");
  },

  useEmulator(url) {
    serverURL = url || [location.protocol, location.host].join("/");
  },
};
