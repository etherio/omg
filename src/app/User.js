import { auth } from "../firebase";

export default class User {
  static async getRole() {
    let user, token;
    if (!(user = auth().currentUser)) {
      return false;
    }
    token = await user.getIdTokenResult(true);
    user = user.toJSON();
    user.role = token.role;
    user.token = token.token;
    return {
      user,
      role: token.claims.role,
    };
  }
}
