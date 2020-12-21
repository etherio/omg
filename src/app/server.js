import { auth } from "../firebase";

const SERVER_HOST_URL = "https://serene-galileo-f84e05.netlify.app";
// const SERVER_HOST_URL = "http://localhost:8888";

function getUrl(path) {
  const url = new URL(SERVER_HOST_URL);
  const user = auth().currentUser;
  url.pathname = [".netlify/functions", path].join("/");
  if (user) {
    const token = user.toJSON().stsTokenManager.accessToken;
    token && url.searchParams.append("token", token);
  }
  return url;
}

export default {
  get users() {
    return getUrl("users");
  },
  get role() {
    return getUrl("role");
  },
  timestamp: getUrl("timestamp"),
};
