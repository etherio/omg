import { firestore, storage, auth } from "../firebase";

const IMAGE_PLACEHOLDER = "https://omg.etherio.net/assets/image.png";

class Product {
  constructor({
    uid,
    name,
    code,
    price,
    description,
    image,
    images,
    category,
    color,
    stocks,
    minAge,
    maxAge,
    createdAt,
  }) {
    this.uid = String(uid);
    this.name = String(name);
    this.code = String(code);
    this.price = Number(price || 0);
    this.description = String(description || "");
    if (typeof images === "object") {
      this.image = images[0] || null;
    } else {
      this.image = image || null;
    }
    this.category = String(category || "");
    this.color = String(color || "");
    this.stocks = Number(stocks || 0);
    this.minAge = Number(minAge || 0);
    this.maxAge = Number(maxAge || 0);
    this.createdAt = new Date();
    this.createdAt.setTime(createdAt);

    if (this.image) {
      storage
        .child(this.image)
        .getDownloadURL()
        .then((url) => {
          this.storageURL = url;
        });
    }
  }

  get photoURL() {
    return this.storageURL || this.image || IMAGE_PLACEHOLDER;
  }

  static make({
    name,
    code,
    price,
    description,
    image,
    images,
    category,
    color,
    stocks,
    minAge,
    maxAge,
    createdAt,
  }) {
    let currentUser = auth().currentUser();
    if (!currentUser) {
      throw new Error("User is required to sign-in");
    }
    this.uid = String(currentUser.uid);
    this.name = String(name);
    this.code = String(code);
    this.price = Number(price);
    this.description = String(description);
    this.image = String(image || images[0]) || null;
    this.category = String(category);
    this.color = String(color);
    this.stocks = Number(stocks) || 0;
    this.minAge = Number(minAge) || 0;
    this.maxAge = Number(maxAge) || 0;
    this.createdAt = new Date();
    this.createdAt.setTime(createdAt);
  }
}

const product = firestore.collection("products").withConverter({
  fromFirestore: (data) => new Product(data.data()),
  toFirestore: (data) => Product.make(data),
});

export default product;
