<template>
  <div class="w-full h-full">
    <!-- -->
    <UvDayPage></UvDayPage>
  </div>
</template>

<script>
import UvDayPage from "@/components/home/uv-day/uv-day-page.vue";

export default {
  name: "uv-index-view",

  components: {
    UvDayPage,
  },
  data() {
    return {};
  },

  beforeRouteLeave(to, from, next) {
    debugger;
    window.location.replace(to.fullPath);
    next(); // Cho phép chuyển route
  },
};
</script>
