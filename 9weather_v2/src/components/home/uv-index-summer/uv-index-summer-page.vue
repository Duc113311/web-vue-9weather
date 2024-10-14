<template>
  <div class="w-full h-full">
    <!--  -->

    <div class="w-full flex items-center justify-between pad-border-bottom">
      <div class="flex justify-start items-center">
        <img src="../../../assets/images/svg/svg_ic_uv.xml.svg" alt="" />
        <div class="txt_bold ml-2 txt_color_uv">
          <span>{{ $t("Uv_Index") }}</span>
        </div>
      </div>
      <div @click="onClickDetailUvIndex()" class="cursor-pointer">
        <img
          src="../../../assets/images/svg/svg_ic_more.xml.svg"
          width="20"
          alt=""
        />
      </div>
    </div>

    <!--  -->

    <vue-horizontal
      responsive
      :displacement="0.7"
      class="pad-option-summer horizontal"
    >
      <div class="flex items-center gap-1">
        <!-- 2 -->
        <div
          class="flex flex-col gap-2"
          v-for="(item, index) in paramHourly"
          :key="index"
        >
          <div class="txt">
            <span>{{ renderUiIndex(item).timestampValue }}</span>
          </div>
          <div class="flex justify-center items-center">
            <img
              :src="renderUiIndex(item).imageUvValue"
              width="30px"
              height="30px"
              alt=""
            />
          </div>
          <div class="txt w-[60px]">
            <span>{{ renderUiIndex(item).nameUvValue }}</span>
          </div>
        </div>
      </div>
    </vue-horizontal>
    <!--  -->
  </div>
</template>
<script>
import {
  convertTimestampToHoursMinutes,
  getUvSummaryName,
  getUvSummaryImage,
  convertTimestampToAmPm,
  convertTimestampToHoursMinutes12,
} from "../../../utils/converValue.js";
import VueHorizontal from "vue-horizontal";

export default {
  name: "uv-index-summer-page",
  components: {
    VueHorizontal,
  },
  data() {
    return {
      sun_svgrepo_com_1: require("../../../assets/images/svg/sun_svgrepo_com_1.svg"),
      sun_svgrepo_com_2: require("../../../assets/images/svg/sun_svgrepo_com_2.svg"),
      sun_svgrepo_com_3: require("../../../assets/images/svg/sun_svgrepo_com_4.svg"),
      sun_svgrepo_com_4: require("../../../assets/images/svg/sun_svgrepo_com_5.svg"),
      sun_svgrepo_com_5: require("../../../assets/images/svg/sun_svgrepo_com_6.svg"),
    };
  },

  computed: {
    paramHourly() {
      return this.$store.state.getWeather.hourly;
    },
  },

  methods: {
    renderUiIndex(value) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      const timestampValue =
        unitSetting.activeTime_save === "12h"
          ? convertTimestampToHoursMinutes12(value.time, 1, offsetValue)
          : convertTimestampToHoursMinutes(value.time, 1, offsetValue);
      const nameUvValue = getUvSummaryName(value.uvIndex);
      const imageUvValue = getUvSummaryImage(value.uvIndex);
      const amPmValue = convertTimestampToAmPm(value.time);

      return {
        timestampValue: timestampValue,
        nameUvValue: nameUvValue,
        imageUvValue: imageUvValue,
        amPmValue: amPmValue,
      };
    },

    onClickDetailUvIndex() {
      const city = this.$route.params.city; // Lấy giá trị của city từ route hiện tại
      this.$router
        .push({ name: "uv-index-view", params: { city } }) // Điều hướng đến route con
        .then(() => {
          document.getElementsByClassName("body-app")[0].scrollTo(0, 0);
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped>
.horizontal >>> .v-hl-btn-prev {
  display: none !important;
  left: 10px !important;
}
.horizontal >>> .v-hl-btn-next {
  display: none !important;

  right: 10px !important;
}
.horizontal:hover >>> .v-hl-btn-prev {
  display: flex !important;
  left: 10px !important;
  opacity: 0.5;
}

.horizontal:hover >>> .v-hl-btn-next {
  display: flex !important;
  right: 10px !important;
  opacity: 0.5;
}
</style>
