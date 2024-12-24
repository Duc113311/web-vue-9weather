<template>
  <div class="w-full">
    <!--  -->
    <div class="container overflow-hidden">
      <div
        class="weather-menu-inner w-max flex justify-between items-center mt-2 pt-1"
      >
        <div
          v-for="(menu, index) in menuItems"
          :key="index"
          class="cursor-pointer weather-menu-item mr-4 pad-t-b-l-r bor-radios-big flex justify-center"
          :class="{ 'active-tab': activeIndex === index }"
          @click="onClickRouterView(menu, index)"
        >
          <div class="flex items-center txt-medium gap-2 cursor-pointer">
            <img
              :src="menu.icon"
              class="menu-icon"
              :class="{ 'active-icon': activeIndex === index }"
              :alt="menu.label"
              width="18"
            />

            <span class="txt_regular_16">{{ menu.label }}</span>
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

export default {
  name: "nav-tabbar",

  data() {
    return {
      activeIndex: -1,
    };
  },

  computed: {
    ...mapGetters("commonModule", ["breadcumsObjectGetters"]),
    menuItems() {
      return [
        {
          name: "today-weather",
          label: this.$t("Today"),
          icon: require("../../assets/images/svg_v2/ic_cloud_sun.svg"),
        },
        {
          name: "hourly-weather",
          label: this.$t("Hourly"),
          icon: require("../../assets/images/svg_v2/ic_oclock.svg"),
        },
        {
          name: "month-weather",
          label: this.$t("Month"),
          icon: require("../../assets/images/svg_v2/ic_calendar_days.svg"),
        },
        {
          name: "radar-weather",
          label: this.$t("Radar"),
          icon: require("../../assets/images/svg_v2/ic_radar.svg"),
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

      return retrievedArray ? retrievedArray : this.breadcumsObjectGetters;
    },

    languageParam() {
      const languageRouter = this.$route.params;
      return Object.keys(languageRouter).length !== 0
        ? languageRouter.language
        : this.$i18n.locale;
    },
  },

  watch: {
    // Theo dõi sự thay đổi của breadcumsObjectGetters
    breadcumsObjectGetters(newVal) {
      if (newVal && Object.keys(newVal).length > 0) {
        this.setTitleScream(this.activeIndex);
      }
    },
  },

  mounted() {
    const nameRouter = this.$route.name;
    this.activeIndex = this.menuItems.findIndex((x) => x.name === nameRouter);

    if (this.activeIndex === -1) {
      this.activeIndex = -1;
    }

    this.setTitleScream(this.activeIndex);
  },

  methods: {
    ...mapMutations("commonModule", ["setKeyIndexComponent"]),
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
                )} | 9weather`;
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
              )} | 9weather`;
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
              )} | 9weather`;
              break;

            default:
              document.title = `${this.$t("Local_National_Global")} | 9weather`;
              break;
          }
        } else {
          switch (activeIndex) {
            case 0:
              if (Object.keys(this.$route.params).length !== 0) {
                document.title = `${this.$t(
                  `Weather_Today_for_{district}_{city}_{country}`,
                  {
                    district: districtTitle ? `${districtTitle}, ` : "",
                    city: cityTitle ? `${cityTitle}, ` : "",
                    country: countryTitle,
                  }
                )} | 9weather`;
              }
              break;

            case 1:
              document.title = `${this.$t(
                `Weather_Hourly_for_{district}_{city}_{country}`,
                {
                  district: districtTitle ? `${districtTitle}, ` : "",
                  city: cityTitle ? `${cityTitle}, ` : "",
                  country: countryTitle,
                }
              )} | 9weather`;
              break;
            case 2:
              document.title = `${this.$t(
                `Weather_Month_for_{district}_{city}_{country}`,
                {
                  district: districtTitle ? `${districtTitle}, ` : "",
                  city: cityTitle ? `${cityTitle}, ` : "",
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

    removeWordAndAccents(str, wordToRemove) {
      const normalizedStr = removeAccents(str); // Loại bỏ dấu nếu có
      return normalizedStr
        .replace(new RegExp(`\\b${wordToRemove}\\b`, "gi"), "")
        .trim();
    },

    async onClickRouterView(value, index) {
      try {
        this.activeIndex = index;

        let screamName = "today-weather";
        if (this.activeIndex === 1) {
          screamName = "hourly-weather";
        }
        if (this.activeIndex === 2) {
          screamName = "month-weather";
        }
        if (this.activeIndex === 3) {
          screamName = "radar-weather";
        }
        this.setTitleScream(this.activeIndex);

        const countryKey = this.breadcumsObject.country_key;

        if (countryKey.toLowerCase() === "vn") {
          let routeParams = {
            name: screamName,
            params: {
              language: this.renderLanguage,
              location: [this.breadcumsObject.country_key.toLowerCase()],
            },
          };

          // Xây dựng mảng location dựa vào điều kiện
          if (this.breadcumsObject.city.length !== 0) {
            routeParams.params.location.push(
              this.convertToSlug(this.breadcumsObject.city)
            );
          }

          if (this.breadcumsObject.district.length !== 0) {
            routeParams.params.location.push(
              this.convertToSlug(this.breadcumsObject.district)
            );
          }

          if (this.breadcumsObject.ward.length !== 0) {
            routeParams.params.location.push(
              this.convertToSlug(this.breadcumsObject.ward)
            );
          }

          // Thêm query param để force component re-render
          routeParams.params.timestamp = Date.now();

          // Chuyển route và đợi cho đến khi navigation hoàn tất
          await this.$router.push(routeParams);
          this.setKeyIndexComponent(1);

          // Emit event để thông báo cho component cha biết route đã thay đổi
          this.$emit("route-changed", screamName);
        } else if (countryKey.toLowerCase() === "us") {
          await this.$router.push({
            name: screamName,
            params: {
              language: this.renderLanguage,
              location: [
                this.breadcumsObject.country_key.toLowerCase(),
                removeAccents(this.breadcumsObject.state),
                this.removeWordAndAccents(
                  this.breadcumsObject.county,
                  "County"
                ),
                removeAccents(this.breadcumsObject.cities),
              ],
            },
          });
        } else {
          let routeParams = {
            name: screamName,
            params: {
              language: this.renderLanguage,
              location: [this.breadcumsObject.country_key.toLowerCase()],
            },
          };

          // Xây dựng mảng location dựa vào điều kiện
          if (this.breadcumsObject.city.length !== 0) {
            routeParams.params.location.push(
              this.convertToSlug(this.breadcumsObject.city)
            );
          }

          if (this.breadcumsObject.district.length !== 0) {
            routeParams.params.location.push(
              this.convertToSlug(this.breadcumsObject.district)
            );
          }

          // Thêm query param để force component re-render
          routeParams.params.timestamp = Date.now();

          // Chuyển route và đợi cho đến khi navigation hoàn tất
          await this.$router.push(routeParams);
          this.setKeyIndexComponent(1);

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
  width: 130px;
  background-color: #5b6c86;
  color: #ffffff;
}

.active-tab {
  background-color: #ffffff;
  color: #0062f5;

  .menu-icon {
    filter: invert(31%) sepia(98%) saturate(1946%) hue-rotate(201deg)
      brightness(97%) contrast(107%);
  }
}

.menu-icon {
  filter: brightness(0) invert(1);
}
</style>
