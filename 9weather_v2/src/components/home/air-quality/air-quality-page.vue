<template>
  <div class="w-full h-full">
    <!--  -->

    <div class="w-full flex items-center justify-between">
      <div class="flex justify-start items-center">
        <img src="../../../assets/images/svg/svg_ic_air_quality.svg" alt="" />
        <div
          class="txt_bold ml-2 txt_color_uv text-air text-left text-ellipsis text-nowrap overflow-hidden w-full"
        >
          <span>{{ $t("Air_quality") }}</span>
        </div>
      </div>
      <div @click="onClickRouterAirQuality()" class="cursor-pointer">
        <img
          width="20"
          src="../../../assets/images/svg/svg_ic_more.xml.svg"
          alt=""
        />
      </div>
    </div>

    <!--  -->

    <div
      class="w-full flex justify-start 2xl:pt-5 2xl:pb-5 xl:pt-3 xl:pb-3 pt-5 pb-5"
    >
      <div class="text-left">
        <div class="txt_regular_title" :style="{ color: progressColor }">
          <span>{{ paramAirModule }}</span>
        </div>
        <div class="txt_light">
          <span>{{ convertAirIndexName(paramAirModule) }}</span>
        </div>
      </div>
    </div>
    <!--  -->

    <div class="w-full relative">
      <el-progress
        :percentage="paramAirModule"
        :stroke-width="5"
        :show-text="false"
        class="custom-progress"
      ></el-progress>
      <div class="progress-dot" :style="dotStyle"></div>
    </div>
    <!--  -->
  </div>
</template>
<script>
import { getAirSummaryName } from "../../../utils/converValue.js";
import { decodeBase64 } from "../../../utils/EncoderDecoderUtils";

export default {
  name: "air-quality-page",
  data() {
    return {};
  },

  computed: {
    paramAirModule() {
      const storageAir = localStorage.getItem("airObject");
      if (storageAir) {
        const airObject = decodeBase64(storageAir);

        const decodeAirObject = JSON.parse(airObject);
        console.log("decodeAirObject", decodeAirObject);

        return decodeAirObject.aqi ? decodeAirObject.aqi : 0;
      }
      return this.$store.state.getAqi.airObject.aqi
        ? this.$store.state.getAqi.airObject.aqi
        : 0;
    },

    dotStyle() {
      return { left: `${(parseInt(this.paramAirModule) / 500) * 100}%` };
    },
    progressColor() {
      return this.getColorFromPercentage(this.paramAirModule);
    },
  },

  methods: {
    convertAirIndexName(val) {
      return getAirSummaryName(val);
    },

    getColorFromPercentage(percentage) {
      if (percentage <= 50) return "#507a46";
      if (percentage <= 100) return "#cbd956";
      if (percentage <= 150) return "#ecc32b";
      if (percentage <= 200) return "#f9b81d";
      if (percentage <= 300) return "#ff6272";
      return "#ff38a2"; // Giá trị phần trăm từ 90 đến 100
    },

    onClickRouterAirQuality() {
      const city = this.$route.params.city; // Lấy giá trị của city từ route hiện tại
      this.$router
        .push({ name: "air-quality-view", params: { city } }) // Điều hướng đến route con
        .then(() => {
          document.getElementsByClassName("body-app")[0].scrollTo(0, 0);
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss">
.custom-progress .el-progress-bar__outer {
  background: linear-gradient(
    90deg,
    #507a46,
    #cbd956,
    #ecc32b,
    #f9b81d,
    #ffb317,
    #ff7360,
    #ff6272,
    #ff38a2,
    #ff0dd3
  );
  border-radius: 25px;
  overflow: hidden;
}
.el-progress-bar__inner {
  background-color: transparent !important;
}

.progress-dot {
  position: absolute;
  top: -2px;
  width: 8px;
  height: 8px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  transition: left 0.3s;
}

.text-air {
}
</style>
