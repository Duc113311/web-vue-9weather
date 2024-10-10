<template>
  <div class="w-full h-full">
    <!-- -->
    <RadarFullPage></RadarFullPage>
    <!--  -->
  </div>
</template>

<script>
import RadarFullPage from "@/components/detail/radar/radar-full-page.vue";

export default {
  name: "radar-view",
  components: {
    RadarFullPage,
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
    document.title = `${paramRouter?.city}, ${paramRouter?.country}, Weather Radar | 9Weather`;
  },
};
</script>
