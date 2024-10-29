<template>
  <div class="w-full">
    <BaseComponent :isShowPad="false">
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_Air_quality.svg"
            width="24"
            alt=""
            srcset=""
          />
          <p>Air Quality</p>
        </div>
      </template>
      <div class="w-full">
        <!--  -->
        <div class="text-left pad-big">
          <div class="txt_bold" :style="{ color: progressColor }">
            <span>{{ paramAirModule }}</span>
          </div>
          <div class="txt_light">
            <span>{{ convertAirIndexName(paramAirModule) }}</span>
          </div>
        </div>

        <div class="w-full items-center gap-2">
          <div id="chart" class="w-full">
            <apexchart
              height="100"
              type="area"
              :options="chartOptions"
              :series="series"
            />
          </div>
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import { decodeBase64 } from "@/utils/EncoderDecoderUtils";
import BaseComponent from "../baseComponent.vue";
import { ref } from "vue";
import { getAirSummaryName } from "@/utils/converValue";
import { mapGetters } from "vuex";

export default {
  name: "air-quality-page",
  components: {
    BaseComponent,
  },

  setup() {
    const series = ref([
      {
        name: "Air Quality Index",
        data: [300, 200, 210, 200, 250, 220, 295, 230, 180, 190], // Dữ liệu mẫu
      },
    ]);

    const chartOptions = ref({
      chart: {
        type: "area",
        toolbar: { show: false },
        sparkline: { enabled: true },
      },
      stroke: {
        curve: "smooth",
        width: 5,
        colors: ["#FFD700"],
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.4,
          stops: [0, 100],
          colorStops: [
            {
              offset: 0,
              color: "#FFD700",
              opacity: 0.7,
            },
            {
              offset: 100,
              color: "#001f3f",
              opacity: 0.4,
            },
          ],
        },
      },
      xaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: { show: false },
        min: 0,
        max: 300, // Giới hạn trục y
      },
      grid: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    });

    return { series, chartOptions };
  },

  computed: {
    ...mapGetters("airQualityModule", ["airObjectGetters"]),
    paramAirModule() {
      const storageAir = localStorage.getItem("airObject");
      if (storageAir) {
        const airObject = decodeBase64(storageAir);

        const decodeAirObject = JSON.parse(airObject);
        console.log("decodeAirObject", decodeAirObject);

        return decodeAirObject.aqi ? decodeAirObject.aqi : 0;
      }
      return this.airObjectGetters?.aqi ? this.airObjectGetters?.aqi : 0;
    },

    dotStyle() {
      return { left: `${(parseInt(this.paramAirModule) / 500) * 100}%` };
    },
    progressColor() {
      return this.getColorFromPercentage(this.paramAirModule);
    },
  },

  methods: {
    convertAirIndexName(val) {
      return getAirSummaryName(val);
    },

    getColorFromPercentage(percentage) {
      if (percentage <= 50) return "#507a46";
      if (percentage <= 100) return "#cbd956";
      if (percentage <= 150) return "#ecc32b";
      if (percentage <= 200) return "#f9b81d";
      if (percentage <= 300) return "#ff6272";
      return "#ff38a2"; // Giá trị phần trăm từ 90 đến 100
    },
  },
};
</script>
<style lang="scss"></style>
