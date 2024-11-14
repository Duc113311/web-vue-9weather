<template>
  <div class="w-full h-full">
    <div class="w-full relative h-full">
      <div class="w-full h-full relative">
        <!--  -->
        <vue-horizontal
          responsive
          :displacement="0.7"
          class="w-full h-full relative horizontal"
        >
          <div>
            <ChartDays></ChartDays>

            <div
              class="chart-container w-[89rem]"
              v-if="listHourly && listHourly.length"
            >
              <canvas id="chart_hourly" height="280" ref="canvas"></canvas>
            </div>
          </div>
        </vue-horizontal>

        <div class="absolute w-full bottom-0 left-0 flex justify-end">
          <div class="flex items-center text-left gap-2">
            <div class="bg-wind rounded-full w-[15px] h-[15px]"></div>
            <p>Precipitation in the coming hours</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";
Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
  LineController,
  ChartDataLabels
);

import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  codeToFind,
  convertMillimet,
  convertMillimetToInch,
} from "@/utils/converValue";
import ChartDays from "@/components/common/chart/chart-days.vue";

import VueHorizontal from "vue-horizontal";

export default {
  name: "pressure-chart-page",

  components: { ChartDays, VueHorizontal },
  data() {
    return {
      chart: null,
      chartInstance: null,
    };
  },

  computed: {
    listHourly() {
      return this.$store.state.weatherModule.hourly24h;
    },

    objectSetting() {
      return this.$store.state.commonModule.objectSettingSave;
    },

    listPrecipIntensity() {
      const unitSetting = this.objectSetting;

      console.log("unitSetting", unitSetting);

      console.log("this.listHourly", this.listHourly);

      return this.listHourly.map((element) =>
        Math.round(this.convertPrecipitation(element.precipIntensity))
      );
    },

    listPrecipProbability() {
      const unitSetting = this.objectSetting;

      console.log("unitSetting", unitSetting);

      console.log("this.listHourly", this.listHourly);

      return this.listHourly.map((element) =>
        Math.round(element.precipProbability * 100)
      );
    },
  },

  watch: {
    listHourly(newValue) {
      if (newValue.length !== 0) {
        this.$nextTick(() => {
          this.createChartHourly24h();
        });
      }
    },
  },

  mounted() {
    if (this.listHourly && this.listHourly.length) {
      this.$nextTick(() => {
        this.createChartHourly24h();
      });
    }
  },

  methods: {
    createChartHourly24h() {
      const canvas = this.$refs.canvas;
      if (!canvas) {
        console.error("Canvas element not found");
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Failed to get canvas context");
        return;
      }

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Tạo gradient màu từ #FFDA24 đến #D9D9D9 chỉ ở nửa trên của canvas
      const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      gradient.addColorStop(0, "#00E1FF"); // Màu trên (#F5A300 với độ mờ 50%)
      gradient.addColorStop(1, "#00E1FF"); // Màu dưới (#F5D400 với độ mờ 10%)

      const displayData = this.listPrecipProbability.map((value) =>
        value === 0.0 ? 0.5 : value
      );
      const unitSetting = this.$store.state.commonModule.objectSettingSave;

      this.chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [...Array(24).keys()].map((i) => i + 1),
          datasets: [
            {
              label: "Precipitation",
              borderColor: "#FADB38",
              pointBackgroundColor: "#ffffff",
              borderWidth: 1,
              pointBorderColor: "#C27021",
              pointRadius: 5,
              backgroundColor: gradient,
              fill: true,
              data: displayData,
              pointHoverRadius: 8, // Tăng kích thước khi hover
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,

          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
            },
            datalabels: {
              display: true,
              align: "top",
              font: {
                size: 12,
                //   weight: "bold", // Chỉnh độ đậm của chữ
              },
              color: "#ffffff", // Thay đổi màu sắc của nhãn dữ liệu
              formatter: (value, context) => {
                return this.listPrecipIntensity[context.dataIndex] === 0
                  ? "0 " + codeToFind(unitSetting.activePrecipitation_save)
                  : value + codeToFind(unitSetting.activePrecipitation_save);
              },
            },
          },
          scales: {
            x: {
              display: false,

              ticks: {
                stepSize: 2, // Điều chỉnh số lượng điểm hiển thị trên trục x
              },
            },
            y: {
              display: false,
              beginAtZero: true,
              max: 10,
            },
          },
          elements: {
            line: {
              tension: 0.5,
            },
          },
        },
        plugins: [{}],
      });
    },

    convertPrecipitation(val) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activePrecipitation_save === "mm") {
        console.log(convertMillimet(val));

        return convertMillimet(val);
      } else {
        return convertMillimetToInch(val);
      }
    },
  },
};
</script>
<style lang="scss"></style>
