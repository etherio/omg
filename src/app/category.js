import Eloquent from "./Eloquent";

class Category extends Eloquent {
  getCollection() {
    return "categories";
  }

  defineProperties() {
    return {
      title: null,
      total: 0,
    };
  }
}

export default Category;
