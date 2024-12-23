<template>
  <div class="w-full bg-unit show-scroll h-full">
    <!--  -->
    <div class="w-full h-full">
      <div
        class="w-full nav-bar cursor-pointer flex justify-between pad-option-tb-8"
        v-for="(name, code) in languageMap"
        :key="code"
        @click="onChooseLanguage(code)"
      >
        <div class="txt_light_summer">
          <span> {{ name }}</span>
        </div>
        <div class="fade-leave-active" v-if="selectedLanguage === code">
          <img src="../../../assets/images/svg/ic_success.svg" alt="" />
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>
<script>
import languageMap from "../../locales/index.json";

export default {
  name: "unit-preferences-page",

  data() {
    return {
      languageMap,
    };
  },

  computed: {
    selectedLanguage() {
      return this.$store.state.commonModule.codeLanguage;
    },
  },

  methods: {
    onChooseLanguage(code) {
      this.selectedLanguage = code;
      localStorage.setItem("language", code);
      // this.$i18n.locale = code;
      this.$emit("onChangeLaguages", code);
    },
  },
};
</script>
<style lang="scss">
.bg-unit {
  transition: right 0.3s ease;
  color: white;
}

.fade-leave-active {
  transition: opacity 0.5s;
}
</style>
