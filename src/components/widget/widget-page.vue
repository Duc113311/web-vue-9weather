<template>
  <div class="w-full h-full">
    <div class="w-full h-[200px] flex justify-center items-center mb-6 mt-6">
      <div class="img-ads bg-ads w-full h-full">
        <!-- Ads -->
      </div>
    </div>
    <!-- -->
    <div class="w-full bg-from mb-10 card">
      <div class="w-full pl-4 pr-4 pt-4 text-left bor-bottom">
        <div class="w-full p-4">
          <div class="txt_regular">
            <span>{{ $t("Weather_forecast_on_your_website") }}</span>
          </div>
          <div class="txt_light_summer">
            <span
              >{{
                $t(
                  "Create_a_custom_code_for_your_website_and_copy_the_embed_code_and_add_it_to_the_location_you_want_to_display_on_your_website."
                )
              }}
            </span>
          </div>
        </div>
      </div>
      <div class="w-full pl-4 pr-4 pb-4">
        <div class="flex w-full justify-between p-4">
          <!-- Left -->
          <div class="w-[50%] flex flex-col gap-4">
            <div class="label w-full">
              <div class="text-left mb-2 txt_regular">
                <span>{{ $t("Location") }}</span>
              </div>
              <div class="w-full flex justify-start">
                <el-autocomplete
                  v-model="valueAddress"
                  :fetch-suggestions="querySearchAsync"
                  :placeholder="$t('Search_location')"
                  @select="handleSelect"
                >
                  <template #default="{ item }">
                    <div>
                      <div class="txt_medium">{{ item.value }}</div>
                      <span class="link">{{ item.country }}</span>
                    </div>
                  </template>
                </el-autocomplete>
              </div>
            </div>
            <div class="label w-full">
              <div class="text-left mb-2 txt_regular">
                <span>{{ $t("Sampling") }}</span>
              </div>
              <div class="w-full flex justify-start">
                <el-select
                  v-model="valueSampling"
                  :placeholder="$t('Select')"
                  size="large"
                >
                  <el-option
                    v-for="item in optionsSampling"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="label w-full">
              <div class="text-left mb-2 txt_regular">
                <span>{{ $t("Number_of_days") }} </span>
              </div>
              <div class="w-full flex justify-start">
                <el-select
                  v-model="valueNumberDay"
                  placeholder="Select"
                  size="large"
                  @change="onChangeNumberDay"
                >
                  <el-option
                    v-for="item in optionsNumberDay"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>

            <div class="label w-full">
              <div class="text-left mb-2 txt_regular">
                <span>{{ $t("Color_change_panel") }}</span>
              </div>
              <div
                class="w-full flex gap-10 items-center h-[140px] txt_light_summer"
              >
                <div
                  class="flex flex-col items-center h-full justify-between gap-1 text-left"
                >
                  <div class="flex flex-col gap-1 w-full">
                    <div>
                      <span>{{ $t("Background_color") }}</span>
                    </div>
                    <div class="p-1.5 w-[40px] h-[35px]">
                      <el-color-picker
                        :show-alpha="false"
                        v-model="titleBackgroundColor"
                        @change="onChangeTitleBackgroundColor"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col gap-1 w-full">
                    <div>
                      <span>{{ $t("Color_description") }}</span>
                    </div>
                    <div class="p-1.5 w-[40px] h-[35px]">
                      <el-color-picker
                        :show-alpha="true"
                        v-model="descriptionColor"
                        @change="onChangeDescriptionColor"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="flex flex-col items-center h-full justify-between gap-1 text-left"
                >
                  <div class="flex flex-col gap-1 w-full">
                    <div>
                      <span>{{ $t("Title_color") }}</span>
                    </div>
                    <div class="p-1.5 w-[40px] h-[35px]">
                      <el-color-picker
                        :show-alpha="true"
                        v-model="titleColor"
                        @change="onChangeTitleColor"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col gap-1 w-full">
                    <div>
                      <span>{{ $t("Text_color") }}</span>
                    </div>
                    <div class="p-1.5 w-[40px] h-[35px]">
                      <el-color-picker
                        :show-alpha="true"
                        v-model="textColor"
                        @change="onChangeTextColor"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="flex flex-col items-center h-full justify-between gap-1 text-left"
                >
                  <div class="flex flex-col gap-1 w-full">
                    <div>
                      <span>{{ $t("Line_color") }}</span>
                    </div>
                    <div class="p-1.5 w-[40px] h-[35px]">
                      <el-color-picker
                        :show-alpha="true"
                        v-model="lineColor"
                        @change="onChangeLineColor"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full mt-4 text-left">
              <button
                @click="onClickCreateWidget()"
                type="button"
                class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none font-medium rounded-xl text-sm px-4 py-2.5 text-center me-2 mb-2"
              >
                <div class="flex items-center justify-center gap-1">
                  <img src="../../assets/images/svg/ic_create.svg" alt="" />
                  <span class="txt_medium">{{ $t("Add_Widget") }}</span>
                </div>
              </button>
            </div>
          </div>
          <!-- right -->
          <div class="w-[50%] h-full pl-8 pr-8">
            <div class="title-switch">
              <!--  -->
              <div class="w-full text-left txt_regular">
                <span>{{ $t("Width") }}:</span>
              </div>
              <div class="slider-demo-block">
                <el-slider
                  :max="500"
                  :min="200"
                  v-model="valueSliderWidth"
                  @change="onChangeSliderWidth"
                />
              </div>
            </div>
            <div class="form-widget w-full p-2">
              <div class="w-full h-full flex justify-center items-center">
                <!--  -->
                <div
                  :style="{
                    width: valueSliderWidth + 'px',
                    'background-color': titleBackgroundColor,
                  }"
                  class="widget-form-new p-6 text-black overflow-hidden"
                >
                  <!--  -->
                  <div class="w-full items-center">
                    <!-- Nhiệt độ -->
                    <div class="flex w-full">
                      <div
                        class="text-left h-full w-[50%]"
                        :style="{ color: titleColor }"
                      >
                        <p class="temp-ture">
                          <span class="txt_regular_title_50">{{
                            convertTemperature(
                              renderObjectWidget?.currently?.temperature
                            )
                          }}</span>
                          <span class="relative h-full txt_regular_title_30">
                            <span class="absolute top-0 left-0">°</span>
                            <span class="absolute bottom-0 left-0">{{
                              convertUnitTemperature()
                            }}</span>
                          </span>
                        </p>
                        <a class="txt_regular_city_40" href="">{{
                          renderObjectWidget.titleName
                        }}</a>
                        <p>
                          <span
                            >{{ $t("Feels_like") }}
                            {{
                              convertTemperature(
                                renderObjectWidget?.currently
                                  ?.apparentTemperature
                              )
                            }}°</span
                          >
                        </p>
                        <p><span>Moderate rain</span></p>
                      </div>
                      <div class="ml-4 h-full flex items-center pt-4">
                        <img
                          width="70"
                          :src="
                            convertIconCurrently(
                              renderObjectWidget?.currently?.icon
                            )
                          "
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <!--  -->
                  <div
                    class="h-[42%] w-full flex items-center justify-center"
                    :style="{ color: textColor }"
                  >
                    <div class="w-full">
                      <div
                        :style="{ 'border-bottom': `1px solid ${lineColor}` }"
                        class="flex justify-between items-center pt-2 pb-2 txt_light_14"
                        v-for="(item, index) in renderObjectWidget?.listDaily"
                        :key="index"
                      >
                        <div>
                          <span>{{ convertDayWeek(item.time) }}</span>
                        </div>
                        <div class="flex items-center">
                          <img
                            src="../../assets/images/svg/ic_droplets.svg"
                            alt=""
                            width="16"
                          />
                          <span>{{ Math.round(item.humidity * 100) }}%</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <img :src="convertIconCurrently(item?.icon)" alt="" />
                          <img :src="convertIconCurrently(item?.icon)" alt="" />
                        </div>
                        <div class="flex items-center gap-1">
                          <span>
                            {{ convertTemperature(item.temperatureMin) }}°
                          </span>
                          <span>
                            {{ convertTemperature(item.temperatureMax) }}°
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="h-[calc(100%-80%)] w-full">
                    <div
                      class="w-full flex justify-end items-center h-full gap-1 mt-2"
                    >
                      <div class="logoImg"></div>
                    </div>
                  </div>
                </div>
                <!--  -->
              </div>
            </div>
            <div class="w-full h-[100px] mt-4 bor-form-10">
              <textarea
                type="textarea"
                ref="iframeCode"
                class="textarea-type hide-scroll"
                :placeholder="$t('Copy_code_iframe_in_website')"
                v-model="valueCodeWidget"
                maxlength="500"
              />
            </div>

            <div class="w-full mt-4 text-left">
              <button
                @click="onClickCopyWidget"
                type="button"
                class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none font-medium rounded-xl text-sm px-4 py-2.5 text-center me-2 mb-2"
              >
                <div class="flex items-center justify-center gap-1">
                  <img src="../../assets/images/svg/ic_copy.svg" alt="" />
                  <span class="txt_medium">{{ $t("Copy_code") }}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-html="valueCodeWidget"></div> -->

    <!-- Cách giải quyết là tạo 1 link widget/index vẽ form đó, đồng thời sẽ vẽ thêm 1 form bên này khi tạo sẽ lấy form kia add vào link và sẽ hiện được widget -->
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { ElNotification } from "element-plus";
import { encodeBase64, urlEncodeString } from "../../utils/EncoderDecoderUtils";

import {
  getIconHourlyForecastTheme,
  convertDayOfWeek,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  codeToFind,
} from "../../utils/converValue.js";
export default {
  name: "widget-page",
  components: {},

  setup() {
    const successCopy = () => {
      ElNotification({
        title: "Success",
        message: "Copy url iframe widget success",
        type: "success",
        duration: 3000,
        position: "top-right",
        dangerouslyUseHTMLString: true,
        showClose: true, // Show the close button
        iconClass: "el-icon-check", // Custom icon class
        customClass: "custom-notification", // Custom CSS class
        offset: 50, // Offset from the top
      });
    };
    return {
      successCopy,
    };
  },

  data() {
    return {
      valueAddress: "",
      valueSampling: this.$t("Sample_{number}", { number: 1 }),
      valueNumberDay: this.$t("{number}_days", { number: 3 }),
      valueCodeWidget: "",

      valueSliderWidth: 300,
      color: "#ff0000",
      listAddressVietName: [],
    };
  },

  computed: {
    optionsSampling() {
      return [
        {
          value: "option_1",
          label: this.$t("Sample_{number}", { number: 1 }),
        },
        {
          value: "option_2",
          label: this.$t("Sample_{number}", { number: 2 }),
        },
        {
          value: "option_3",
          label: this.$t("Sample_{number}", { number: 3 }),
        },
      ];
    },

    optionsNumberDay() {
      return [
        {
          value: "number_1",
          label: this.$t("{number}_days", { number: 1 }),
        },
        {
          value: "number_3",
          label: this.$t("{number}_days", { number: 3 }),
        },
        {
          value: "number_5",
          label: this.$t("{number}_days", { number: 5 }),
        },
        {
          value: "number_7",
          label: this.$t("{number}_days", { number: 7 }),
        },
      ];
    },

    titleBackgroundColor() {
      return this.$store.state.commonModule.titleBackgroundColor;
    },
    descriptionColor() {
      return this.$store.state.commonModule.descriptionColor;
    },
    titleColor() {
      return this.$store.state.commonModule.titleColor;
    },
    textColor() {
      return this.$store.state.commonModule.textColor;
    },
    lineColor() {
      return this.$store.state.commonModule.lineColor;
    },

    renderObjectWidget() {
      return this.$store.state.commonModule.objectWidget;
    },

    renderCountry() {
      return this.$store.state.getWeather.cityCountry;
    },
  },

  mounted() {
    this.loadDataVietName();
    this.onClickCreateWidget();
  },

  methods: {
    ...mapMutations([
      "setTitleBackgroundColor",
      "setDescriptionColor",
      "setTitleColor",
      "setTextColor",
      "setLineColor",
      "setDataWidget",
      "setWeatherWidget",
      "setNumberDataDaily",
    ]),
    ...mapActions(["getFormattedAddress", "getWeatherWidget"]),
    onChangeSliderWidth(value) {
      this.valueSliderWidth = value;
    },

    onChangeDescriptionColor(color) {
      this.descriptionColor = color;
      this.setDescriptionColor(color);
    },

    onChangeTitleColor(color) {
      this.titleColor = color;
      this.setTitleColor(color);
    },

    onChangeTextColor(color) {
      this.textColor = color;
      this.setTextColor(color);
    },

    onChangeLineColor(color) {
      this.lineColor = color;
      this.setLineColor(color);
    },

    onChangeTitleBackgroundColor(color) {
      debugger;
      this.titleBackgroundColor = color;
      this.setTitleBackgroundColor(color);
    },

    changeColor(color) {
      this.color = color.hex;
      //const { r, g, b, a } = color.rgba;
      //this.color = `rgba(${r}, ${g}, ${b}, ${a})`;
    },
    openSucker(isOpen) {
      if (isOpen) {
        // ... canvas be created
        // this.suckerCanvas = canvas
        // this.suckerArea = [x1, y1, x2, y2]
      } else {
        // this.suckerCanvas && this.suckerCanvas.remove
      }
    },

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
      console.log(value);

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return celsiusToFahrenheit(value);
      } else {
        return fahrenheitToCelsius(value);
      }
    },

    convertUnitTemperature() {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTemperature_save === "f") {
        return "F";
      } else {
        return "C";
      }
    },

    onClickCreateWidget() {
      const objectWidget = this.$store.state.commonModule.objectWidget;
      const objectWidgetString = JSON.stringify(objectWidget);
      localStorage.setItem("objectWidget", objectWidgetString);

      const titleColor = this.$store.state.commonModule.titleColor;
      const textColor = this.$store.state.commonModule.textColor;
      const titleBackgroundColor =
        this.$store.state.commonModule.titleBackgroundColor;
      const descriptionColor = this.$store.state.commonModule.descriptionColor;
      const lineColor = this.$store.state.commonModule.lineColor;
      const srcUrl = `http://localhost:8080/widget-view?titleColor=${titleColor}&textColor=${textColor}&titleBackgroundColor=${titleBackgroundColor}&descriptionColor=${descriptionColor}&lineColor=${lineColor}&objectWidget=${objectWidgetString}`;

      this.valueCodeWidget = `<iframe
        width=${this.valueSliderWidth}+'px'
        height="360px"
        src="${srcUrl}"
        id="widget-view"
        scrolling="no"
        frameborder="0"
        allowtransparency="true"
        style="border: none; overflow: hidden"
      ></iframe>`;
    },

    onClickCopyWidget() {
      const textarea = this.$refs.iframeCode;
      textarea.select();
      document.execCommand("copy");

      this.successCopy();
    },

    loadDataVietName() {
      fetch("file-txt/Vietnam.txt")
        .then((response) => response.text())
        .then((text) => {
          this.processFileVietName(text);
        })
        .catch((error) => {
          console.error("Error loading file:", error);
        });
    },

    processFileVietName(data) {
      const lines = data.split("\n");
      this.listAddressVietName = lines.map((line, index) => {
        const values = line
          .split(";")
          .map((value) => value.replace(/"/g, "").trim());
        return {
          id: index + 1,
          country: values[1],
          value: values[2],
          lat: values[3],
          lng: values[4],
        };
      });
    },
    async querySearchAsync(queryString, cb) {
      let timeout;
      const results = queryString
        ? this.listAddressVietName.filter(this.createFilter(queryString))
        : this.listAddressVietName;

      if (results.length > 0) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          cb(results);
        }, 300 * Math.random());
      } else {
        const urlParam = `version=1&type=4&app_id=amobi.weather.forecast.storm.radar&request=https://maps.googleapis.com/maps/api/geocode/json?address=${urlEncodeString(
          this.valueSearch
        )}&key=TOH_KEY`;

        const value = encodeBase64(urlParam);

        await this.getFormattedAddress(value);
        timeout = setTimeout(() => {
          cb(this.$store.state.getWeather.newArray);
        }, 300 * Math.random());
      }
    },

    createFilter(queryString) {
      return (city) => {
        const searchString = queryString.toLowerCase();
        return (
          city.value.toLowerCase().includes(searchString) ||
          city.country.toLowerCase().includes(searchString)
        );
      };
    },

    async handleSelect(item) {
      this.valueAddress = item.value;
      this.setDataWidget(item.value);

      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${item.lat},${item.lng}?lang=en`;
      const value = encodeBase64(param);
      await this.getWeatherWidget(value);
    },

    onChangeNumberDay(value) {
      debugger;
      switch (value) {
        case "number_5":
          this.setNumberDataDaily(5);
          break;
        case "number_7":
          this.setNumberDataDaily(7);
          break;
        default:
          this.setNumberDataDaily(3);
          break;
      }
    },
  },
};
</script>

<style lang="scss">
.bg-title-widget {
  background-color: rgb(149 139 208 / 25%);
}
.change-color-widget {
  border: 1px solid #000000;
  border-radius: 5px;
}

.slider-demo-block {
  max-width: 600px;
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}

.widget-form-new {
  box-shadow: 0 14px 28px rgb(0 0 0 / 0%), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.textarea-type {
  width: 100%;
  height: 100%;
  outline: none; /* Loại bỏ viền xung quanh khi được focus */
  resize: none; /* Ngăn chặn khả năng thay đổi kích thước */
  border-radius: 14px;
  padding: 10px;
  color: #000000;
}

.textarea-type:target {
  border: none;
}

.textarea-type:focus-visible {
  border: none;
}
.logoImg {
  background-image: url(../../assets/images/svg/logo_n_widget.svg);
  width: 125px;
  height: 40px;
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
.custom-notification {
  text-align: left;
}
</style>
