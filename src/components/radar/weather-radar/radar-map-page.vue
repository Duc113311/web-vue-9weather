<template>
  <div class="w-full h-full">
    <BaseComponent :height="heightAuto" :isShowPad="false">
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
            width="24"
            alt=""
          />
          <span>Radar Map</span>
        </div>
      </template>

      <div class="w-full h-[430px]">
        <div class="w-full h-full relative">
          <iframe
            :src="renderRadar"
            width="100%"
            height="100%"
            frameborder="0"
            scrolling="no"
          ></iframe>

          <!-- Thêm nút phóng to -->
          <div
            class="absolute bottom-2 right-2 bg-white/80 hover:bg-white p-1.5 rounded cursor-pointer transition-all"
            @click="toggleFullScreen"
          >
            <img
              src="../../../assets/images/svg_v2/ic_fullscreen.svg"
              width="20"
              height="20"
              alt="Fullscreen"
            />
          </div>
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import { mapGetters } from "vuex";

export default {
  name: "radar-map-page",

  components: {
    BaseComponent,
  },

  props: {
    overlayValue: {
      type: String,
      default: "temp",
    },
  },

  computed: {
    ...mapGetters("weatherModule", ["cityCountryGetters"]),

    renderRadar() {
      const dataPosition = this.cityCountryGetters;
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

  data() {
    return {
      heightAuto: "auto",
    };
  },

  methods: {
    toggleFullScreen() {
      const iframe = this.$el.querySelector("iframe");
      if (iframe) {
        if (!document.fullscreenElement) {
          iframe.requestFullscreen().catch((err) => {
            console.log(
              `Error attempting to enable fullscreen: ${err.message}`
            );
          });
        } else {
          document.exitFullscreen();
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
}
</style>
