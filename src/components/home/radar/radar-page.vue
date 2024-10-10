<template>
  <div class="w-full h-full">
    <!--  -->
    <div
      class="flex justify-between items-start pad-border-bottom pad-form-radios"
    >
      <div class="txt_bold txt-v2">
        <span>{{ $t("Weather_Radar") }}</span>
      </div>
      <div class="cursor-pointer" @click="onClickDetailRadar()">
        <img
          width="20"
          src="../../../assets/images/svg/svg_ic_more.xml.svg"
          alt=""
        />
      </div>
    </div>
    <!--  -->

    <div class="overflow-hidden h-[calc(100%-50px)] w-full">
      <div class="w-full h-full bg-slate-400">
        <!-- iframe  -->
        <div class="iframe-container">
          <iframe
            class="no-scroll"
            :src="renderRadar"
            width="100%"
            height="100%"
            frameborder="0"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<!--  -->
<script>
export default {
  name: "radar-page",
  data() {
    return {
      overlayValue: "temp",
    };
  },
  computed: {
    renderRadar() {
      const dataPosition = this.$store.state.getWeather.countryFilter;

      const objectSetting = this.$store.state.commonModule.objectSettingSave;

      if (!dataPosition || !dataPosition.latitude || !dataPosition.longitude) {
        return null;
      }
      const zoomValue = "7"; // 7,6,5,4,3
      const metricTempValue =
        objectSetting.activeTemperature_save === "f" ? "f" : "c"; // c, f
      const metricRainValue = "mm"; // mm, in
      const metricSnow = "cm"; // cm, in
      const metricWind = "kmh"; // kmh, kt, bft, ms,mh
      const metricPressure = "hpa"; // hpa, inhg, mmhg
      const metricHumidity = "percent"; // percent
      const metricClouds = "mm"; // mm, in

      const urlHost =
        "https://maps.goweatherradar.com/en/widget/1bfe4f546eb8a1d9fbe2f73812e60361e616c57d";

      const urlIframe =
        urlHost +
        `?lat=${dataPosition.latitude}&lng=${dataPosition.longitude}&overlay=${this.overlayValue}&zoom=${zoomValue}&metricTemp=${metricTempValue}&metricRain=${metricRainValue}&metricSnow=${metricSnow}&metricWind=${metricWind}&metricPressure=${metricPressure}&metricHumidity=${metricHumidity}&metricClouds=${metricClouds}`;
      return urlIframe;
    },
  },

  methods: {
    onClickDetailRadar() {
      const city = this.$route.params.city; // Lấy giá trị của city từ route hiện tại
      this.$router
        .push({ name: "radar-view", params: { city } }) // Điều hướng đến route con
        .then(() => {
          document.getElementsByClassName("body-app")[0].scrollTo(0, 0);
        })
        .catch(() => {});
    },
  },
};
</script>
<!--  -->
<style lang="scss">
.iframe-container {
  position: relative;
  width: 100%;
  padding-bottom: 100%; /* Aspect ratio (height:width) */
  height: 0;
}

.iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.no-scroll {
  overflow: hidden;
  pointer-events: none; /* Ngăn chặn các sự kiện chuột */
}
</style>
