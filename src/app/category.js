import { database } from "../firebase";

const category = database.child("categories");

export default category;
