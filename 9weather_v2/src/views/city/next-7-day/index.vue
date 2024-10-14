<template>
  <div class="w-full h-full">
    <!--  -->
    <SevenDayPage></SevenDayPage>
  </div>
</template>
<script>
import SevenDayPage from "@/components/home/7 day/seven-day-page.vue";

export default {
  name: "next-7-day-view",

  components: { SevenDayPage },
  data() {
    return {};
  },

  methods: {},
  beforeRouteLeave(to, from, next) {
    window.location.replace(to.fullPath);
    next(); // Cho phép chuyển route
  },
  mounted() {
    debugger;
    const paramRouter = this.$route.params;
    document.title = `${paramRouter?.city}, ${paramRouter?.country}, 7 Days Weather | 9Weather`;
  },
};
</script>
<style lang="scss"></style>
