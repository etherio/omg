export const api = {
  HEROKU_SERVER: "https://omg-api.etherio.net",
};

if (process.env.NODE_ENV === "development") {
  if (typeof fetch === "function") {
    fetch("http://localhost:3000/status").then(() => {
      api.HEROKU_SERVER = "http://localhost:3000";
    });
  }
}

export const firebaseConfig = {
  apiKey: "AIzaSyBgkNJBP6moWUoBEuOjBd2Yg1EuKsPHx1Q",
  authDomain: "omg-baby.firebaseapp.com",
  projectId: "omg-baby",
  appId: "1:499374745893:web:ae59292b3d99c41b7e12cc",
  measurementId: "G-VEF70B6QLW",
};
