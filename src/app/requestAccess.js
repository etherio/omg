import { database } from "../firebase";

const requestAccess = database.child("request_access");

export default requestAccess;
