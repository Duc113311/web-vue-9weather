<template>
  <div class="w-full h-auto">
    <NavBottom class="md:block hidden mt-14"></NavBottom>

    <BreadcumsPage :key="indexState + Math.random()"></BreadcumsPage>

    <!--  -->
    <NavTabbar class="mb-4"></NavTabbar>

    <div class="ads w-full h-[83px] bg-slate-500 md:hidden block"></div>

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
