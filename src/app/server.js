import { api } from "../../config";
import firebase from "firebase/app";
import axios from "axios";

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
    return `${api.HEROKU_SERVER}/meta`;
  },

  get products() {
    return `${api.HEROKU_SERVER}/products`;
  },

  get users() {
    return `${api.HEROKU_SERVER}/users`;
  },
  get getUser() {
    return `${api.HEROKU_SERVER}/users`;
  },
  get listUsers() {
    return `${api.HEROKU_SERVER}/users`;
  },
  get deleteUser() {
    return `${api.HEROKU_SERVER}/users`;
  },
  get listProducts() {
    return `${api.HEROKU_SERVER}/products`;
  },
  get getProduct() {
    return `${api.HEROKU_SERVER}/products`;
  },
  get optimizeImage() {
    return `${api.HEROKU_SERVER}/image`;
  },
  get status() {
    return `${api.HEROKU_SERVER}/status`;
  },
  get session() {
    return `${api.HEROKU_SERVER}/session`;
  },

  get combo() {
    return `${api.HEROKU_SERVER}/metadata/combo`;
  },
  get facebook() {
    return "https://graph.facebook.com";
  },
  get review() {
    return `${api.HEROKU_SERVER}/review`;
  },
};
