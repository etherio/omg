import { auth, storage } from "../firebase";
import Eloquent from "./Eloquent";

class Product extends Eloquent {
  getCollection() {
    return "products";
  }

  defineProperties() {
    let { currentUser } = auth();
    return {
      name: null,
      code: null,
      price: 0,
      description: null,
      category: null,
      colors: [],
      images: [],
      minAge: null,
      maxAge: null,
      createdUid: currentUser && currentUser.uid,
      createdAt: Date.now(),
    };
  }

  async beforeUpload() {
    if (this.images && this.images.length) {
      let dt = new Date();
      let [m, y] = [dt.getMonth() + 1, dt.getYear() - 100];
      let images = this.images;
      this.images = [`${this.createdUid}/${y}/${m}/${Date.now()}`];
      return await storage.child(this.images[0]).put(images[0]);
    }
  }

  async getPhotoURL() {
    if (!this.images || !this.images.length) {
      return null;
    }
    return await storage.child(this.images[0]).getDownloadURL();
  }
}

export default Product;
