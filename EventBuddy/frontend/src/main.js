//this file mount(in the index.html #app) our main component App in the DOM, and use router client
import Vue from "vue";
import "./plugins/fontawesome";
import App from "./App.vue";
import router from "./router"; //we want to use client router

Vue.config.productionTip = false;

new Vue({
  //new istance
  router,
  render: h => h(App)
}).$mount("#app");
