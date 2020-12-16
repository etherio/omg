import { credential } from "../firebase";

let ref;

export default class User {
  static async canAccess(uid) {
    if (!ref) {
      ref = credential.doc(uid);
      ref = await ref.get();
    }
    return ref.exists;
  }
}
