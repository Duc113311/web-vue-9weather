<template>
  <div class="w-full h-full">
    <!-- -->
    <div class="container">
      <WidgetPage></WidgetPage>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import WidgetPage from "../../components/widget/widget-page";
import { encodeBase64 } from "@/utils/EncoderDecoderUtils";
export default {
  components: { WidgetPage },
  name: "create-widget-view",

  data() {
    return {};
  },
  // bg_ads.png
  mounted() {
    this.loadDataWidget();
  },

  computed: {
    ...mapGetters("weatherModule", ["currentlyGetters"]),
    currentlyData() {
      return this.currentlyGetters;
    },
  },

  methods: {
    ...mapActions("weatherModule", ["getWeatherByWidget"]),

    async loadDataWidget() {
      debugger;
      const locationLatLongValue = localStorage.getItem("locationLatLong");
      if (locationLatLongValue) {
        const convertLocation = JSON.parse(locationLatLongValue);
        const latitudeValue = convertLocation.latitude;
        const longitudeValue = convertLocation.longitude;
        const keyLanguageStorage = this.$route.params.language
          ? this.$route.params.language
          : this.$i18n.locale;
        const param = `version=1&type=8&app_id=amobi.weather.forecast.radar.rain&request=https://api.forecast.io/forecast/TOH_KEY/${latitudeValue},${longitudeValue}?lang=${keyLanguageStorage}`;

        const encodeDataWeather = encodeBase64(param);

        await this.getWeatherByWidget(encodeDataWeather);
      }
    },
  },
};
</script>
