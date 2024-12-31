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
          <span class="txt_medium_14">Radar Map</span>
        </div>
      </template>

      <div class="w-full h-[430px]">
        <div class="w-full h-full relative">
          <iframe
            ref="radarIframe"
            :key="iframeKey"
            :src="renderRadar"
            width="100%"
            height="100%"
            frameborder="0"
            scrolling="no"
          ></iframe>

          <!-- Thêm nút phóng to -->
          <div
            class="absolute bottom-2 bg-room right-2 p-1.5 rounded cursor-pointer transition-all"
            @click="toggleFullScreen"
          >
            <img
              src="../../../assets/images/svg_v2/ic_fullscreen.svg"
              width="24"
              height="24"
              alt="Fullscreen"
            />
          </div>

          <!-- Thêm nút locate -->
          <div
            class="absolute bottom-4 left-4 bg-locate p-1.5 rounded cursor-pointer transition-all"
            @click="onClickLocateFixed"
          >
            <img
              src="../../../assets/images/svg_v2/ic_locate_fixed.svg"
              width="24"
              height="24"
              alt="locate-fixed"
            />
          </div>
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "radar-map-page",

  components: {
    BaseComponent,
  },

  data() {
    return {
      heightAuto: "auto",
      originalPosition: null,
      userLocation: null,
      iframeKey: 0,
    };
  },

  props: {
    overlayValue: {
      type: String,
      default: "temp",
    },
  },

  computed: {
    ...mapGetters("weatherModule", ["cityCountryGetters"]),
    ...mapGetters("commonModule", ["breadcumsObjectGetters"]),

    wardParam() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.breadcumsObjectGetters;

      return resultData;
    },
    renderRadar() {
      const dataPosition = this.originalPosition;
      const objectSetting = this.$store.state.commonModule.objectSettingSave;
      if (!dataPosition || !dataPosition.latitude || !dataPosition.longitude) {
        return null;
      }
      const zoomValue = "7"; // 7,6,5,4,3
      const metricTempValue =
        objectSetting.activeTemperature_save === "f" ? "f" : "c"; // c, f
      const metricRainValue = "mm"; // mm, in
      const metricSnow = "cm"; // cm, in
      const metricWind = this.convertMetricWind(
        objectSetting.activeWindSpeed_save
      ); // kmh, kt, bft, ms,mh
      const metricPressure = objectSetting.activePressure_save; // hpa, inhg, mmhg
      const metricHumidity = "percent"; // percent
      const metricClouds = objectSetting.activePrecipitation_save; // mm, in
      const urlHost =
        "https://maps.goweatherradar.com/en/widget/1bfe4f546eb8a1d9fbe2f73812e60361e616c57d";
      const urlIframe =
        urlHost +
        `?lat=${dataPosition.latitude}&lng=${dataPosition.longitude}&overlay=${this.overlayValue}&zoom=${zoomValue}&metricTemp=${metricTempValue}&metricRain=${metricRainValue}&metricSnow=${metricSnow}&metricWind=${metricWind}&metricPressure=${metricPressure}&metricHumidity=${metricHumidity}&metricClouds=${metricClouds}`;

      const urlIf = `https://embed.windy.com/embed2.html?lat=${dataPosition.latitude}&lon=${dataPosition.longitude}&zoom=${zoomValue}&metricTemp=${metricTempValue}&level=surface&overlay=${this.overlayValue}`;
      return urlIframe;
    },
  },

  watch: {
    originalPosition: {
      handler() {
        // Khi originalPosition thay đổi, iframe sẽ tự động cập nhật
      },
      deep: true,
    },
  },

  methods: {
    ...mapMutations("commonModule", ["setBreadcumsNotAllowLocation"]),
    convertMetricWind(value) {
      if (value === "m/s") {
        return "ms";
      }
      if (value === "km/h") {
        return "kmh";
      }
      if (value === "mi/h") {
        return "mh";
      }
      if (value === "knot") {
        return "kt";
      }
      if (value === "bft") {
        return "bft";
      }
    },

    toggleFullScreen() {
      // const iframe = this.$el.querySelector("iframe");
      // if (iframe) {
      //   if (!document.fullscreenElement) {
      //     iframe.requestFullscreen().catch((err) => {});
      //   } else {
      //     document.exitFullscreen();
      //   }
      // }
      this.$router.push("");
    },

    moveToPosition(position) {
      // Giả sử bạn có một phương thức để di chuyển iframe
      const jsCommand = `map.setView([${position.latitude}, ${position.longitude}], 7, { animate: true });`;

      // Gửi lệnh JavaScript đến iframe
      this.$refs.radarIframe.contentWindow.postMessage(
        { action: "executeJS", command: jsCommand },
        "*"
      );

      // Thêm hiệu ứng di chuyển (ví dụ: thông báo cho người dùng)
      console.log(
        `Di chuyển đến vị trí: ${position.latitude}, ${position.longitude}`
      );
    },

    // onClickLocateFixed() {},

    onClickLocateFixed() {
      // this.iframeKey += 1;
      const initialPosition = {
        latitude: this.wardParam.latitude,
        longitude: this.wardParam.longitude,
      };
      this.moveToPosition(initialPosition);
      // this.iframeKey += 1;
    },
  },

  mounted() {
    this.originalPosition = {
      latitude: this.wardParam.latitude,
      longitude: this.wardParam.longitude,
    };
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

.bg-locate {
  backdrop-filter: blur(56px);
  box-shadow: inset 500px 500px 100px 0 rgba(243, 243, 243, 0.15),
    inset -50px -50px 100px 0 rgba(243, 243, 243, 0.15);
}
.bg-locate,
.bg-room {
  transition: transform 0.3s ease; /* Hiệu ứng mượt khi thay đổi kích thước */
}

.bg-locate:hover,
.bg-room:hover {
  transform: scale(1.1); /* Phóng to 10% */
}

iframe {
  transition: border 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent; /* Default border */
}

iframe.active-radar {
  border: 2px solid #4caf50; /* Highlight border */
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.8); /* Optional glow effect */
}
</style>
