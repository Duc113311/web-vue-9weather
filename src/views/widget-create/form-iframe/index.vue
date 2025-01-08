<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="form-widget w-full h-[400px] p-2">
      <!--  -->
      <div
        :style="{ 'background-color': titleBackgroundColor }"
        class="w-ful h-[360px] widget-form-new p-4 text-black"
      >
        <!--  -->
        <div class="w-full h-[50%] items-center">
          <!-- Nhiệt độ -->
          <div class="flex w-full">
            <div
              class="text-left h-full w-[50%]"
              :style="{ color: titleColor }"
            >
              <p class="temp-ture">
                <span class="txt_regular_title_50"
                  >{{
                    convertTemperature(
                      renderObjectWidget?.currently?.temperature
                    )
                  }}°</span
                >
              </p>
              <a class="txt_regular_city_40" href="">{{
                renderObjectWidget.titleName
              }}</a>
              <p>
                <span
                  >{{ $t("real_feel") }}
                  {{
                    convertTemperature(
                      renderObjectWidget?.currently?.temperature
                    )
                  }}°</span
                >
              </p>
              <p><span>Moderate rain</span></p>
            </div>
            <div class="ml-4 h-full flex items-center pt-4">
              <img
                width="70"
                :src="convertIconCurrently(renderObjectWidget?.currently?.icon)"
                alt=""
              />
            </div>
          </div>
        </div>
        <!--  -->
        <div
          class="h-[40%] w-full flex items-center justify-center mt-2"
          :style="{ color: textColor }"
        >
          <div class="w-full">
            <div
              :style="{ 'border-bottom': `1px solid ${lineColor}` }"
              v-for="(item, index) in renderObjectWidget?.listDaily"
              :key="index"
              class="flex justify-between items-center pt-2 pb-2 txt_light_14 bor-bottom"
            >
              <div>
                <span>{{ convertDayWeek(item.time) }}</span>
              </div>
              <div class="flex items-center">
                <img
                  src="../../../assets/images/svg/ic_droplets.svg"
                  alt=""
                  width="16"
                />
                <span>{{ item.humidity * 100 }}%</span>
              </div>
              <div class="flex items-center gap-2">
                <component :is="convertIconCurrently(item?.icon)"></component>
              </div>
              <div class="flex items-center gap-1">
                <span> {{ convertTemperature(item.temperatureMin) }}° </span>
                <span> {{ convertTemperature(item.temperatureMax) }}° </span>
              </div>
            </div>
          </div>
        </div>

        <div class="h-[calc(100%-90%)] w-full">
          <div class="w-full flex justify-end items-center h-full gap-1">
            <div class="logoImg"></div>
            <div>
              <span>Thời tiết</span>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>
<script>
import {
  getIconHourlyForecastTheme,
  convertDayOfWeek,
  fahrenheitToCelsiusNot,
} from "../../../utils/converValue.js";

export default {
  name: "form-iframe",

  data() {
    return {};
  },
  computed: {
    renderObjectWidget() {
      return JSON.parse(localStorage.getItem("objectWidget"))
        ? JSON.parse(localStorage.getItem("objectWidget"))
        : this.$store.state.commonModule.objectWidget;
    },

    titleBackgroundColor() {
      return this.$route.query.titleBackgroundColor
        ? this.$route.query.titleBackgroundColor
        : this.$store.state.commonModule.titleBackgroundColor;
    },
    descriptionColor() {
      return this.$route.query.descriptionColor
        ? this.$route.query.descriptionColor
        : this.$store.state.commonModule.descriptionColor;
    },
    textColor() {
      return this.$route.query.textColor
        ? this.$route.query.textColor
        : this.$store.state.commonModule.textColor;
    },
    lineColor() {
      return this.$route.query.lineColor
        ? this.$route.query.lineColor
        : this.$store.state.commonModule.lineColor;
    },
    titleColor() {
      return this.$route.query.titleColor
        ? this.$route.query.titleColor
        : this.$store.state.commonModule.titleColor;
    },
  },

  mounted() {},

  methods: {
    convertIconCurrently(value) {
      if (value) {
        const url = getIconHourlyForecastTheme(value);
        return url;
      }
    },

    convertDayWeek(value) {
      return convertDayOfWeek(value);
    },

    convertTemperature(value) {
      return fahrenheitToCelsiusNot(value);
    },
  },
};
</script>
<style lang="scss">
.logoImg {
  background-image: url(../../../assets/images/png/2.png);
  width: 30px;
  height: 20px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: width 0.3s ease, height 0.3s ease; /* Thêm hiệu ứng chuyển đổi */
}

.temp-ture {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: start;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
</style>
