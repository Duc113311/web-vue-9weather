<template>
  <div class="w-full h-full">
    <!--  -->
    <ThreeDayPage></ThreeDayPage>
  </div>
</template>
<script>
import ThreeDayPage from "@/components/home/3 day/three-day-page.vue";

export default {
  name: "next-3-day-view",

  components: {
    ThreeDayPage,
  },
  data() {
    return {};
  },

  methods: {},
  beforeRouteLeave(to, from, next) {
    window.location.replace(to.fullPath);
    next(); // Cho phép chuyển route
  },
};
</script>
<style lang="scss"></style>
