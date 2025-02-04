<template>
  <div class="w-full h-auto">
    <NavBottom></NavBottom>

    <BreadcumsPage :key="indexState + Math.random()"></BreadcumsPage>

    <!--  -->
    <NavTabbar></NavTabbar>

    <!-- <div class="ads w-full h-[83px]"></div> -->

    <router-view></router-view>

    <FooterPage></FooterPage>
  </div>
</template>
<script>
import BreadcumsPage from "@/layout/breadcums/breadcums-page.vue";
import FooterPage from "@/layout/footer/footer-page.vue";
import NavTabbar from "@/layout/tab-menu/nav-tabbar.vue";
import NavBottom from "@/layout/tabbar-bottom/nav-bottom.vue";
// import { mapMutations } from "vuex";

export default {
  name: "search-page",

  components: {
    BreadcumsPage,
    NavTabbar,
    FooterPage,
    NavBottom,
  },

  data() {
    return {};
  },

  computed: {
    indexState() {
      debugger;
      return this.$store.state.commonModule.indexComponent;
    },
  },

  mounted() {
    // const objectBread = localStorage.getItem("objectBread");
    // this.setBreadcumsNotAllowLocation(objectBread);
  },

  methods: {
    // ...mapMutations("weatherModule", ["setBreadcumsNotAllowLocation"]),
  },
};
</script>
<style lang="scss"></style>
