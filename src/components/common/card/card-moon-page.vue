<template>
  <div class="cursor-pointer">
    <!--  -->
    <div class="district-card">
      <div class="text-center txt_medium_14">FullMoon</div>
      <div class="txt_regular_12 color_BFBFBF">
        <p>15:00, Thứ 3</p>
      </div>
      <div class="flex items-center justify-center p-1">
        <component :is="IcFullMoon"></component>
      </div>

      <div class="txt_regular_12 color_BFBFBF">
        <p>Illumination: 91.3%</p>
      </div>
    </div>
  </div>
</template>
<script>
import IcFullMoon from "@/components/icons/moon-phase/IcFullMoon.vue";
import { markRaw } from "vue";

export default {
  name: "card-moon-page",

  props: {
    objectLocation: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      IcFullMoon: markRaw(IcFullMoon),
    };
  },

  computed: {},

  methods: {
    // async getAPIFindLocationWeather(searchData) {
    //   const urlParam = `version=1&type=4&app_id=amobi.weather.forecast.storm.radar&request=https://maps.googleapis.com/maps/api/geocode/json?address=${urlEncodeString(
    //     searchData
    //   )}&key=TOH_KEY`;
    //   const value = encodeBase64(urlParam);
    //   await this.getFormattedAddress(value);
    // },
  },
};
</script>
<style lang="scss">
.district-card {
  box-shadow: inset 0px 0px 56px var(--bg-compo-1),
    inset -50px -50px 100px 0px var(--bg-compo-2),
    inset 500px 500px 100px 0px var(--bg-compo-3);
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  height: 212px;
  list-style-type: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.district-name {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.weather-icon {
  width: 50px;
  height: 50px;
  margin: 10px 0;
}

.weather-condition {
  margin: 5px 0;
}

.temperature {
  font-weight: bold;
}
</style>
