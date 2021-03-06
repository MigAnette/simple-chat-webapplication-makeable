import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import firebase from "firebase/app";
require("firebase/auth");

Vue.config.productionTip = false

let app = null;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
