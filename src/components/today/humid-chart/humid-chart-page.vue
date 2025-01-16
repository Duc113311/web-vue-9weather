<template>
  <div class="w-full h-full">
    <div class="w-full relative h-full">
      <div class="w-full h-full relative">
        <!--  -->
        <vue-horizontal
          responsive
          :displacement="1"
          class="w-full h-full relative horizontal pl-2 pr-2"
        >
          <div>
            <ChartDays></ChartDays>

            <div
              class="chart-container w-[89rem] pt-4"
              v-if="listHourly && listHourly.length"
            >
              <canvas id="chart_hourly" height="300" ref="canvas"></canvas>
            </div>
          </div>
        </vue-horizontal>

        <div
          class="absolute w-full bottom-0 left-0 flex justify-end pad-t-b-10 pad-r-l-10"
        >
          <div class="w-full flex justify-between items-center">
            <div class="flex items-center gap-1">
              <div class="bg-humid rounded-full w-[10px] h-[10px]"></div>
              <div class="txt_regular_12">
                <p>Humidity:</p>
              </div>
              <div class="flex items-center gap-0.5">
                <p class="txt_medium_15">
                  {{ Math.round(objectCurrently?.humidity * 100) }}
                </p>
                <p class="txt_medium_15">%</p>
              </div>
            </div>
            <div class="flex items-center text-left gap-2">
              <span
                class="txt_regular_12"
                v-if="breadcumsObjectValue?.country_key?.toLowerCase() === 'vn'"
              >
                {{
                  $t(
                    `city.city_${languageParam}.${convertToLowCase(
                      breadcumsObjectValue?.city_key
                    )}`
                  )
                }}, {{ breadcumsObjectValue?.country }}</span
              >
              <span v-else class="txt_regular_12">
                {{ breadcumsObjectValue.state }},
                {{ breadcumsObjectValue?.country }}
              </span>
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
import {
  convertTimestamp12hSun,
  convertTimestamp24hSun,
} from "@/utils/converValue";
import { mapGetters } from "vuex";

export default {
  name: "humid-chart-page",

  components: {
    ChartDays,
    VueHorizontal,
  },
  data() {
    return {
      chart: null,
      chartInstance: null,
    };
  },

  computed: {
    ...mapGetters("commonModule", [
      "breadcumsObjectGetters",
      "listCityAllGetters",
    ]),
    languageParam() {
      const languageRouter = this.$route.params;
      return Object.keys(languageRouter).length !== 0
        ? languageRouter.language
        : this.$i18n.locale;
    },

    breadcumsObjectValue() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      return retrievedArray ? retrievedArray : this.breadcumsObjectGetters;
    },
    objectCurrently() {
      return this.$store.state.weatherModule.currently;
    },
    listHourly() {
      return this.$store.state.weatherModule.hourly24h;
    },

    objectSetting() {
      return this.$store.state.commonModule.objectSettingSave;
    },

    listTemperatureData() {
      const unitSetting = this.objectSetting;

      return this.listHourly.map(
        (element) => Math.round(element.humidity * 100) || 0
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
    convertToLowCase(value) {
      const normalizedStr = value
        .normalize("NFD") // Chuyển chuỗi sang dạng tổ hợp Unicode
        .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ các dấu

      return normalizedStr;
    },
    convertTime(val) {
      const offsetValue = this.$store.state.weatherModule.locationOffset.offset;
      const timezoneValue =
        this.$store.state.weatherModule.locationOffset.timezone;
      const unitSetting = this.$store.state.commonModule.objectSettingSave;

      if (unitSetting.activeTime_save === "12h") {
        return convertTimestamp12hSun(val, 1, offsetValue, timezoneValue);
      } else {
        return convertTimestamp24hSun(val, 1, offsetValue);
      }
    },
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
      gradient.addColorStop(0, "rgba(12, 255, 211, 0.9)"); // Màu trên (#F5A300 với độ mờ 50%)
      gradient.addColorStop(0, "rgba(0, 102, 255, 0.5)"); // Màu dưới (#F5D400 với độ mờ 10%)
      gradient.addColorStop(1, "rgba(0, 102, 255, 0)"); // Màu dưới (#F5D400 với độ mờ 10%)

      const maxWindSpeedData = Math.max(...this.listTemperatureData);

      const labelList = this.listHourly.map((item) => {
        const date = item.time;
        return this.convertTime(date);
      });

      const savedTheme = localStorage.getItem("theme") || "light";

      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: labelList,
          datasets: [
            {
              label: "Humidity",
              borderColor: "#1EB092",
              pointBackgroundColor: "#ffffff",
              pointBorderWidth: 1, // Độ dày viền của điểm

              borderWidth: 2,
              pointBorderColor: "#ffffff",
              pointRadius: 5,
              backgroundColor: gradient,
              fill: true,
              data: this.listTemperatureData,
              pointHoverRadius: 4, // Tăng kích thước khi hover
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: 24,
          },
          plugins: {
            legend: {
              display: false,
              position: "bottom",
            },
            tooltip: {
              enabled: true,
              theme: "dark",
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || "";
                  const value = context.raw || "";
                  return `${label}: ${value}%`; // Thông tin khi hover
                },
              },
            },
            datalabels: {
              display: true,
              align: "top",
              font: {
                size: 14,
                //   weight: "bold", // Chỉnh độ đậm của chữ
              },
              color: savedTheme === "light" ? "#333333" : "#ffffff", // Thay đổi màu sắc của nhãn dữ liệu
              formatter: (value, context) => {
                return `${value}%`;
              },
              offset: 4,
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
              max: maxWindSpeedData + 20,
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
<style scoped>
.horizontal >>> .v-hl-btn-prev {
  display: none !important;
  left: 10px !important;
}
.horizontal >>> .v-hl-btn-next {
  display: none !important;

  right: 10px !important;
}
.horizontal:hover >>> .v-hl-btn-prev {
  display: flex !important;
  left: 24px !important;
  opacity: 0.5;
}

.horizontal:hover >>> .v-hl-btn-next {
  display: flex !important;
  right: 24px !important;
  opacity: 0.5;
}
.bg-humid {
  background-color: #0b78d5;
}

.bg-rain-c {
  background-color: #39e4f2;
}

.bg-rainfall-c {
  background-color: #327cee;
}
</style>
