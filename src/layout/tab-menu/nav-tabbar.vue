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
          @click="setActiveTab(index)"
        >
          <!-- <router-link class="weather-menu-link"> -->
          <div class="flex items-center txt-medium gap-2 cursor-pointer">
            <img
              :src="menu.icon"
              class="menu-icon"
              :class="{ 'active-icon': activeIndex === index }"
              :alt="menu.label"
            />
            <span>{{ menu.label }}</span>
          </div>
          <!-- </router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-tabbar",

  data() {
    return {
      activeIndex: 0,
    };
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

  methods: {
    isActive(menu) {
      return this.$route.name === menu.name;
    },

    setActiveTab(index) {
      this.activeIndex = index;
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
