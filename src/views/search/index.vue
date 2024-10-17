<template>
  <div class="w-full h-auto">
    <BreadcumsPage></BreadcumsPage>

    <!--  -->
    <NavTabbar></NavTabbar>

    <router-view></router-view>
  </div>
</template>
<script>
import BreadcumsPage from "@/layout/breadcums/breadcums-page.vue";
import NavTabbar from "@/layout/tab-menu/nav-tabbar.vue";

export default {
  name: "search-page",

  components: {
    BreadcumsPage,
    NavTabbar,
  },

  data() {
    return {};
  },
};
</script>
<style lang="scss"></style>
