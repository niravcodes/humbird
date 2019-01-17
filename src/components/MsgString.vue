<template>
  <div class="message">
    <div class="sender">{{ sender }}</div>
    <div class="msg">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: "MsgString",
  props: ["sender", "msg"],
  data() {
    return {};
  }
};
</script>
