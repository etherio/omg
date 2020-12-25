import Eloquent from "./Eloquent";

class Color extends Eloquent {
  getCollection() {
    return "colors";
  }

  defineProperties() {
    return {
      title: null,
    };
  }
}

export default Color;
