import * as firebase from "firebase";
import { apiKey, messagingSenderId } from "../public/secrets.js";

const prodConfig = {};

const devConfig = {
  apiKey,
  authDomain: "recipe-box-85703.firebaseapp.com",
  databaseURL: "https://recipe-box-85703.firebaseio.com",
  projectId: "recipe-box-85703",
  storageBucket: "",
  messagingSenderId
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { db, auth };
