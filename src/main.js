import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import "firebase/firestore";
import './index.css'

var firebaseConfig = {
  apiKey: "AIzaSyDQXcPN32gePdD_UgDpRA32CMH6yej_XwM",
  authDomain: "simple-email-c6d2e.firebaseapp.com",
  projectId: "simple-email-c6d2e",
  storageBucket: "simple-email-c6d2e.appspot.com",
  messagingSenderId: "263901976802",
  appId: "1:263901976802:web:20b4aaa2e9d9d31d3ee6bb",
  measurementId: "G-BNJPYQS45Z",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();

let app;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch("autoSignIn", user);
  }
  if (!app) {
    app = createApp(App).use(store).use(router).mount("#app");
  }
});
