<template>
  <div class="w-full h-auto">
    <BreadcumsPage :key="indexState + Math.random()"></BreadcumsPage>

    <!--  -->
    <NavTabbar></NavTabbar>
    <router-view></router-view>
  </div>
</template>
<script>
import BreadcumsPage from "@/layout/breadcums/breadcums-page.vue";
import NavTabbar from "@/layout/tab-menu/nav-tabbar.vue";
// import { mapMutations } from "vuex";

export default {
  name: "search-page",

  components: {
    BreadcumsPage,
    NavTabbar,
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
