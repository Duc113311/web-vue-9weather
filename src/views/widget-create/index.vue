<template>
  <div class="w-full h-full">
    <!-- -->
    <div class="container">
      <WidgetPage></WidgetPage>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapMutations } from "vuex";
import WidgetPage from "../../components/widget/widget-page";
export default {
  components: { WidgetPage },
  name: "create-widget-view",

  data() {
    return {};
  },

  mounted() {
    this.handleDataCurrent();

    this.loadDataWidget();
  },

  methods: {
    ...mapActions(["getWeatherDataCurrent", "getWeatherWidget"]),
    ...mapMutations(["setCityCountry"]),

    async handleDataCurrent() {
      const keyCurrentValue = localStorage.getItem("keyCurrent");
      if (keyCurrentValue) {
        const keyCurrent = JSON.parse(keyCurrentValue);
        await this.getWeatherDataCurrent(keyCurrent);
        const weatherCurrentValue = this.$store.state.getWeather.weatherCurrent;
        if (weatherCurrentValue) {
          const positionValue = this.$store.state.getWeather.position;

          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${positionValue.latitude}&lon=${positionValue.longitude}`;
          const responsive = await axios.get(url);
          const objectPosition = {
            latitude: positionValue.latitude,
            longitude: positionValue.longitude,
            city: responsive.data.address.city,
            country: responsive.data.address.country,
          };
          this.setCityCountry(objectPosition);
        }
      }
    },

    async loadDataWidget() {
      const keyCurrentValue = localStorage.getItem("keyCurrent");
      if (keyCurrentValue) {
        const keyCurrent = JSON.parse(keyCurrentValue);
        await this.getWeatherWidget(keyCurrent);
      }
    },
  },
};
</script>
