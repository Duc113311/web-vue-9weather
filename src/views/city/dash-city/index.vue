<template>
  <div class="w-full h-full">
    <!--  -->
    <HomePageDash></HomePageDash>
    <!--  -->
    <!--  -->
  </div>
</template>
<script>
import HomePageDash from "@/components/home/home-page-dash.vue";
export default {
  name: "dash-city",

  components: {
    HomePageDash,
  },
  data() {
    return {};
  },

  mounted() {
    debugger;
    const paramRouter = this.$route.params;
    document.title = `${paramRouter?.city}, ${paramRouter?.country}, Current Weather | 9Weather`;
  },

  created() {
    debugger;
    // window.location.reload();
  },

  methods: {},
};
</script>

<style lang="scss"></style>
