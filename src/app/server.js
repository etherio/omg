let BASE_URL = "https://serene-galileo-f84e05.netlify.app";

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
};
