<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter,
.slide-fade-leave-to {
  transform: scale(0.8, 0.8);
  opacity: 0;
}
</style>
