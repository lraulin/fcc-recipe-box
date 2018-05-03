import * as firebase from "firebase";
import { apiKey, messagingSenderId } from "./secrets.js";

const prodConfig = {};

const devConfig = {
  apiKey,
  authDomain: "recipe-box-85703.firebaseapp.com",
  databaseURL: "https://recipe-box-85703.firebaseio.com",
  projectId: "recipe-box-85703",
  storageBucket: "",
  messagingSenderId
};

// Let's keep using the test database for now!
// const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;
const config = devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { db, auth };
