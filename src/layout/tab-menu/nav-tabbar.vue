<template>
  <div class="w-full">
    <!--  -->
    <div class="container mt-2 overflow-hidden">
      <div
        class="weather-menu-inner w-max flex justify-between items-center mt-2 pt-1"
      >
        <div
          v-for="(menu, index) in menuItems"
          :key="index"
          class="cursor-pointer weather-menu-item mr-4 pad-t-b-l-r bor-radios-big flex justify-center text-white"
          :class="{ 'active-tab': activeIndex === index }"
          @click="onClickRouterView(menu, index)"
        >
          <div class="flex items-center txt-medium gap-2 cursor-pointer">
            <img
              :src="menu.icon"
              class="menu-icon"
              :class="{ 'active-icon': activeIndex === index }"
              :alt="menu.label"
            />

            <span>{{ menu.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { convertToEnglishReplace } from "@/utils/converValue";
import { mapGetters } from "vuex";
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
      return this.$route.params.language ? this.$route.params.language : "en";
    },

    renderCoordinates() {
      return this.$route.params.coordinates
        ? this.$route.params.coordinates
        : `${this.breadcumsObjectGetters.latitude}, ${this.breadcumsObjectGetters.longitude}`;
    },

    breadcumsObject() {
      console.log("this.breadcumsObjectGetters", this.breadcumsObjectGetters);
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));

      console.log("retrievedArray", retrievedArray);

      return retrievedArray ? retrievedArray : this.breadcumsObjectGetters;
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

    debugger;
    this.setTitleScream(this.activeIndex);
  },

  methods: {
    setTitleScream(activeIndex) {
      debugger;
      const valueTitle = [
        this.breadcumsObjectGetters?.district,
        this.breadcumsObjectGetters?.city,
        this.breadcumsObjectGetters?.country,
      ]

        .filter(Boolean) // Lọc các giá trị không hợp lệ (undefined, null, '')
        .join(", "); // Kết hợp các giá trị hợp lệ bằng dấu phẩy
      switch (activeIndex) {
        case 0:
          if (Object.keys(this.$route.params).length !== 0) {
            document.title = valueTitle + ` Today Weather | 9weather`;
          }
          break;

        case 1:
          document.title = valueTitle + ` Hourly Weather | 9weather`;
          break;
        case 2:
          document.title = valueTitle + ` Month Weather | 9weather`;
          break;

        default:
          document.title =
            "Local, National & Global Daily Weather Forecast | 9Weather";
          break;
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

    async onClickRouterView(value, index) {
      this.activeIndex = index;

      debugger;
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

      // Tồn tại thành phố
      if (
        this.breadcumsObject.city.length !== 0 &&
        this.breadcumsObject.district.length === 0
      ) {
        await this.$router.push({
          name: screamName,
          params: {
            language: this.renderLanguage,
            location: [
              this.breadcumsObject.country_key.toLowerCase(),
              this.convertToSlug(this.breadcumsObject.city),
            ],
          },
        });
      }

      // Tồn tại quận
      if (
        this.breadcumsObject.city.length !== 0 &&
        this.breadcumsObject.district.length !== 0 &&
        this.breadcumsObject.ward.length === 0
      ) {
        await this.$router.push({
          name: screamName,
          params: {
            language: this.renderLanguage,
            location: [
              this.breadcumsObject.country_key.toLowerCase(),
              this.convertToSlug(this.breadcumsObject.city),
              this.convertToSlug(this.breadcumsObject.district),
            ],
          },
        });
      }

      // Tồn tại phường xã
      if (
        this.breadcumsObject.city.length !== 0 &&
        this.breadcumsObject.district.length !== 0 &&
        this.breadcumsObject.ward.length !== 0
      ) {
        await this.$router.push({
          name: screamName,
          params: {
            language: this.renderLanguage,
            location: [
              this.breadcumsObject.country_key.toLowerCase(),
              this.convertToSlug(this.breadcumsObject.city),
              this.convertToSlug(this.breadcumsObject.district),
              this.convertToSlug(this.breadcumsObject.ward),
            ],
          },
        });
      }
    },
  },
};
</script>
<style lang="scss">
.weather-menu-item {
  width: 162px;
  background-color: #5b6c86;
}

.active-tab {
  background-color: #ffffff;
  color: #0062f5 !important;

  .menu-icon {
    filter: invert(31%) sepia(98%) saturate(1946%) hue-rotate(201deg)
      brightness(97%) contrast(107%);
  }
}

.menu-icon {
  filter: brightness(0) invert(1);
}
</style>
