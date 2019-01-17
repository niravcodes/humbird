<template>
  <div class="-chatbox container">
    <div class="title">Humbird</div>

    <div class="chatbox" v-bar>
      <div ref="el_chatbox">
        <MsgString
          v-for="chatstr in chatdata"
          :sender="chatstr.sender"
          :msg="chatstr.message"
          :key="chatstr.id"
        ></MsgString>
      </div>
    </div>
    <div class="chatinput">
      <input
        type="text"
        class="-chat input"
        @keydown.enter="msg_send"
        v-model="message"
      />
    </div>
  </div>
</template>

<script>
import MsgString from "@/components/MsgString";
import Vue from "vue";
import Vuebar from "vuebar";
import axios from "axios";

Vue.use(Vuebar);

export default {
  components: { MsgString },
  data() {
    return {
      chatdata: [],
      message: "",
      sender: this.$route.params.user,
      subdomain: this.$route.params.subdomain,
      mate: null,
      id: 1,
      looper: null,
      sendingmsg: false
    };
  },
  methods: {
    msg_send: function() {
      if (this.message === "" || this.sendingmsg) {
        console.log(this.sendingmsg);
        return;
      }
      let self = this;

      this.sendingmsg = true;
      const msgtosend = this.message;
      self.message = "";
      axios
        .post("https://chat.nirab.me:8080/api/chat", {
          subdomain: this.subdomain,
          user: this.sender,
          message: msgtosend
        })
        .then(function(res) {
          if (res.data.status === "ok") {
            console.log(res.data.status);
            if (msgtosend !== "") {
              self.chatdata.push({
                sender: self.sender,
                message: msgtosend,
                id: self.id++
              });
            }
          }
        })
        .then(function() {
          self.sendingmsg = false;
        });
      this.$nextTick(function() {
        this.$refs.el_chatbox.scrollTop = this.$refs.el_chatbox.scrollHeight;
      });
    },
    fetchchat: function() {
      let self = this;
      if (this.mate !== null) {
        axios
          .post("https://chat.nirab.me:8080/api/checkmsg", {
            subdomain: this.subdomain,
            user: this.sender,
            mate: this.mate
          })
          .then(function(res) {
            if (res.data.message.length !== 0) {
              console.log(res.data.message);
              res.data.message.forEach(function(val) {
                self.chatdata.push({
                  sender: self.mate,
                  message: val,
                  id: self.id++
                });
              });
              self.$nextTick(function() {
                self.$refs.el_chatbox.scrollTop = this.$refs.el_chatbox.scrollHeight;
              });
            }
          });
      }
    },

    getmate: function() {
      axios
        .post("https://chat.nirab.me:8080/api/getmate", {
          subdomain: this.subdomain,
          user: this.sender
        })
        .then(res => {
          if (res.data.mate !== "") {
            console.log(res.data.mate);
            this.mate = res.data.mate;
          }
        });
    }
  },

  mounted() {
    this.getmate();
    this.fetchchat();

    this.looper = setInterval(
      function() {
        this.fetchchat();
      }.bind(this),
      1000
    );
  },
  beforeDestroy() {
    clearInterval(this.looper);
  },
  watch: {
    $route: "getmate"
  }
};
</script>

<style lang="scss">
@import "../assets/_var.scss";

.-chatbox {
  padding-left: 15px;
  padding-right: 15px;

  & > .title {
    padding: 0 42px;
  }
}

.chatbox {
  height: 400px;
  width: 100%;
  overflow-y: scroll;
  font-family: $fontText;
  font-size: $text;

  .message {
    display: grid;
    padding: 2px 20px;
    grid-template-columns: 120px minmax(0, 1fr);
    width: 100%;
    & > .sender {
      &:after {
        content: ":";
      }
    }
  }
}

.-chat {
  border: 0;
  margin-top: 10px;
}
</style>

<style lang="scss">
$scrollcolor: #fff;

.vb > .vb-dragger {
  z-index: 5;
  width: 8px;
  right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: rotate3d(0, 0, 0, 0);
  transform: rotate3d(0, 0, 0, 0);
  -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out,
    height 100ms ease-out;
  transition: background-color 100ms ease-out, margin 100ms ease-out,
    height 100ms ease-out;
  background-color: rgba($scrollcolor, 0.3);
  margin: 5px 5px 5px 0;
  border-radius: 20px;
  height: calc(100% - 10px);
  display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba($scrollcolor, 0.5);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
  background-color: rgba($scrollcolor, 0.8);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
  background-color: rgba($scrollcolor, 0.8);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba($scrollcolor, 0.8);
}
</style>
