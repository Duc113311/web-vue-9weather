<template>
  <div class="relative h-auto">
    <div class="body-app show-scroll">
      <!-- header -->

      <HeaderPage @onChangeShowDraw="onChangeShowDraw"></HeaderPage>

      <NavBottom></NavBottom>

      <div class="w-full h-full pad-big">
        <!--  -->
        <BreadcumsPage></BreadcumsPage>

        <!--  -->

        <NavTabbar></NavTabbar>
      </div>

      <FooterPage></FooterPage>
    </div>
  </div>
</template>
<script>
import HeaderPage from "./layout/header/header_page";
import { mapMutations } from "vuex";
import NavBottom from "./layout/tabbar-bottom/nav-bottom.vue";
import FooterPage from "./layout/footer/footer-page.vue";
import BreadcumsPage from "./layout/breadcums/breadcums-page.vue";
import NavTabbar from "./layout/tab-menu/nav-tabbar.vue";
// import BreadcumsPage from "./layout/breadcums/breadcums_page.vue";

export default {
  name: "App-V2",

  components: {
    HeaderPage,
    NavBottom,
    BreadcumsPage,
    FooterPage,
    NavTabbar,
  },
  data() {
    return {
      drawerValue: false,
      isContentLoaded: false,
    };
  },

  computed: {
    currentHeader() {
      if (
        this.$route.name === "home-page" ||
        this.$route.name === "create-widget-view" ||
        this.$route.name === "introduce-page"
      ) {
        return "default";
      } else {
        return "city";
      }
    },

    headerClass() {
      return this.currentHeader === "city"
        ? "h-[calc(100vh-72px)]"
        : "md:h-[calc(100vh-28rem)] h-[calc(100vh-20rem)]";
    },
  },

  watch: {
    $route(to, from) {
      // Khi route thay đổi, đánh dấu là nội dung đang được load
      this.isContentLoaded = false;

      // Sau khi route được tải xong, đánh dấu là đã load xong
      this.$nextTick(() => {
        this.isContentLoaded = true;
      });
    },
  },

  mounted() {
    debugger;
    this.nameRouter = this.$route.name;
    const unitValue = localStorage.getItem("unit");
    if (unitValue) {
      const decodeAirObject = JSON.parse(unitValue);
      this.setObjectSetting(decodeAirObject);
      this.setObjectSettingNotLocal(decodeAirObject);
    }
    this.$nextTick(() => {
      document.body.classList.add("content-loaded");
    });

    document.title =
      "Local, National & Global Daily Weather Forecast | 9Weather";
  },

  methods: {
    ...mapMutations(["setObjectSetting", "setObjectSettingNotLocal"]),
    onChangeShowDraw(val) {
      debugger;
      this.drawerValue = val;
    },

    onCancelFormDraw(val) {
      this.drawerValue = val;
    },

    handleRouteLoaded() {
      this.isContentLoaded = true;
    },
  },
};
</script>
<style lang="scss">
@import "./assets/css/style.css";
@import "./assets/css/common.css";
@import "./assets/css/colors.css";
@import "./assets/css/fonts.css";
@import "./assets/css/padding.css";

#app {
  font-family: "Roboto-Regular", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
body {
  position: relative;
  margin: 0px;
  height: 100%;
  margin: 0;
  font-family: var(--bs-body-font-family);
  font-size: var(--bs-body-font-size);
  font-weight: var(--bs-body-font-weight);
  line-height: var(--bs-body-line-height);
  color: var(--bs-body-color);
  text-align: var(--bs-body-text-align);
  background-color: var(--bs-body-bg);
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.body-app {
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  flex-direction: column;
}

#main-content {
  opacity: 0;
  transition: opacity 0.5s;
}

.content-loaded #main-content {
  opacity: 1;
}
</style>
