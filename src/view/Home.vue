<template>
  <div class="container">
    <div class="title -checkpoint">Humbird</div>
    <div class="text">
      Enter your subdomain and users. For more information, RTFM.
    </div>

    <div class="inputbox -checkpoint" @keydown.enter="register">
      Subdomain for your chatbox
      <input
        type="text"
        class="input"
        v-model="subdomain_raw"
        :class="{ '-error': sub_err }"
      />
      <div class="error" v-if="sub_err_exists">
        Subdomain exists. Please pick another subdomain.
      </div>

      Your username
      <input
        type="text"
        class="input"
        v-model="user1_raw"
        :class="{ '-error': u1_err }"
      />

      Your friend's username
      <input
        type="text"
        class="input"
        v-model="user2_raw"
        :class="{ '-error': u2_err }"
      />
      <div class="info">
        All entries need to be alphabet only, and between 3 and 20 characters.
      </div>
      <button class="input -button" @click="register">Create</button>
    </div>
  </div>
</template>

<script>
import { alpha } from "@/includes/validate";
import axios from "axios";

export default {
  data: function() {
    return {
      subdomain_raw: "",
      user1_raw: "",
      user2_raw: "",
      sub_err: false,
      u1_err: false,
      u2_err: false,
      sub_err_exists: false
    };
  },
  computed: {
    subdomain: function() {
      return this.subdomain_raw.trim().toLowerCase();
    },
    user1: function() {
      return this.user1_raw.trim().toLowerCase();
    },
    user2: function() {
      return this.user2_raw.trim().toLowerCase();
    }
  },
  methods: {
    validateinput: function(str) {
      let errors = [];
      if (str.length > 3) {
        if (str.length < 20) {
          if (alpha(str)) {
            errors = "ok";
          } else {
            errors.push("not_alpha");
          }
        } else {
          errors.push("len_high");
        }
      } else {
        errors.push("len_low");
      }

      return errors;
    },
    register: function() {
      const err_sub = this.validateinput(this.subdomain);
      const err_u1 = this.validateinput(this.user1);
      const err_u2 = this.validateinput(this.user2);

      // Checkpoint 1
      if (err_sub === "ok") {
        this.sub_err = false;
      } else {
        this.sub_err = true;
      }

      if (err_u1 === "ok") {
        this.u1_err = false;
      } else {
        this.u1_err = true;
      }

      if (err_u2 === "ok") {
        this.u2_err = false;
      } else {
        this.u2_err = true;
        return; //denotes end of checkpoint 1
      }

      // Checkpoint 2
      if (this.user1 === this.user2) {
        this.u1_err = true;
        this.u2_err = true;
        return; //denotes end of checkpoint 2
      } else {
        this.u1_err = false;
        this.u2_err = false;
      }

      if (err_sub === "ok" && err_u1 === "ok" && err_u2 === "ok") {
        axios
          .post("https://chat.nirab.me:8080/api/register", {
            subdomain: this.subdomain,
            users: [this.user1, this.user2]
          })
          .then(res => {
            console.log(res.data);
            if (res.data.status.trim() === "ok") {
              this.sub_err = false;
              this.sub_err_exists = false;
              this.$router.push({
                name: "info",
                params: {
                  subdomain: this.subdomain,
                  user1: this.user1,
                  user2: this.user2
                }
              });
            } else if (res.data.status.trim() === "subdomain_exists") {
              this.sub_err = true;
              this.sub_err_exists = true;
            }
          });
        // .catch(function(res) {
        //   alert(
        //     "Something went wrong, and I haven't the time to make sexy error message boxes for everything."
        //   );
        // });
      }
    }
  }
};
</script>
