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
          <div class="txt_bold">
            <span>100</span>
          </div>
          <div>
            <p>Moderate</p>
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

export default {
  name: "air-quality-page",
  components: {
    BaseComponent,
  },

  // data() {
  //   return {
  //     series: [
  //       {
  //         name: "Temperature",
  //         data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
  //         borderColor: "#FADB38", // Border color of the line
  //         pointBackgroundColor: "#C27021", // Background color of the points
  //         pointBorderColor: "#C27021", // Border color of the points
  //       },
  //     ],
  //     chartOptions: {
  //       tooltip: {
  //         enabled: false, // Bật tooltip
  //         theme: "light", // Chủ đề của tooltip (có thể là 'light', 'dark', hoặc 'custom')
  //         x: {
  //           show: true, // Hiển thị thông tin của trục x trong tooltip
  //           format: "dd MMM", // Định dạng ngày tháng nếu trục x là thời gian
  //         },
  //         y: {
  //           formatter: function (value) {
  //             return value + "°"; // Định dạng giá trị hiển thị trong tooltip
  //           },
  //         },
  //         marker: {
  //           show: false, // Hiển thị marker (dấu chấm) trên tooltip
  //         },
  //         followCursor: false, // Tooltip di chuyển theo con trỏ chuột
  //       },
  //       fill: {
  //         colors: "#709F23",
  //         opacity: 0.5,
  //         type: "solid",
  //       },
  //       colors: ["#709F23"],
  //       markers: {
  //         size: 4,
  //         colors: ["#C27021"], // Background color of the points
  //         hover: {
  //           size: 7, // Size of the points when hovered
  //           strokeWidth: 3, // Width of the border when hovered
  //         },
  //       },
  //       chart: {
  //         height: 200,
  //         toolbar: {
  //           show: false,
  //         },
  //         zoom: {
  //           enabled: false,
  //           type: "x",
  //         },
  //       },
  //       legend: {
  //         show: false,
  //       },
  //       dataLabels: {
  //         enabled: true, // Enable data labels
  //         style: {
  //           fontSize: "10px", // Set font size
  //           colors: ["#003870"], // Set color of the data labels
  //         },
  //         offsetY: -8, // Adjust vertical offset
  //         background: {
  //           enabled: false, // Enable background for data labels
  //           borderRadius: 1, // Set border radius
  //           padding: 4,
  //           opacity: 0.9,
  //         },
  //         formatter: function (value) {
  //           return `${value}°`; // Format the label to include % sign
  //         },
  //       },
  //       stroke: {
  //         width: [1],
  //         curve: "smooth",
  //       },
  //       grid: {
  //         show: false,
  //       },
  //       xaxis: {
  //         categories: [
  //           "Jan",
  //           "Feb",
  //           "Mar",
  //           "Apr",
  //           "May",
  //           "Jun",
  //           "Jul",
  //           "Aug",
  //           "Sep",
  //         ],
  //         tickPlacement: "on",
  //         labels: {
  //           rotate: 1,
  //           style: {
  //             colors: "#709F23",
  //             fontSize: "12px",
  //             fontFamily: "Helvetica, Arial, sans-serif",
  //             cssClass: "apexcharts-yaxis-label",
  //           },
  //         },
  //       },
  //       yaxis: {
  //         opposite: false,
  //         min: 0,
  //         max: 150,
  //         labels: {
  //           show: false,
  //           style: {
  //             colors: "#474A8D",
  //             fontSize: "12px",
  //             fontFamily: "Helvetica, Arial, sans-serif",
  //             cssClass: "apexcharts-yaxis-label",
  //           },
  //           formatter: (value) => {
  //             return value.toFixed(1);
  //           },
  //         },
  //       },
  //     },
  //   };
  // },
  setup() {
    const series = ref([
      {
        name: "Air Quality Index",
        data: [90, 100, 110, 100, 150, 150, 95],
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
          stops: [0, 150],
          colorStops: [
            {
              offset: 0,
              color: "#FFD700",
              opacity: 0.7,
            },
            {
              offset: 150,
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
    paramAirModule() {
      const storageAir = localStorage.getItem("airObject");
      if (storageAir) {
        const airObject = decodeBase64(storageAir);

        const decodeAirObject = JSON.parse(airObject);
        console.log("decodeAirObject", decodeAirObject);

        return decodeAirObject.aqi ? decodeAirObject.aqi : 0;
      }
      return this.$store.state.getAqi.airObject.aqi
        ? this.$store.state.getAqi.airObject.aqi
        : 0;
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
