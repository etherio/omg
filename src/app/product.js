import { firestore, storage, auth } from "../firebase";

const IMAGE_PLACEHOLDER = "/assets/image.png";

class Product {
  constructor({
    uid,
    name,
    code,
    price,
    description,
    image,
    category,
    colors,
    stock,
    minAge,
    maxAge,
    createdAt,
    createdBy,
  }) {
    let now = new Date();
    now.setTime(createdAt);
    this.photoURL = IMAGE_PLACEHOLDER;
    this.createdBy = uid || createdBy;
    this.createdAt = now;
    this.uid = String(uid);
    this.name = String(name);
    this.code = String(code);
    this.price = Number(price || 0);
    this.description = String(description || "");
    this.image = image || null;
    this.category = String(category) || null;
    this.colors = Array(colors) || [];
    this.stock = Number(stock || 0);
    this.minAge = Number(minAge || 0) || null;
    this.maxAge = Number(maxAge || 0) || null;

    if (this.image) {
      storage
        .child(this.image)
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          this.photoURL = url;
        });
      console.log(this, "product:fromFirebase");
    }
  }

  static make({
    name,
    code,
    price,
    description,
    image,
    images,
    category,
    colors,
    stock,
    minAge,
    maxAge,
    createdAt,
  }) {
    let currentUser = auth().currentUser;
    let now = new Date();
    now.setTime(createdAt);
    this.createdAt = now.getTime();
    this.createdBy = currentUser;
    this.name = String(name);
    this.code = String(code);
    this.price = Number(price);
    this.description = String(description) || null;
    this.image = String(image || images[0]) || null;
    this.category = String(category) || null;
    this.colors = Array(colors) || [];
    this.stock = Number(stock) || 0;
    this.minAge = Number(minAge) || 0;
    this.maxAge = Number(maxAge) || 0;
    console.log(this, "product:toFirebase");
  }
}

const product = firestore.collection("products").withConverter({
  fromFirestore: (data) => new Product(data.data()),
  toFirestore: (data) => Product.make(data),
});

export default product;
