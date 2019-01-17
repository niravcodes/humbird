// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import "./assets/style.scss";

Vue.config.productionTip = false;

/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  const ids = window.location.host.split(".");
  let subdomain = ids[0];
  let domain = ids[1];
  let pagetoload = "login";
  if (domain === "codesandbox" && to.name !== pagetoload) {
    next({ name: pagetoload, params: { subdomain } });
  } else {
    next();
  }
});

new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
  router
});

new Vue({
  el: "#foot"
});
