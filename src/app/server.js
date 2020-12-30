let BASE_URL = "https://api.omg.etherio.net";

if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:8888";
}

export default {
  get me() {
    return `${BASE_URL}/api/me`;
  },
  get timestamp() {
    return `${BASE_URL}/api/timestamp`;
  },
  get listUsers() {
    return `${BASE_URL}/api/listUsers`;
  },
  get setRole() {
    return `${BASE_URL}/api/setRole`;
  },
  get deleteUser() {
    return `${BASE_URL}/api/deleteUser`;
  },
  get listProducts() {
    return `${BASE_URL}/api/listProducts`;
  },
  get getProduct() {
    return `${BASE_URL}/api/getProduct`;
  },
};
