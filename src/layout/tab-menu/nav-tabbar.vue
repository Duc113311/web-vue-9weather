<template>
  <div class="w-full md:block hidden">
    <!--  -->
    <div class="container overflow-hidden">
      <div
        class="weather-menu-inner w-full flex items-center pad-l-r-10 pad-t-b-10"
      >
        <div
          v-for="(menu, index) in menuItems"
          :key="index"
          class="cursor-pointer weather-menu-item pad_btn flex justify-center bg-btn-hover"
          :class="{
            'active-tab': activeTabGettersParam === index,
            'disabled-class': !menu.isRun,
          }"
          @click="onClickRouterView(menu, index)"
        >
          <div class="flex items-center txt-medium gap-2 cursor-pointer">
            <component
              :is="menu.icon"
              class="menu-icon"
              :class="{
                'active-icon': activeTabGettersParam === index,
              }"
            />
            <span class="txt_regular_14">{{ menu.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { convertToEnglishReplace } from "@/utils/converValue";
import { mapGetters, mapMutations } from "vuex";
import removeAccents from "remove-accents";
import IcCloudSun from "@/components/icons/IcCloudSun.vue";
import IcCalendar from "@/components/icons/IcCalendar.vue";
import IcOclock from "@/components/icons/IcOclock.vue";
import IcRadar from "@/components/icons/IcRadar.vue";
import { convertLowerCase } from "@/utils/coverTextSystem";
import IcApiTab from "@/components/icons/IcApiTab.vue";
import IcUvIndex from "@/components/icons/IcUvIndex.vue";
import IcTitleSun from "@/components/icons/IcTitleSun.vue";
import IcMoonphase from "@/components/icons/IcMoonphase.vue";

import { ElNotification } from "element-plus";

export default {
  name: "nav-tabbar",

  data() {
    return {
      activeIndex: -1,
    };
  },

  setup() {
    const successUnit = () => {
      ElNotification({
        title: "Scream",
        message: "Coming soon",
        type: "warning",
        position: "bottom-left",
      });
    };
    return {
      successUnit,
    };
  },

  computed: {
    ...mapGetters("commonModule", [
      "breadcumsObjectGetters",
      "activeTabGetters",
    ]),
    menuItems() {
      return [
        {
          name: "today-weather",
          label: this.$t("Today"),
          isRun: true,
          icon: IcCloudSun,
        },
        {
          name: "hourly-weather",
          label: this.$t("Hourly"),
          isRun: true,
          icon: IcOclock,
        },
        {
          name: "month-weather",
          label: this.$t("Month"),
          isRun: true,
          icon: IcCalendar,
        },
        {
          name: "radar-weather",
          label: this.$t("Radar"),
          isRun: true,
          icon: IcRadar,
        },
        {
          name: "air-quality-weather",
          label: this.$t("AQI"),
          isRun: true,
          icon: IcApiTab,
        },
        {
          name: "uv-weather",
          label: this.$t("UV"),
          isRun: true,
          icon: IcUvIndex,
        },
        {
          name: "moon-phase-weather",
          label: this.$t("Moon_phase"),
          isRun: true,
          icon: IcMoonphase,
        },
      ];
    },

    renderCityName() {
      return this.$route.params.city
        ? this.$route.params.city
        : this.breadcumsObjectGetters?.city;
    },

    renderCountry() {
      return this.$route.params.country
        ? this.$route.params.country
        : this.breadcumsObjectGetters?.country;
    },

    renderLanguage() {
      return this.$route.params.language
        ? this.$route.params.language
        : this.$i18n.locale;
    },

    renderCoordinates() {
      return this.$route.params.coordinates
        ? this.$route.params.coordinates
        : `${this.breadcumsObjectGetters.latitude}, ${this.breadcumsObjectGetters.longitude}`;
    },

    breadcumsObject() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      debugger;
      return retrievedArray ? retrievedArray : this.breadcumsObjectGetters;
    },

    languageParam() {
      const languageRouter = this.$route.params;
      return Object.keys(languageRouter).length !== 0
        ? languageRouter.language
        : this.$i18n.locale;
    },

    activeTabGettersParam() {
      return this.activeTabGetters;
    },
  },

  watch: {
    // Theo dõi sự thay đổi của breadcumsObjectGetters
  },

  mounted() {
    debugger;
    const nameRouter = this.$route.name;
    this.activeIndex = this.menuItems.findIndex((x) => x.name === nameRouter);

    if (this.activeIndex === -1) {
      this.activeIndex = -1;
    }

    this.setTitleScream(this.activeIndex);
    this.setActiveTab(this.activeIndex);
  },

  methods: {
    ...mapMutations("commonModule", [
      "setKeyIndexComponent",
      "setIndexComponent",
      "setActiveTab",
    ]),
    convertToSlugCity(str) {
      const slug = removeAccents(str);

      return slug
        .toLowerCase() // Chuyển thành chữ thường
        .replace(/\s+/g, ""); // Xóa khoảng trắng
    },

    convertToLowCase(value) {
      const normalizedStr = value
        .normalize("NFD") // Chuyển chuỗi sang dạng tổ hợp Unicode
        .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ các dấu

      return normalizedStr;
    },

    setTitleScream(activeIndex) {
      let districtKeyTitle = this.breadcumsObject?.district_key;
      let districtTitle = this.breadcumsObject?.district;
      let cityTitle = this.breadcumsObject?.city;
      let cityKeyTitle = this.breadcumsObject?.city_key;
      let countryTitle = this.breadcumsObject?.country;
      let countryKey = this.breadcumsObject?.country_key;

      if (countryKey) {
        if (countryKey.toLowerCase() === "vn") {
          switch (activeIndex) {
            case 0:
              if (Object.keys(this.$route.params).length !== 0) {
                document.title = `${this.$t(
                  `Weather_Today_for_{district}_{city}_{country}`,
                  {
                    district: districtKeyTitle
                      ? this.$t(
                          `${this.convertToSlugCity(
                            cityTitle
                          )}.${this.convertToSlugCity(cityTitle)}_${
                            this.languageParam
                          }.${this.convertToLowCase(districtKeyTitle)}`
                        )
                      : "",
                    city: cityKeyTitle
                      ? this.$t(
                          `city.city_${
                            this.languageParam
                          }.${this.convertToLowCase(cityKeyTitle)}`
                        )
                      : "",
                    country: countryTitle,
                  }
                )} | 9Weather`;
              }
              break;

            case 1:
              document.title = `${this.$t(
                `Weather_Hourly_for_{district}_{city}_{country}`,
                {
                  district: districtKeyTitle
                    ? this.$t(
                        `${this.convertToSlugCity(
                          cityTitle
                        )}.${this.convertToSlugCity(cityTitle)}_${
                          this.languageParam
                        }.${this.convertToLowCase(districtKeyTitle)}`
                      )
                    : "",
                  city: cityKeyTitle
                    ? this.$t(
                        `city.city_${
                          this.languageParam
                        }.${this.convertToLowCase(cityKeyTitle)}`
                      )
                    : "",
                  country: countryTitle,
                }
              )} | 9Weather`;
              break;
            case 2:
              document.title = `${this.$t(
                `Weather_Month_for_{district}_{city}_{country}`,
                {
                  district: districtKeyTitle
                    ? this.$t(
                        `${this.convertToSlugCity(
                          cityTitle
                        )}.${this.convertToSlugCity(cityTitle)}_${
                          this.languageParam
                        }.${this.convertToLowCase(districtKeyTitle)}`
                      )
                    : "",
                  city: cityKeyTitle
                    ? this.$t(
                        `city.city_${
                          this.languageParam
                        }.${this.convertToLowCase(cityKeyTitle)}`
                      )
                    : "",
                  country: countryTitle,
                }
              )} | 9Weather`;
              break;

            default:
              document.title = `${this.$t("Local_National_Global")} | 9Weather`;
              break;
          }
        } else {
          let stateTitle = this.breadcumsObject?.state;
          let countyTitle = this.breadcumsObject?.county;
          let countryTitle = this.breadcumsObject?.country;
          switch (activeIndex) {
            case 0:
              if (Object.keys(this.$route.params).length !== 0) {
                document.title = `${this.$t(
                  `Weather_Today_for_{district}_{city}_{country}`,
                  {
                    district: countyTitle ? `${countyTitle}, ` : "",
                    city: stateTitle ? `${stateTitle}, ` : "",
                    country: countryTitle,
                  }
                )} | 9weather`;
              }
              break;

            case 1:
              document.title = `${this.$t(
                `Weather_Hourly_for_{district}_{city}_{country}`,
                {
                  district: countyTitle ? `${countyTitle}, ` : "",
                  city: stateTitle ? `${stateTitle}, ` : "",
                  country: countryTitle,
                }
              )} | 9weather`;
              break;
            case 2:
              document.title = `${this.$t(
                `Weather_Month_for_{district}_{city}_{country}`,
                {
                  district: countyTitle ? `${countyTitle}, ` : "",
                  city: stateTitle ? `${stateTitle}, ` : "",
                  country: countryTitle,
                }
              )} | 9weather`;
              break;

            default:
              document.title = `${this.$t("Local_National_Global")} | 9weather`;
              break;
          }
        }
      } else {
        document.title = `${this.$t("Local_National_Global")} | 9weather`;
      }
    },
    isActive(menu) {
      return this.$route.name === menu.name;
    },

    convertToSlug(str) {
      // Bước 1: Loại bỏ dấu tiếng Việt
      const normalizedStr = str
        .normalize("NFD") // Chuyển chuỗi sang dạng tổ hợp Unicode
        .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ các dấu

      // Bước 2: Chuyển thành chữ thường và thay thế khoảng trắng bằng gạch ngang
      return normalizedStr
        .toLowerCase() // Chuyển thành chữ thường
        .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng "-"
        .replace(/[^a-z0-9-]/g, ""); // Loại bỏ ký tự không hợp lệ (chỉ giữ lại chữ, số, và "-")
    },

    convertLowerCase(str) {
      const slug = removeAccents(str);
      return slug.replace(/\s+/g, "-").toLowerCase();
    },

    removeWordAndAccents(str, wordsToRemove) {
      const removeAccents = (s) =>
        s
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D");

      // Loại bỏ dấu và chuẩn hóa chuỗi
      let normalizedStr = removeAccents(str);

      // Loại bỏ từng từ trong danh sách wordsToRemove
      wordsToRemove.forEach((word) => {
        const normalizedWord = removeAccents(word);
        const regex = new RegExp(`\\b${normalizedWord}\\b`, "gi");
        normalizedStr = normalizedStr.replace(regex, "").trim();
      });

      return normalizedStr;
    },

    async onClickRouterView(value, index) {
      debugger;
      try {
        this.activeIndex = index;

        let screamName = "today-weather";
        if (this.activeIndex === 0) {
          this.setActiveTab(0);
        }
        if (this.activeIndex === 1) {
          this.setActiveTab(1);
          screamName = "hourly-weather";
        }
        if (this.activeIndex === 2) {
          this.setActiveTab(2);
          screamName = "month-weather";
        }
        if (this.activeIndex === 3) {
          this.setActiveTab(3);
          screamName = "radar-weather";
        }
        if (this.activeIndex === 4) {
          this.setActiveTab(4);
          screamName = "air-quality-weather";
          // this.successUnit();
        }
        if (this.activeIndex === 5) {
          this.setActiveTab(5);
          screamName = "uv-weather";
          // this.successUnit();
        }
        if (this.activeIndex === 6) {
          this.setActiveTab(6);
          screamName = "moon-phase-weather";
          // this.successUnit();
        }
        debugger;
        this.setTitleScream(this.activeIndex);
        const objectBread = JSON.parse(localStorage.getItem("objectBread"));
        const countryKey = objectBread.country_key;

        console.log("this.breadcumsObject", objectBread);

        if (countryKey.toLowerCase() === "vn") {
          let routeParams = {
            name: screamName,
            params: {
              language: this.renderLanguage,
              location: [objectBread.country_key.toLowerCase()],
            },
          };

          // Xây dựng mảng location dựa vào điều kiện
          if (
            objectBread.city.length !== 0 &&
            objectBread.district.length === 0
          ) {
            routeParams.params.location.push(
              this.convertLowerCase(objectBread.city)
            );
          }

          if (
            objectBread.city.length !== 0 &&
            objectBread.district.length !== 0 &&
            objectBread.ward.length === 0
          ) {
            routeParams.params.location.push(
              this.convertLowerCase(objectBread.district)
            );
          }

          if (
            objectBread.city.length !== 0 &&
            objectBread.district.length !== 0 &&
            objectBread.ward.length !== 0
          ) {
            routeParams.params.location.push(
              this.convertToSlug(
                this.removeWordAndAccents(objectBread.ward, [
                  "Xã",
                  "Thị Xã",
                  "Phường",
                  "Thị Trấn",
                ])
              )
            );
          }

          // Thêm query param để force component re-render
          await this.$router.push(routeParams);

          // Chuyển route và đợi cho đến khi navigation hoàn tất
          this.setKeyIndexComponent(1);
          this.setIndexComponent(1);

          // Emit event để thông báo cho component cha biết route đã thay đổi
          this.$emit("route-changed", screamName);
        } else {
          debugger;
          let routeParams = {
            name: screamName,
            params: {
              language: this.renderLanguage,
              location: [objectBread.country_key.toLowerCase()],
            },
          };

          // Xây dựng mảng location dựa vào điều kiện
          if (
            objectBread.state.length !== 0 &&
            objectBread.county.length === 0
          ) {
            routeParams.params.location.push(
              convertLowerCase(objectBread.state)
            );
          }

          if (
            objectBread.state.length !== 0 &&
            objectBread.county.length !== 0 &&
            objectBread.cities.length === 0
          ) {
            routeParams.params.location.push(
              convertLowerCase(objectBread.state),
              convertLowerCase(objectBread.county)
            );
          }

          if (
            objectBread.state.length !== 0 &&
            objectBread.county.length !== 0 &&
            objectBread.cities.length !== 0
          ) {
            routeParams.params.location.push(
              convertLowerCase(objectBread.state),
              convertLowerCase(objectBread.county),
              convertLowerCase(objectBread.cities)
            );
          }

          // Thêm query param để force component re-render
          await this.$router.push(routeParams);

          // Chuyển route và đợi cho đến khi navigation hoàn tất
          this.setKeyIndexComponent(1);

          this.setIndexComponent(1);
          // Emit event để thông báo cho component cha biết route đã thay đổi
          this.$emit("route-changed", screamName);
        }
      } catch (err) {
        console.error("Navigation failed:", err);
      }
    },
  },
};
</script>
<style lang="scss">
.weather-menu-item {
  width: 163px;
  height: 40px;
  background-color: var(--bg-button);
  color: var(--color-txt);
}

.weather-menu-inner {
  gap: 10px;
}

.active-tab {
  background-color: #ffffff;
  color: #0074ff;

  .menu-icon {
    filter: invert(71%) sepia(98%) saturate(1946%) hue-rotate(201deg)
      brightness(97%) contrast(107%);
  }
}

.disabled-class {
  background-color: #839dcc3b;
}
</style>
