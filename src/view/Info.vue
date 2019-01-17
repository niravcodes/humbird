<template>
  <div class="container">
    <div class="title">Humbird</div>
    <div class="text">
      Great! A private chatbox has been created for you in the domain:<br />
      <div class="domain">
        <a :href="sub_link">{{ this.$route.params.subdomain }}.nirab.me</a>
      </div>
      Use the domain to chat with your friend.
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    sub_link: function() {
      return "http://" + this.$route.params.subdomain + ".nirab.me";
    }
  }
};
</script>
