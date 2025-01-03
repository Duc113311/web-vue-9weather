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
      <div class="w-full h-[183px]">
        <!--  -->
        <div class="text-left">
          <div class="txt_bold_24">
            <span>{{ Math.round(currentlyData?.uvIndex) }}</span>
          </div>
          <div
            class="txt_regular_17 text-left"
            :style="{ color: progressColor }"
          >
            <span>
              {{ convertUvIndexName(currentlyData?.uvIndex) }}
            </span>
          </div>
          <span class="txt_regular_12">
            {{ convertInformationUVIndex(currentlyData?.uvIndex) }}</span
          >
        </div>
        <div class="w-full relative mt-1 pr-2">
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
            width="100%"
          />
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "../baseComponent.vue";
import ApexCharts from "vue3-apexcharts";
import { ref, computed } from "vue";
import { mapGetters } from "vuex";
import { getInformationUVIndex, getUvSummaryName } from "@/utils/converValue";
import { useStore } from "vuex"; // Nhập useStore từ vuex

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
    const store = useStore();
    const listHourly = computed(() => {
      return store.state.weatherModule.hourly24h;
    });
    const listUvIndexData = computed(() => {
      return listHourly.value
        .map((element) => Math.round(element.uvIndex) || 0)
        .slice(0, 10);
    });

    const displayData = listUvIndexData.value.map((value) =>
      value === 0 ? 0.5 : value
    );
    const max = Math.max(...displayData);

    const series = ref([
      {
        name: "Data",
        data: displayData,
      },
    ]);

    const backgroundColors = series.value[0].data.map((value) => {
      if (value <= 2) return "#389311"; // Màu cho giá trị thấp
      if (value <= 5) return "#F3E52B"; // Màu cho giá trị trung bình
      if (value <= 7) return "#EE621D"; // Màu cho giá trị cao
      if (value <= 10) return "#CF2526"; // Màu cho giá trị rất cao
      return "#9064CB"; // Màu cho giá trị cực cao
    });

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
          borderRadius: 2,
        },
      },
      colors: backgroundColors,
      dataLabels: {
        enabled: true,

        style: {
          colors: ["#fff"], // Màu số trên đỉnh cột
        },
        formatter: (value, context) => {
          if (context.dataPointIndex === 0) {
            return value; // Hiển thị giá trị đầu tiên
          }
          return "";
        },
      },
      xaxis: {
        labels: { show: true }, // Ẩn trục X
        axisBorder: { show: false },
        axisTicks: { show: true },
      },
      yaxis: {
        labels: { show: true }, // Ẩn trục Y
        max: 13,
      },
      grid: {
        show: false, // Không hiện lưới
      },
      tooltip: {
        enabled: true, // Tắt tooltip
        theme: "dark", // Chủ đề tối (hoặc 'light' nếu muốn sáng)
      },
      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                columnWidth: "50%", // Điều chỉnh cột cho các màn hình nhỏ hơn
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
      return this.currentlyGetters;
    },
    progressColor() {
      return this.getColorFromPercentage(
        Math.round(this.currentlyGetters?.uvIndex)
      );
    },
  },

  methods: {
    convertUvIndexName(val) {
      return getUvSummaryName(val);
    },

    convertInformationUVIndex(val) {
      return getInformationUVIndex(val);
    },

    getColorFromPercentage(percentage) {
      if (percentage) {
        if (percentage <= 2) return "#389311";
        if (percentage <= 5) return "#F3E52B";
        if (percentage <= 7) return "#EE621D";
        if (percentage <= 10) return "#CF2526";
        return "#9064CB"; // Giá trị phần trăm từ 90 đến 100
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
