<template>
  <div class="header-menu text-white">
    <!--  -->
    <div class="flex w-full items-center justify-between">
      <div class="flex items-center gap-2">
        <img
          src="../../assets/images/svg_v2/ic_settings.svg"
          alt=""
          srcset=""
        />
        <p>Setting</p>
      </div>
      <img
        @click="onClickCancel"
        src="../../assets/images/svg_v2/ic_close.svg"
        alt=""
      />
    </div>

    <div class="address-now pt-3 pb-3 text-left">
      {{ breadcumsObject?.district }},
      {{ convertToEnglishRender(breadcumsObject?.city) }},
      {{ breadcumsObject?.country }}
    </div>

    <div class="w-full">
      <div
        class="w-full nav-bar cursor-pointer flex justify-between pad-option-tb-8"
        @click="onClickUnitSetting('unit_settings')"
      >
        <div class="txt_light_summer flex items-center">
          <span>{{ $t("Unit_preferences_settings") }}</span>
        </div>
        <div>
          <img src="../../assets/images/svg/ic_back_right.svg" alt="" />
        </div>
      </div>
      <div class="bor-bottom"></div>
      <!-- Cài đặt thông báo -->

      <div class="bor-bottom"></div>
      <!-- Ra da -->

      <!-- language -->
    </div>
  </div>
</template>
<script>
import { convertToEnglish } from "@/utils/converValue";
import { mapGetters } from "vuex";

export default {
  name: "header-menu",

  data() {
    return {};
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

    onClickUnitSetting(value) {},

    onClickCancel() {
      this;
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
    background: linear-gradient(to bottom, #5a60a3, #686876);
    -webkit-box-shadow: 1px 0 4px 0 rgba(0, 0, 0, 0.5);
    box-shadow: 1px 0 4px 0 rgba(0, 0, 0, 0.5);
    color: #000;
    padding: 20px 32px 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 370px;
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
