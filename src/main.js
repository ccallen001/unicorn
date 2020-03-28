import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import * as firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: "AIzaSyA5b5fDcsp9s4eDih6GPHvOBQW-H8UikWE",
  authDomain: "unicorn-message.firebaseapp.com",
  databaseURL: "https://unicorn-message.firebaseio.com",
  projectId: "unicorn-message",
  storageBucket: "unicorn-message.appspot.com",
  messagingSenderId: "211624340848",
  appId: "1:211624340848:web:56b7ecb6614c38157533b5",
  measurementId: "G-02KHDVGXEQ"
})

Vue.config.productionTip = false

let firebaseAppHasInitialized = false;

firebase.auth().onAuthStateChanged(() => {
  if (!firebaseAppHasInitialized) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
