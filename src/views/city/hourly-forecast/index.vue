<template>
  <div class="w-full h-full">
    <!-- -->

    <Hourly24Page></Hourly24Page>
  </div>
</template>

<script>
import Hourly24Page from "@/components/detail/hourly-24/hourly-24-page.vue";
export default {
  name: "hourly-forecast-view",

  components: {
    Hourly24Page,
  },
  data() {
    return {};
  },

  beforeRouteLeave(to, from, next) {
    debugger;
    window.location.replace(to.fullPath);
    next(); // Cho phép chuyển route
  },
  mounted() {
    debugger;
    const paramRouter = this.$route.params;
    document.title = `${paramRouter?.city}, ${paramRouter?.country}, Hourly Weather | 9Weather`;
  },
};
</script>
