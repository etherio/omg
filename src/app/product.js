import { firestore } from "../firebase";

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
  }) {
    let now = new Date();
    now.setTime(createdAt);
    this.uid = uid;
    this.createdAt = now;
    this.name = name;
    this.code = code;
    this.price = Number(price);
    this.description = description;
    this.image = image || null;
    this.category = category;
    this.colors = colors;
    this.stock = Number(stock || 0);
    this.minAge = Number(minAge || 0);
    this.maxAge = Number(maxAge || 0);
  }

  static make(product) {
    let newProduct = {};
    newProduct.name = product.name;
    newProduct.code = product.code;
    newProduct.price = parseFloat(product.price);
    newProduct.description = product.description || null;
    newProduct.image = product.image || null;
    newProduct.category = product.category || null;
    newProduct.colors = product.colors || [];
    newProduct.minAge = Number(product.minAge);
    newProduct.maxAge = Number(product.maxAge);
    newProduct.stock = Number(product.stock) || 0;
    newProduct.uid = product.uid;
    newProduct.createdAt = product.createdAt;
    if (newProduct.minAge === NaN) {
      newProduct.minAge = null;
    }
    if (newProduct.maxAge === NaN) {
      newProduct.maxAge = null;
    }
    return newProduct;
  }
}

const product = firestore.collection("products").withConverter({
  fromFirestore: (data) => new Product(data.data()),
  toFirestore: (data) => Product.make(data),
});

export default product;
