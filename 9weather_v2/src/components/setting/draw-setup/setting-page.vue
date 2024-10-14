<template>
  <div class="">
    <!--  -->
    <el-drawer
      v-model="renderDrawer"
      :with-header="40"
      :close-on-click-modal="true"
      :show-close="false"
      @closed="handleBeforeClose"
      class="bg-header"
    >
      <template #header>
        <div class="w-full text-left pt-2 pb-2">
          <div class="flex justify-between w-full" v-if="isMobile">
            <div class="imgLogo cursor-pointer"></div>
            <div class="flex items-center justify-center">
              <img
                @click="onClickCancel()"
                src="../../../assets/images/svg/ic_cancel.svg"
                alt=""
                width="24"
                class="cursor-pointer"
                srcset=""
              />
            </div>
          </div>
          <div class="w-full txt_medium mt-1">
            {{ renderCountry.city }}, {{ renderCountry.country }}
          </div>
          <!--  -->
          <div
            v-if="!isMobile && namePage === 'setting'"
            class="flex justify-between w-full"
          >
            <div class="flex items-center gap-3">
              <div>
                <img src="../../../assets/images/svg/ic_settings.svg" alt="" />
              </div>
              <div class="txt_bold">
                <span>{{ $t("Settings") }}</span>
              </div>
            </div>
            <div class="flex items-center justify-center">
              <img
                @click="onClickCancel()"
                src="../../../assets/images/svg/ic_cancel.svg"
                alt=""
                width="24"
                class="cursor-pointer"
                srcset=""
              />
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <!-- Cài đặt đơn vị -->
        <div
          v-if="namePage === 'unit_settings'"
          class="flex justify-between w-full"
        >
          <div class="flex items-center gap-3">
            <div @click="onClickBackUnit('setting')">
              <img
                class="cursor-pointer"
                src="../../../assets/images/svg/ic_back_left.svg"
                alt=""
              />
            </div>
            <div class="txt_bold">
              <span>{{ $t("Unit_settings") }}</span>
            </div>
          </div>
        </div>
        <!-- Language -->
        <div
          v-if="namePage === 'language'"
          class="flex justify-between w-full relative"
        >
          <div class="flex items-center gap-3">
            <div @click="onClickBackUnit('setting')">
              <img
                class="cursor-pointer"
                src="../../../assets/images/svg/ic_back_left.svg"
                alt=""
              />
            </div>
            <div class="txt_bold">
              <span>{{ $t("Languages") }}</span>
            </div>
          </div>
          <div class="absolute right-0" v-if="isShowDone">
            <button class="txt_bold" @click="onClickUpdateLanguage()">
              Done
            </button>
          </div>
        </div>
        <!--  -->
        <div
          v-if="namePage === 'setting'"
          class="w-full h-full text-left text-white"
        >
          <!--  -->
          <div class="w-full">
            <!-- title -->
            <div class="w-full">
              <div class="w-full txt_color_summer txt_medium mb-2">
                <span>Settings </span>
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
                    <img
                      src="../../../assets/images/svg/ic_back_right.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div class="bor-bottom"></div>
                <!-- Cài đặt thông báo -->
                <div
                  class="w-full nav-bar cursor-pointer flex justify-between pad-option-tb-8"
                >
                  <div class="txt_light_summer">
                    <span>{{ $t("Get_PRO_version") }}</span>
                  </div>
                </div>
                <div class="bor-bottom"></div>
                <!-- Ra da -->

                <!-- language -->
                <div
                  @click="onClickLanguages('language')"
                  class="w-full nav-bar cursor-pointer flex justify-between pad-option-tb-8"
                >
                  <div class="txt_light_summer">
                    <span>{{ $t("Languages") }}</span>
                  </div>
                  <div>
                    <img
                      src="../../../assets/images/svg/ic_back_right.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--  -->
          <div class="w-full mt-2">
            <!-- title -->
            <div class="w-full">
              <div class="w-full txt_color_summer txt_medium mb-2">
                <span>Around the Globe</span>
              </div>
              <div class="w-full">
                <!-- Đánh giá -->
                <div
                  class="w-full nav-bar cursor-pointer flex justify-between pad-option-tb-8"
                >
                  <div class="txt_light_summer">
                    <span>{{ $t("Rate_me") }}</span>
                  </div>
                </div>
                <div class="bor-bottom"></div>
                <!-- Phản hồi gợi ý -->

                <div
                  class="w-full nav-bar cursor-pointer flex justify-between pad-option-tb-8"
                >
                  <div class="txt_light_summer">
                    <span>{{ $t("Report_problem") }}</span>
                  </div>
                </div>
                <div class="bor-bottom"></div>
                <!-- Chính sách bảo mật -->
                <div
                  class="w-full nav-bar cursor-pointer flex justify-between pad-option-tb-8"
                >
                  <div class="txt_light_summer">
                    <span>{{ $t("Privacy_policy") }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--  -->
        <UnitPage
          @onCloseDraw="onCloseDraw"
          v-if="namePage === 'unit_settings'"
        ></UnitPage>
        <!--  -->
        <NotificationPage
          v-if="namePage === 'notification_settings'"
        ></NotificationPage>
        <!-- Language -->
        <LanguagesPage
          @onChangeLaguages="onChangeLaguages"
          v-if="namePage === 'language'"
        ></LanguagesPage>
        <!-- Phản hồi và gợi ý -->
      </template>
      <template #footer>
        <div class="w-full">
          <div class="txt_medium color-footer">
            <span>{{ $t("Version") }} 1.2024</span>
          </div>
        </div>
      </template>
    </el-drawer>

    <BhDialogDefault
      v-if="isShowDialog"
      @onCancelModel="onCancelModel"
      @onClickSave="onClickSave"
      @onHideModel="onHideModel"
    >
      <FeedbackSuggestionPage></FeedbackSuggestionPage>
    </BhDialogDefault>
  </div>
</template>
<script>
import LanguagesPage from "../languages/languages-page.vue";
import NotificationPage from "../notification/notification-page";
import UnitPage from "../unit/unit-page";

import BhDialogDefault from "@/control-ui/dialog/bh-dialog-default.vue";
import { mapActions, mapMutations } from "vuex";
import {
  encodeBase64,
  getAqiDataFromLocation,
} from "../../../utils/EncoderDecoderUtils.js";
import FeedbackSuggestionPage from "../feedback/feedback-suggestion-page.vue";

export default {
  components: {
    NotificationPage,
    UnitPage,
    LanguagesPage,
    BhDialogDefault,
    FeedbackSuggestionPage,
  },
  name: "setting-page",

  data() {
    return {
      namePage: "setting",
      number: 2,
      isShowDialog: false,
      isShowDone: false,
      codeLanguage: "en",
      isMobile: window.innerWidth <= 991, // Adjust the width threshold as needed
    };
  },

  props: {
    drawerValue: {
      type: Boolean,
      required: false,
    },
  },

  computed: {
    renderDrawer() {
      debugger;
      return this.drawerValue;
    },

    renderCountry() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName;
      }
      return this.$store.state.getWeather.cityCountry;
    },

    drawerClass() {
      const iconName = this.$store.state.getWeather.currently;
      const dailyOneName = this.$store.state.getWeather.dailyOne;
      const isDay = this.convertTimeDayNight(dailyOneName);
      switch (iconName.icon) {
        case "rain":
          if (isDay) {
            return "bg_main_rain";
          } else {
            return "bg_main_rain_night";
          }
        case "partly-cloudy-day":
          return "bg_main_partlycloudyday";
        case "partly-cloudy-night":
          return "bg_main_partlycloudynight";
        case "clear-day":
          return "bg_main_clearday";
        case "clear-night":
          return "bg_main_clearnight";
        case "sleet":
          if (isDay) {
            return "bg_main_sleet";
          } else {
            return "bg_main_sleet_night";
          }
        case "fog":
          if (isDay) {
            return "bg_main_fog";
          } else {
            return "bg_main_fog_night";
          }
        case "wind":
          if (isDay) {
            return "bg_main_wind";
          } else {
            return "bg_main_wind_night";
          }
        case "snow":
          if (isDay) {
            return "bg_main_snow";
          } else {
            return "bg_main_snow_night";
          }
        case ("thunderstorm", "tornado"):
          if (isDay) {
            return "bg_main_thunderstorm_day";
          } else {
            return "bg_main_thunderstorm_night";
          }
        case "cloudy":
          if (isDay) {
            return "bg_main_cloudyday";
          } else {
            return "bg_main_cloudynight";
          }
        default:
          return "number-1";
      }
    },
  },

  created() {
    window.addEventListener("resize", this.checkIsMobile);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkIsMobile);
  },

  methods: {
    ...mapMutations([
      "setCityWeather",
      "setObjectSettingSaveDefault",
      "setCodeLanguage",
      "setKeyIndexComponent",
    ]),
    ...mapActions(["getWeatherData", "getAqi"]),

    checkIsMobile() {
      this.isMobile = window.innerWidth <= 768; // Adjust the threshold for mobile
    },

    convertTimeDayNight(value) {
      const sunrise = value.sunriseTime;
      const sunset = value.sunsetTime;
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > sunrise && currentTime < sunset) {
        return true;
      } else {
        return false;
      }
    },

    onChangeLaguages(value) {
      this.isShowDone = true;
      this.codeLanguage = value;
      this.setCodeLanguage(this.codeLanguage);
    },

    onClickUpdateLanguage() {
      this.$i18n.locale = this.codeLanguage;
    },

    onCancelModel(val) {
      this.isShowDialog = val;
    },
    onHideModel(val) {
      this.isShowDialog = val;
    },
    onClickSave(val) {
      this.isShowDialog = val;
      // Gửi phản hồi
    },

    onClickCancel() {
      this.$emit("onCancelFormDraw", false);
    },
    handleBeforeClose(val) {
      if (this.namePage === "unit_settings") {
        const unitSetting = this.$store.state.commonModule.objectSetting;
        this.setObjectSettingSaveDefault(unitSetting);
      }
      this.namePage = "setting";
      // this.setObjectSettingSaveDefault();

      this.$emit("onCancelFormDraw", false);
    },

    onCloseDraw(value) {
      // window.location.reload();
      this.setKeyIndexComponent(1);
      this.$emit("onCancelFormDraw", value);
    },

    /**
     * Click back settings
     * @param value
     */
    onClickBackUnit(value) {
      this.namePage = value;
    },
    /**
     * CLick unit setting
     */
    onClickUnitSetting(value) {
      this.namePage = value;
    },

    /**
     * Click notification
     * @param value
     */
    onClickNotificationSettings(value) {
      this.namePage = value;
    },

    /**
     * Click customize
     * @param value
     */
    onClickCustomize(value) {
      this.namePage = value;
    },

    onClickLanguages(value) {
      this.namePage = value;
    },

    onClickRadar() {
      this.namePage = "setting";
      this.$emit("onCancelFormDraw", false);
      this.$router
        .push({ path: `/radar-detail` })
        .then(() => {
          document.getElementsByClassName("body-app")[0].scrollTo(0, 0);
        })
        .catch(() => {});
    },

    async onClickHomePage() {
      this.$emit("onCancelFormDraw", false);
      const cityCountryNow = this.$store.state.getWeather.cityCountry;
      const param = `version=1&type=8&app_id=amobi.weather.forecast.storm.radar&request=https://api.forecast.io/forecast/TOH_KEY/${cityCountryNow.latitude},${cityCountryNow.longitude}?lang=en`;
      const resultAir = getAqiDataFromLocation(
        cityCountryNow.latitude,
        cityCountryNow.longitude
      );
      const value = encodeBase64(param);
      await this.getWeatherData(value);
      const valueNewAir = encodeBase64(resultAir);
      const objectPosition = {
        latitude: cityCountryNow.latitude,
        longitude: cityCountryNow.longitude,
        city: cityCountryNow.city,
        country: cityCountryNow.country,
      };
      this.setCityWeather(objectPosition);
      this.$router.push({ path: `/${cityCountryNow.city}` }).then(() => {
        document.getElementsByClassName("body-app")[0].scrollTo(0, 0);
      });
      await this.getAirQuality(valueNewAir);
    },

    onClickShowDialogFeedBack() {
      this.isShowDialog = true;
      this.$emit("onCancelFormDraw", false);
    },
  },
};
</script>
<style lang="scss">
.nav-bar:hover {
  background-color: #439df176;
}

.nav-bar {
  transition: background-color 0.5s ease;
}

.number-1 {
  background-image: url(../../../assets/images/png/new_york.png);
}

.bg_main_clearday {
  background-image: url(../../../assets/images/bg_main_clearday.imageset/bg_main_clearday.png);
}
.bg_main_clearnight {
  background-image: url(../../../assets/images/bg_main_clearnight.imageset/bg_main_clearnight.png);
}
.bg_main_cloudyday {
  background-image: url(../../../assets/images/bg_main_cloudyday.imageset/bg_main_cloudyday.png);
}
.bg_main_cloudynight {
  background-image: url(../../../assets/images/bg_main_cloudynight.imageset/bg_main_cloudynight.png);
}
.bg_main_fog {
  background-image: url(../../../assets/images/bg_main_fog.imageset/bg_main_fog.png);
}
.bg_main_fog_night {
  background-image: url(../../../assets/images/bg_main_fog_night.imageset/bg_main_fog_night.png);
}
.bg_main_partlycloudyday {
  background-image: url(../../../assets/images/bg_main_partlycloudyday.imageset/bg_main_partlycloudyday.png);
}
.bg_main_partlycloudynight {
  background-image: url(../../../assets/images/bg_main_partlycloudynight.imageset/bg_main_partlycloudynight.png);
}
.bg_main_rain {
  background-image: url(../../../assets/images/bg_main_rain.imageset/bg_main_rain.png);
}
.bg_main_rain_night {
  background-image: url(../../../assets/images/bg_main_rain_night.imageset/bg_main_rain_night.png);
}
.bg_main_sleet {
  background-image: url(../../../assets/images/bg_main_sleet.imageset/bg_main_sleet.png);
}
.bg_main_sleet_night {
  background-image: url(../../../assets/images/bg_main_sleet_night.imageset/bg_main_sleet_night.png);
}
.bg_main_snow {
  background-image: url(../../../assets/images/bg_main_snow.imageset/bg_main_snow.png);
}
.bg_main_snow_night {
  background-image: url(../../../assets/images/bg_main_snow_night.imageset/bg_main_snow_night.png);
}
.bg_main_start {
  background-image: url(../../../assets/images/bg_main_start.imageset/bg_main_start.png);
}
.bg_main_thunderstorm_day {
  background-image: url(../../../assets/images/bg_main_thunderstorm_day.imageset/bg_main_thunderstorm_day.png);
}
.bg_main_thunderstorm_night {
  background-image: url(../../../assets/images/bg_main_thunderstorm_night.imageset/bg_main_thunderstorm_night.png);
}
.bg_main_variant_a {
  background-image: url(../../../assets/images/bg_main_variant_a.imageset/bg_main_variant_a.png);
}
.bg_main_variant_b {
  background-image: url(../../../assets/images/bg_main_variant_b.imageset/bg_main_variant_b.png);
}
.bg_main_variant_c {
  background-image: url(../../../assets/images/bg_main_variant_c.imageset/bg_main_variant_c.png);
}
.bg_main_wind {
  background-image: url(../../../assets/images/bg_main_wind.imageset/bg_main_wind.png);
}
.bg_main_wind_night {
  background-image: url(../../../assets/images/bg_main_wind_night.imageset/bg_main_wind_night.png);
}
</style>
