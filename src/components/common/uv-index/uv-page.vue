<template>
  <div class="w-full">
    <BaseComponent>
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_UV_index.svg"
            width="24"
            alt=""
            srcset=""
          />
          <p>{{ $t("uv_index") }}</p>
        </div>
      </template>
      <div class="w-full h-[163px]">
        <!--  -->
        <div class="text-left">
          <div class="txt_bold">
            <span>{{ Math.round(currentlyData?.uvIndex) }}</span>
          </div>
          <div class="txt_light" :style="{ color: progressColor }">
            <!-- <span>
              {{ convertUvIndexName(currentlyData?.uvIndex) }}
            </span> -->
          </div>
          <div>
            <p>{{ $t("The_air_is_mostly_okay") }}</p>
          </div>
        </div>
        <div class="w-full relative mt-2">
          <!-- <div class="chart-container">
            <div class="chart">
              <div
                v-for="(value, index) in paramHourly"
                :key="index"
                class="bar"
                :style="{
                  '--size': 100 + '%',
                }"
              ></div>
            </div>
          </div> -->
          <apexchart
            type="bar"
            :options="chartOptions"
            :series="series"
            height="100"
          />
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "../baseComponent.vue";
import ApexCharts from "vue3-apexcharts";
import { ref } from "vue";
import { mapGetters } from "vuex";
import { getUvSummaryName } from "@/utils/converValue";

export default {
  name: "uv-page",
  components: {
    BaseComponent,
    apexchart: ApexCharts,
  },

  data() {
    return {};
  },

  setup() {
    const series = ref([
      {
        name: "Data",
        data: [6, 8, 8, 8, 6, 8, 6, 8, 8, 8, 8, 8],
      },
    ]);

    const chartOptions = ref({
      chart: {
        type: "bar",
        toolbar: { show: false },
        sparkline: { enabled: true }, // Gọn nhẹ không hiện khung
      },
      plotOptions: {
        bar: {
          columnWidth: "80%",
          distributed: true, // Tạo màu khác nhau cho từng cột
        },
      },
      colors: [
        "#00FF7F",
        "#FFD700",
        "#FFD700",
        "#FFD700",
        "#00FF7F",
        "#FFD700",
        "#00FF7F",
        "#FFD700",
        "#FFD700",
        "#FFD700",
        "#FFD700",
        "#FFD700",
      ],
      dataLabels: {
        enabled: false,
        style: {
          colors: ["#fff"], // Màu số trên đỉnh cột
        },
        offsetY: 10,
      },
      xaxis: {
        labels: { show: false }, // Ẩn trục X
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: { show: false }, // Ẩn trục Y
      },
      grid: {
        show: false, // Không hiện lưới
      },
      tooltip: {
        enabled: false, // Tắt tooltip
      },
      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                columnWidth: "45%", // Điều chỉnh cột cho các màn hình nhỏ hơn
              },
            },
          },
        },
      ],
    });

    return { series, chartOptions };
  },
  computed: {
    ...mapGetters("weatherModule", ["currentlyGetters"]),
    currentlyData() {
      console.log("currentlyGetters", this.currentlyGetters);

      return this.currentlyGetters;
    },

    convertUvIndexName(val) {
      console.log(val);

      return getUvSummaryName(val);
    },

    progressColor() {
      return this.getColorFromPercentage(
        Math.round(this.currentlyGetters?.uvIndex)
      );
    },
  },

  methods: {
    getColorFromPercentage(percentage) {
      if (percentage) {
        if (percentage <= 2) return "#507a46";
        if (percentage <= 5) return "#cbd956";
        if (percentage <= 7) return "#ecc32b";
        if (percentage <= 10) return "#f9b81d";
        return "#ff0dd3"; // Giá trị phần trăm từ 90 đến 100
      }
    },
  },
};
</script>
<style lang="scss">
.chart {
  width: 100%;
  height: 80px;
  display: flex;
  gap: 1px;
  align-items: flex-end;
  justify-content: space-between;
}

.bar {
  width: 6px;
  background-color: #f5d400;
  transition: background-color 0.3s;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.custom-bar-chart .apexcharts-bar-series .apexcharts-bar {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px; /* Tùy chỉnh theo ý muốn */
}
@media (min-width: 576px) {
  .bar {
    width: 6px;
  }
}

@media (min-width: 768px) {
  .bar {
    width: 6px;
  }
}

@media (min-width: 992px) {
  .bar {
    width: 6px;
  }
}

@media (min-width: 1200px) {
  .bar {
    width: 6.45px;
  }
}

@media (min-width: 1400px) {
  .bar {
    width: 9.45px;
  }
}
.bar:hover {
  background-color: #45a049;
}

.bar {
  height: var(--size);
}
</style>
