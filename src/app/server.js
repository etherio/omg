let API_URL = "https://omg-api.etherio.net";

// if (process.env.NODE_ENV === "development") {
//   API_URL = "http://localhost:8888";
// }

export default {
  get me() {
    return `${API_URL}/api/me`;
  },
  get timestamp() {
    return `${API_URL}/api/timestamp`;
  },
  get listUsers() {
    return `${API_URL}/api/listUsers`;
  },
  get setRole() {
    return `${API_URL}/api/setRole`;
  },
  get deleteUser() {
    return `${API_URL}/api/deleteUser`;
  },
  get listProducts() {
    return `${API_URL}/api/listProducts`;
  },
  get getProduct() {
    return `${API_URL}/api/getProduct`;
  },
  get optimizeImage() {
    return "https://api.etherio.net/image";
  },
  get status() {
    return "https://api.etherio.net/status";
  },
};
