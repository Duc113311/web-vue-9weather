<template>
  <div class="w-full h-full">
    <!-- -->
    <GlobePage></GlobePage>
  </div>
</template>

<script>
import GlobePage from "@/components/detail/moonphase/globe-page.vue";

export default {
  name: "moonphase-view",
  components: {
    GlobePage,
  },
  data() {
    return {};
  },

  beforeRouteLeave(to, from, next) {
    window.location.replace(to.fullPath);
    next(); // Cho phép chuyển route
  },
};
</script>
