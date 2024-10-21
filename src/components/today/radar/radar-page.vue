<template>
  <div class="w-full h-full">
    <!--  -->
    <BaseComponent :isShowPad="false">
      <!--  -->
      <template v-slot:header>
        <div class="flex items-center text-left gap-2 mb-1">
          <img
            src="../../../assets/images/svg_v2/ic_radar.svg"
            width="24"
            alt=""
          />
          <span>Radar</span>
        </div>
      </template>
      <div v-if="renderRadar !== null" class="h-full overflow-hidden">
        <!--  -->
        <iframe
          :src="renderRadar"
          width="100%"
          height="100%"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import { mapGetters } from "vuex";

export default {
  name: "radar-page",

  components: {
    BaseComponent,
  },

  data() {
    return {
      overlayValue: "temp",
    };
  },

  computed: {
    ...mapGetters("weatherModule", ["cityCountryGetters"]),

    renderRadar() {
      const dataPosition = this.cityCountryGetters;
      console.log("dataPosition", dataPosition);
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

      const urlIf = `https://embed.windy.com/embed2.html?lat=${dataPosition.latitude}&lon=${dataPosition.longitude}&zoom=${zoomValue}&metricTemp=${metricTempValue}&level=surface&overlay=${this.overlayValue}`;
      return urlIframe;
    },
  },

  methods: {},
};
</script>
<style lang="scss"></style>
