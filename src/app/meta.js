import { firestore } from "../firebase";

const store = {
  ref: null,
  data: {
    colors: [],
    categories: [],
  },
  get colors() {
    return this.data.colors;
  },
  get categories() {
    return this.data.categories;
  },
  set colors(value) {
    this.data.colors = value;
  },
  set categories(value) {
    this.data.categories = value;
  },
};

export default {
  async fetch() {
    if (!store.ref) {
      console.log("firestore:", firestore.path);
      store.ref = await firestore.get();
      var { categories, colors } = store.ref.data();
      store.colors = colors;
      store.categories = categories;
    } else {
      console.log("memory:", firestore.path);
    }
    return this;
  },

  get categories() {
    return store.categories;
  },

  get colors() {
    return store.colors;
  },
};
