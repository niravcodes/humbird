<template>
  <div class="container">
    <div class="title -checkpoint">Humbird</div>
    <div class="text">
      Enter your username below to start chatting on {{ subdomain }}.
    </div>

    <div class="inputbox -checkpoint" @keydown.enter="register">
      Your username
      <input
        type="text"
        class="input"
        v-model="username_raw"
        :class="{ '-error': user_err }"
      />
      <div class="error" v-if="user_err_doesn_t_exist">
        The username doesn't exist. Try again.
      </div>

      <div class="info">
        Username is the identifier you or your friend picked during chatbox
        registration. More info on RTFM.
      </div>
      <button class="input -button" @click="register">Start</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { alpha } from "@/includes/validate";

export default {
  data() {
    return {
      username_raw: "",
      user_err: false,
      user_err_doesn_t_exist: false,
      subdomain: this.$route.params.subdomain
    };
  },
  methods: {
    register: function() {
      if (alpha(this.username)) {
        if (alpha(this.subdomain)) {
          this.user_err = false;
          axios
            .post("https://chat.nirab.me:8080/api/checkuser", {
              subdomain: this.subdomain,
              user: this.username
            })
            .then(res => {
              if (res.data.status.trim() === "user_exists") {
                this.user_err = false;
                this.user_err_doesn_t_exist = false;
                this.$router.push({
                  name: "chat",
                  params: {
                    subdomain: this.subdomain,
                    user: this.username
                  }
                });
              } else if (res.data.status.trim() === "user_not_exist") {
                this.user_err = true;
                this.user_err_doesn_t_exist = true;
              }
            });
        }
      } else {
        this.user_err = true;
      }
    }
  },
  computed: {
    username: function() {
      return this.username_raw.trim().toLowerCase();
    }
  }
};
</script>
