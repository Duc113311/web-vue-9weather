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
          class="weather-menu-item mr-4 pad-t-b-l-r bor-radios-big flex justify-center text-white"
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
      activeIndex: 0,
    };
  },

  computed: {
    ...mapGetters("commonModule", ["breadcumsObjectGetters"]),
    menuItems() {
      return [
        {
          name: "today-weather",
          label: "Today",
          icon: require("../../assets/images/svg_v2/ic_cloud_sun.svg"),
        },
        {
          name: "hourly-weather",
          label: "Hourly",
          icon: require("../../assets/images/svg_v2/ic_oclock.svg"),
        },
        {
          name: "month-weather",
          label: "Month",
          icon: require("../../assets/images/svg_v2/ic_calendar_days.svg"),
        },
        {
          name: "radar-weather",
          label: "Radar",
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
      debugger;
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
    debugger;
    const nameRouter = this.$route.name;
    this.activeIndex = this.menuItems.findIndex((x) => x.name === nameRouter);

    if (this.activeIndex === -1) {
      this.activeIndex = 0;
    }
    debugger;
    this.setTitleScream(this.activeIndex);
    debugger;
  },

  methods: {
    setTitleScream(activeIndex) {
      const valueTitle = [
        this.breadcumsObjectGetters?.district,
        this.breadcumsObjectGetters?.city,
        this.breadcumsObjectGetters?.country,
      ]
        .filter(Boolean) // Lọc các giá trị không hợp lệ (undefined, null, '')
        .join(", "); // Kết hợp các giá trị hợp lệ bằng dấu phẩy
      switch (activeIndex) {
        case 0:
          document.title = valueTitle + ` Today Weather | 9weather`;
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

    async onClickRouterView(value, index) {
      this.activeIndex = index;

      //const valueTitle = `${this.breadcumsObjectGetters?.district}, ${this.breadcumsObjectGetters?.city}, ${this.breadcumsObjectGetters?.country}`;

      this.setTitleScream(this.activeIndex);
      await this.$router.push({
        path: `/${this.renderLanguage}/${
          this.renderCountry
        }/${convertToEnglishReplace(this.renderCityName)}/${
          this.renderCoordinates
        }/${value.name}`,
      });
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
