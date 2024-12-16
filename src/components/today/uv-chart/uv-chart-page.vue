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

            <!-- Chart -->
            <div
              class="chart-container w-[89rem] mb-4"
              v-if="listHourly && listHourly.length"
            >
              <canvas id="chart_hourly" height="240" ref="canvas"></canvas>
            </div>
          </div>
        </vue-horizontal>
        <div class="absolute w-full bottom-0 left-0">
          <div class="flex justify-center items-center w-full">
            <div class="flex-1 bg-short text-white text-center pl-4 pr-4">
              <p class="title-tab">{{ $t("Short") }}</p>
              <p class="des-atb">0-2</p>
            </div>
            <div class="flex-1 bg-Medium text-center">
              <p class="title-tab">{{ $t("Medium") }}</p>
              <p class="des-atb">3-5</p>
            </div>
            <div class="flex-1 bg-High text-center">
              <p class="title-tab">{{ $t("High") }}</p>
              <p class="des-atb">6-7</p>
            </div>
            <div class="flex-1 bg-Very-high text-white text-center">
              <p class="title-tab">{{ $t("Very_high") }}</p>
              <p class="des-atb">8-10</p>
            </div>
            <div class="flex-1 bg-Extremely-high text-white text-center">
              <p class="title-tab">{{ $t("Extremely_high") }}</p>
              <p class="des-atb">> 10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartDays from "@/components/common/chart/chart-days.vue";
import VueHorizontal from "vue-horizontal";
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

export default {
  name: "uv-chart-page",

  components: { ChartDays, VueHorizontal },

  computed: {
    listHourly() {
      return this.$store.state.weatherModule.hourly24h;
    },

    objectSetting() {
      return this.$store.state.commonModule.objectSettingSave;
    },

    listUvIndexData() {
      const unitSetting = this.objectSetting;

      return this.listHourly.map((element) => Math.round(element.uvIndex) || 0);
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
      gradient.addColorStop(0, "#FFD600"); // Màu trên (#F5A300 với độ mờ 50%)
      gradient.addColorStop(1, "#FFA800"); // Màu dưới (#F5D400 với độ mờ 10%)
      const displayData = this.listUvIndexData.map((value) =>
        value === 0 ? 0.5 : value
      );

      this.chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [...Array(24).keys()].map((i) => i + 1),
          datasets: [
            {
              label: "Uv Index",
              borderColor: "#FADB38",
              pointBackgroundColor: "#ffffff",
              borderWidth: 1,
              pointBorderColor: "#C27021",
              pointRadius: 10,
              backgroundColor: gradient,
              fill: true,
              data: displayData,
              pointHoverRadius: 8, // Tăng kích thước khi hover
              borderRadius: 10,
              barThickness: 30,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,

          plugins: {
            legend: {
              display: false,
              position: "bottom",
            },
            tooltip: {
              enabled: true,
            },
            datalabels: {
              display: true,
              align: "end", // Position labels at the end of each bar
              anchor: "end", // Anchor labels to the end of each bar
              font: {
                size: 12,
                //   weight: "bold", // Chỉnh độ đậm của chữ
              },
              color: "#ffffff", // Thay đổi màu sắc của nhãn dữ liệu
              formatter: (value, context) => {
                return this.listUvIndexData[context.dataIndex] === 0
                  ? "0"
                  : value;
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
              max: 13,
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
  },
};
</script>
<style lang="scss">
.bg-short {
  background-color: #507a46;
}

.bg-Medium {
  background-color: #cbd956;
}

.bg-High {
  background-color: #ecc32b;
}

.bg-Very-high {
  background-color: #ff6272;
}

.bg-Extremely-high {
  background-color: #ff38a2;
}
</style>
