<template>
  <div class="header-menu text-white">
    <!--  -->
    <div class="flex w-full items-center justify-between">
      <div class="flex items-center gap-2" v-if="namePage !== 'unit_settings'">
        <img
          src="../../assets/images/svg_v2/ic_settings.svg"
          alt=""
          srcset=""
        />
        <p class="txt_regular text-white">{{ $t("Settings") }}</p>
      </div>
      <div
        @click="onClickBack('settings')"
        class="flex items-center gap-2 cursor-pointer"
        v-if="namePage === 'unit_settings'"
      >
        <img src="../../assets/images/svg_v2/ic_back_st.svg" alt="" srcset="" />
        <p class="txt_regular text-white">
          <span>{{ $t(`Unit_preferences_settings`) }}</span>
        </p>
      </div>

      <img
        @click="onClickCancel"
        src="../../assets/images/svg_v2/ic_close.svg"
        alt=""
        width="24"
        class="cursor-pointer"
      />
    </div>

    <div class="address-now pt-4 pb-4 text-left cursor-pointer text-blue-300">
      {{ convertToEnglishRender(breadcumsObject?.city) }},
      {{ breadcumsObject?.country }}
    </div>

    <div class="w-full">
      <div
        v-if="namePage !== 'unit_settings'"
        class="w-full nav-bar cursor-pointer flex justify-between pad-option-tb-8"
        @click="onClickUnitSetting('unit_settings')"
      >
        <div class="txt_regular flex items-center">
          <span>{{ $t(`Unit_preferences_settings`) }}</span>
        </div>
        <div>
          <img src="../../assets/images/svg/ic_back_right.svg" alt="" />
        </div>
      </div>
      <div
        v-if="namePage !== 'languages_settings'"
        class="w-full nav-bar cursor-pointer flex justify-between pad-option-tb-8"
        @click="onClickLanguagesSetting('languages_settings')"
      >
        <div class="txt_regular flex items-center">
          <span>{{ $t(`languages_settings`) }}</span>
        </div>
        <div>
          <img src="../../assets/images/svg/ic_back_right.svg" alt="" />
        </div>
      </div>

      <!--  -->
      <UnitPreferencesPage
        v-if="namePage === 'unit_settings'"
      ></UnitPreferencesPage>
    </div>

    <div class="txt_medium absolute bottom-0 right-0 color-footer p-5">
      <span>{{ $t("version") }} 2/ 18.11.2024</span>
    </div>
  </div>
</template>
<script>
import UnitPreferencesPage from "@/components/settings/unit-preferences-page.vue";
import { convertToEnglish } from "@/utils/converValue";
import { mapGetters } from "vuex";

export default {
  name: "header-menu",

  components: {
    UnitPreferencesPage,
  },

  data() {
    return {
      namePage: "setting",
    };
  },

  computed: {
    ...mapGetters("commonModule", ["breadcumsObjectGetters"]),

    breadcumsObject() {
      return this.breadcumsObjectGetters;
    },
  },

  methods: {
    convertToEnglishRender(value) {
      return convertToEnglish(value);
    },

    onClickUnitSetting(value) {
      this.namePage = value;
    },

    onClickLanguagesSetting(value) {
      debugger;
    },

    onClickCancel() {
      this.$emit("onChangeCloseMenu", false);
    },

    onClickBack(value) {
      this.namePage = value;
    },
  },
};
</script>
<style lang="scss">
.header-menu {
  background-color: #1f1f1f;
  border-top: 1px solid hsla(0, 0%, 76%, 0.2);
  display: none;
  overflow-y: auto;
  padding: 12px 0 0px;
  z-index: 100;
}
@media (min-width: 768px) {
  .header-menu {
    // background: linear-gradient(to bottom, #343863, #a6a6c4);
    background-image: url(../../assets/images/svg_v2/background.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    -webkit-box-shadow: 1px 0 4px 0 rgba(0, 0, 0, 0.5);
    box-shadow: 1px 0 4px 0 rgba(0, 0, 0, 0.5);
    color: #000;
    padding: 20px 20px 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 478px;
  }
}
.basic-header.menu-open .header-menu {
  display: block;
}
.basic-header .header-menu {
  height: 100vh;
}

@media (max-width: 767px) {
  .basic-header .header-menu {
    height: calc(100vh - 44px);
  }
}
.basic-header.menu-open .header-menu {
  display: block;
}

.pad-option-tb-8 {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
