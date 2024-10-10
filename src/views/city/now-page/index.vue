<template>
  <div class="w-full h-full">
    <!-- -->
    <NowChartPage></NowChartPage>
  </div>
</template>

<script>
import NowChartPage from "@/components/detail/now-day/now-chart-page.vue";

export default {
  name: "now-view",
  components: {
    NowChartPage,
  },
  data() {
    return {};
  },

  mounted() {},
  beforeRouteLeave(to, from, next) {
    debugger;
    window.location.replace(to.fullPath);
    next(); // Cho phép chuyển route
  },
};
</script>
