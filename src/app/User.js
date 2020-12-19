import { auth } from "../firebase";

export default class User {
  static async getRole() {
    let user;
    if (!(user = auth().currentUser)) {
      return false;
    }
    let customToken = await user.getIdTokenResult(true);
    return customToken.claims.role;
  }
}
