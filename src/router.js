import Vue from "vue";
import Router from "vue-router";
import home from "./view/Home";
import info from "./view/Info";
import chat from "./view/Chat";
import login from "./view/Login";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      name: "home",
      path: "/",
      component: home
    },
    {
      name: "info",
      path: "/info/:subdomain/:user1/:user2",
      component: info
    },
    {
      name: "login",
      path: "/chat/:subdomain",
      component: login
    },
    {
      name: "chat",
      path: "/chat/:subdomain/:user",
      component: chat
    }
  ]
});
