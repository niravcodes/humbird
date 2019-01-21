// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import "./assets/style.scss";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const ids = window.location.host.split(".");
  let subdomain = ids[0];
  let domain = ids[1];
  let pagetoload = "login";
  if (domain === "nirab" && to.name !== "login" && to.name !== "chat") {
    next({ name: "login", params: { subdomain } });
  } else {
    next();
  }
});
/* eslint-disable no-new */

new Vue({
	el: "#app",
  components: { App },
  template: "<App/>",
  router
});

new Vue({
  el: "#foot"
});
