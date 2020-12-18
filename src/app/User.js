import { auth } from "../firebase";

export default class User {
  static async getRole() {
    let user;
    if (!(user = auth().currentUser)) {
      return false;
    }
    let customToken = await user.getIdTokenResult(true);
    console.log(
      `${location.protocol}//${location.host}/.netlify/functions/auth?token=${customToken.token}&role=admin`
    );
    return customToken.claims.role;
  }
}
