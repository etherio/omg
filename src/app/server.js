const OMG_API_URL = "https://omg-api.etherio.net";
const DEFAULT_API_URL = "https://api.etherio.net";
// const DEFAULT_API_URL = "http://localhost:8000";

export default {
  get me() {
    return `${OMG_API_URL}/api/me`;
  },
  get timestamp() {
    return `${OMG_API_URL}/api/timestamp`;
  },
  get listUsers() {
    return `${OMG_API_URL}/api/listUsers`;
  },
  get setRole() {
    return `${OMG_API_URL}/api/setRole`;
  },
  get deleteUser() {
    return `${OMG_API_URL}/api/deleteUser`;
  },
  get listProducts() {
    return `${OMG_API_URL}/api/listProducts`;
  },
  get getProduct() {
    return `${OMG_API_URL}/api/getProduct`;
  },
  get optimizeImage() {
    return `${DEFAULT_API_URL}/image`;
  },
  get status() {
    return `${DEFAULT_API_URL}/status`;
  },
};
