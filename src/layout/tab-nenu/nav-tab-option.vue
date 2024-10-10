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
        >
          <router-link class="weather-menu-link">
            <div class="flex items-center txt-medium gap-2">
              <img :src="menu.icon" alt="" />
              <span>{{ menu.label }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-tab-option",

  data() {
    return {};
  },

  computed: {
    menuItems() {
      return [
        {
          name: "today",
          label: "Today",
          icon: require("../../assets/images/svg_v2/ic_cloud_sun.svg"),
        },
        {
          name: "hourly",
          label: "Hourly",
          icon: require("../../assets/images/svg_v2/ic_oclock.svg"),
        },
        {
          name: "month",
          label: "Month",
          icon: require("../../assets/images/svg_v2/ic_calendar_days.svg"),
        },
        {
          name: "radar",
          label: "Radar",
          icon: require("../../assets/images/svg_v2/ic_radar.svg"),
        },
      ];
    },
  },

  methods: {},
};
</script>
<style lang="scss">
.weather-menu-item {
  width: 162px;
  background-color: #5b6c86;
}
</style>
