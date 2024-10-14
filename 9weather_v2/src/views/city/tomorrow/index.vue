<template>
  <div class="w-full h-full">
    <!--  -->
    <TomorrowPage></TomorrowPage>
  </div>
</template>
<script>
import TomorrowPage from "@/components/home/tomorrow/tomorrow-page.vue";

export default {
  name: "tomorrow-view",
  components: { TomorrowPage },
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
    document.title = `${paramRouter?.city}, ${paramRouter?.country}, Tomorrow Weather | 9Weather`;
  },
};
</script>
<style lang="scss"></style>
