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
import { mapActions, mapGetters, mapMutations } from "vuex";
import WidgetPage from "../../components/widget/widget-page";
export default {
  components: { WidgetPage },
  name: "create-widget-view",

  data() {
    return {};
  },
  // bg_ads.png
  mounted() {
    this.handleDataCurrent();

    this.loadDataWidget();
  },

  computed: {
    ...mapGetters("weatherModule", ["currentlyGetters"]),
    currentlyData() {
      return this.currentlyGetters;
    },
  },

  methods: {
    ...mapActions("weatherModule", [
      "getWeatherDataCurrent",
      "getWeatherWidget",
    ]),

    async handleDataCurrent() {
      const keyCurrentValue = localStorage.getItem("keyCurrent");
      if (keyCurrentValue) {
        const keyCurrent = JSON.parse(keyCurrentValue);
        await this.getWeatherDataCurrent(keyCurrent);
        const weatherCurrentValue = this.currentlyData;
        if (weatherCurrentValue) {
          //
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
