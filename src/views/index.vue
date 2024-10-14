<template>
  <div class="w-full h-full">
    <!--  -->
    <BreadcumsPage></BreadcumsPage>

    <NavTabbar></NavTabbar>
    <!--  -->

    <router-view />
  </div>
</template>
<script>
import BreadcumsPage from "@/layout/breadcums/breadcums-page.vue";
import NavTabbar from "@/layout/tab-menu/nav-tabbar.vue";

export default {
  name: "dash-page",
  components: {
    BreadcumsPage,
    NavTabbar,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang="scss"></style>
