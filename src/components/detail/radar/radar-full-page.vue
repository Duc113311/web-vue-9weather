<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="w-full md:h-[1000px] h-[710px]">
      <div class="w-full h-full flex gap-4 flex-wrap">
        <div class="w-[883px] h-full">
          <!--  -->
          <div class="p-4 flex w-full justify-between bg-white">
            <p class="txt_medium txt-v2">
              {{ $t("{name}_weather_radar", { name: renderCityName }) }}
            </p>
            <el-popover
              ref="popover"
              placement="left"
              :width="500"
              trigger="click"
            >
              <template #reference>
                <img
                  src="../../../assets/images/svg/gg_info.svg"
                  width="20"
                  alt=""
                />
              </template>

              <template #default>
                <div class="w-[480px] h-full">
                  <div class="txt_medium">
                    {{ renderCityName }} Weather Radar
                  </div>
                  <p class="txt_light_14">
                    Weather radar map shows the location of precipitation, its
                    type (rain, snow, and ice) and its recent movement to help
                    you plan your day. Simulated radar displayed over oceans,
                    Central and South American countries is generated from
                    satellite data, which is provided up to the current time and
                    may not be updated as frequently as other regions.
                  </p>
                </div>
              </template>
            </el-popover>
          </div>
          <!--  -->
          <div v-if="renderRadar !== null" class="w-full h-[calc(100%-98px)]">
            <iframe
              :src="renderRadar"
              width="100%"
              height="100%"
              frameborder="0"
              scrolling="no"
            ></iframe>
          </div>

          <div v-else class="w-full h-[calc(100%-98px)] mar-b">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
          <!--  -->
          <div class="w-full flex justify-between items-center">
            <div
              class="text-center item-radar w-[215px] p-2 cursor-pointer bg-blue-300 text-white"
              v-for="(item, index) in dataActionRadar"
              :key="index"
              :class="{ 'bg-active': selectActive === index }"
              @click="onClickChooseOptionRadar(index)"
            >
              <div class="flex items-center justify-center gap-2">
                <div class="flex items-center justify-center mb-1.5">
                  <img width="20" height="20" :src="item.urlImg" alt="" />
                </div>
                <div class="txt_regular_14">{{ $t(item.title) }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-[250px] bg-ads h-full">
          <!--  -->
        </div>
      </div>
    </div>

    <div class="w-full h-[200px] flex justify-center items-center mb-6 mt-6">
      <div class="img-ads-ngang bg-ads w-full h-full">
        <!-- Ads -->
      </div>
    </div>
  </div>
</template>
<script>
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";

export default {
  name: "radar-full-page.vue",
  components: {
    SkeletonLoader,
  },
  data() {
    return {
      selectActive: 0,
      dataActionRadar: [
        {
          title: "Temperature_{name}",
          urlImg: require("../../../assets/images/svg/radar/svg_radar_barometer.imageset/svg_ic_barometer.svg"),
        },
        {
          title: "Rain",
          urlImg: require("../../../assets/images/svg/radar/svg_radar_rain.imageset/svg_ic_rain.svg"),
        },
        {
          title: "Humidity",
          urlImg: require("../../../assets/images/svg/radar/svg_radar_humidity.imageset/svg_ic_humidity.svg"),
        },
        {
          title: "Cloudy",
          urlImg: require("../../../assets/images/svg/radar/svg_radar_cloudy.imageset/svg_ic_cloudy.svg"),
        },
        {
          title: "Pressure",
          urlImg: require("../../../assets/images/svg/radar/svg_radar_temperature.imageset/svg_ic_temperature.svg"),
        },
        {
          title: "Snow",
          urlImg: require("../../../assets/images/svg/radar/svg_radar_snow.imageset/svg_img_snow.svg"),
        },
        {
          title: "Speed",
          urlImg: require("../../../assets/images/svg/radar/svg_radar_wind.imageset/svg_ic_wind.svg"),
        },
      ],
      overlayValue: "temp", // temp, rain, snow, wind, pressure, humidity, clouds
    };
  },

  computed: {
    renderRadar() {
      const dataPosition = this.$store.state.getWeather.cityCountry;
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
      return urlIf;
    },

    renderCityName() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName.city;
      }
      return "";
    },
  },

  methods: {
    onClickChooseOptionRadar(val) {
      this.selectActive = val;
      switch (val) {
        case 1:
          this.overlayValue = "rain";
          break;
        case 2:
          this.overlayValue = "snow";
          break;
        case 3:
          this.overlayValue = "wind";
          break;
        case 4:
          this.overlayValue = "pressure";
          break;
        case 5:
          this.overlayValue = "humidity";
          break;
        case 6:
          this.overlayValue = "clouds";
          break;
        default:
          this.overlayValue = "temp";
          break;
      }
    },
  },
};
</script>
<style lang="scss">
.item-radar:hover {
  background-color: rgba(96, 124, 190, 0.557);
  transition: background-color 0.5s;
}

.bg-active {
  background-color: rgba(96, 124, 190, 0.557);
}
</style>
