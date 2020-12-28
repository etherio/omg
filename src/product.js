import { auth, storage } from "../firebase";
import Model from "./Model";
import Category from "./Category";
import Metadata from "./Metadata";

class Product extends Model {
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

  async onSave() {
    let metadata = new Metadata({
      id: "products",
    });
    if (this.category) {
      let category = new Category({
        id: this.category,
      });
      await category.get();
      if (!category._data.total) {
        category.total = 1;
        await category.save();
      } else {
        category.total += 1;
        await category.update();
      }
    }
    await metadata.get();
    metadata.count++;
    await metadata.update();

    if (this.images && this.images.length) {
      let dt = new Date();
      let [m, y] = [dt.getMonth() + 1, dt.getYear() - 100];
      let images = this.images;
      this.images = [`${this.createdUid}/${y}/${m}/${Date.now()}`];
      await storage.child(this.images[0]).put(images[0]);
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
