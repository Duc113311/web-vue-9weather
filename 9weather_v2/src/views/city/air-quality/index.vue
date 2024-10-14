<template>
  <div class="w-full h-full">
    <!-- -->
    <AirQualityDetail></AirQualityDetail>
    <!--  -->
  </div>
</template>

<script>
import AirQualityDetail from "@/components/detail/air-quality/air-quality-detail.vue";

export default {
  name: "air-quality-view",
  components: {
    AirQualityDetail,
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
    document.title = `${paramRouter?.city}, ${paramRouter?.country}, Air Quality | 9Weather`;
  },
};
</script>
