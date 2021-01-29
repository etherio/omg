import firebase from "firebase/app";
import axios from "axios";

const api = "/api";

export default {
  setRole({ uid, role, token }) {
    if (!token) {
      let { currentUser } = firebase.auth();
      token = currentUser && currentUser.toJSON().stsTokenManager.accessToken;
    }
    return axios
      .post(
        `${this.users}/${uid}`,
        { role },
        {
          headers: { "X-Access-Token": token },
        }
      )
      .then(({ data }) => data);
  },

  get meta() {
    return `${api}/metadata`;
  },

  get products() {
    return `${api}/products`;
  },

  get users() {
    return `${api}/users`;
  },
  get getUser() {
    return `${api}/users`;
  },
  get listUsers() {
    return `${api}/users`;
  },
  get deleteUser() {
    return `${api}/users`;
  },
  get listProducts() {
    return `${api}/products`;
  },
  get getProduct() {
    return `${api}/products`;
  },
  get optimizeImage() {
    return `${api}/image`;
  },
  get status() {
    return `${api}/status`;
  },
  get session() {
    return `${api}/session`;
  },

  get combo() {
    return `${api}/metadata/combo`;
  },
  get facebook() {
    return "https://graph.facebook.com";
  },
  get review() {
    return `${api}/review`;
  },
  get stocks() {
    return `${api}/inventory`;
  },
  get resync() {
    return `${api}/resync`;
  },
  get url() {
    return api;
  },
};
