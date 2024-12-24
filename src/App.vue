<template>
  <div class="">
    <router-view />
  </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  name: "App-V2",

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

      const language = to.params.language; // Lấy ngôn ngữ từ route mới
      if (language) {
        localStorage.setItem("language", language); // Lưu ngôn ngữ vào localStorage
        this.$i18n.locale = language; // Cập nhật ngôn ngữ cho i18n
      }
      // Sau khi route được tải xong, đánh dấu là đã load xong
      this.$nextTick(() => {
        this.isContentLoaded = true;
      });
    },
  },

  mounted() {
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

    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      this.$i18n.locale = storedLanguage; // Cập nhật ngôn ngữ cho i18n
    }

    document.title = this.$t("Local_National_Global") + " " + "| 9Weather";
  },

  methods: {
    ...mapMutations("commonModule", [
      "setObjectSettingNotLocal",
      "setObjectSetting",
    ]),
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
