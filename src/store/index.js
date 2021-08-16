import { createStore } from "vuex";
import firebase from "firebase";
import router from "@/router";
import { db } from "../main";

export default createStore({
  state: {
    user: null,
    error: null,
    data: [],
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async userLogin({ commit }, payload) {
      try {
        let res = await firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
        await alert("Login Complete");
        await commit("setUser", res);
        await router.push("/");
      } catch (error) {
        alert(error.message);
      }
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", payload);
    },
    async userSignOut({ commit }) {
      firebase.auth().signOut();
      await alert("Logout Complete");
      commit("setUser", null);
    },
    async sentEmail(_, payload) {
      db.collection("mailsAuth").add({
        emailTo: payload.emailTo,
        emailFrom: firebase.auth().currentUser.email,
        subject: payload.subject,
        body: payload.body,
        sentAt: new Date(),
        faverite: true,
        read: false,
      });
      await alert("sent email");
    },
    async deleteEmail(_, payload) {
      db.collection("mailsAuth").doc(payload.id).delete();
      await alert("Deleted");
    },
    async getData({commit}) {
      var memberRef = await db.collection("mailsAuth");
      memberRef.onSnapshot((snapshotChange) => {
        let data = [];
        snapshotChange.forEach((doc) => {
          let dateFormat = new Date(doc.data().sentAt.seconds * 1000);
          if (doc.data().emailTo == firebase.auth().currentUser?.email) {
            data.push({
              id: doc.id,
              emailFrom: doc.data().emailFrom,
              emailTo: doc.data().emailTo,
              subject: doc.data().subject,
              body: doc.data().body,
              sentAt: dateFormat,
              read: doc.data().read,
              faverite: doc.data().faverite 
            });
          }
        });
        commit("setData", data)
      });
    },
  },
  modules: {},
});
