<template>
  <div class="w-full">
    <apexchart
      type="bar"
      :options="chartOptions"
      :series="series"
      height="70"
    />
  </div>
</template>
<script>
import ApexCharts from "vue3-apexcharts";

import { ref } from "vue";
import {
  convertMillimetToInch,
  convertTimestampToHoursMinutes,
  convertTimestampToHoursMinutes12,
} from "@/utils/converValue";

export default {
  name: "chart-apex-rain",

  data() {
    return {};
  },

  components: {
    apexchart: ApexCharts,
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
          columnWidth: "18%",
          distributed: true, // Tạo màu khác nhau cho từng cột
          borderRadius: 10,
        },
      },
      colors: ["#FFD700"],
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
                columnWidth: "20%", // Điều chỉnh cột cho các màn hình nhỏ hơn
              },
            },
          },
        },
      ],
    });

    return { series, chartOptions };
  },

  computed: {
    // listHourly() {
    //   return this.$store.state.weatherModule.hourly24h;
    // },
  },

  watch: {
    // listHourly(newValue) {
    //   this.handlerPrecipitation(newValue);
    // },
  },

  mounted() {
    // if (this.listHourly.length !== 0) {
    //   this.handlerPrecipitation(this.listHourly);
    // }
  },

  methods: {
    generateSeriesData(data) {
      return data.map((item) => Math.round(item.precipProbability * 100) || 0);
    },

    generateCategories(data) {
      const categories = [];
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      const offsetValue =
        this.$store.state.weatherModule?.locationOffset?.offset;

      if (data.length !== 0) {
        data.forEach((item, index) => {
          let timeConvert = "";

          if (unitSetting.activeTime_save === "12h") {
            timeConvert = convertTimestampToHoursMinutes12(
              item?.time,
              0,
              offsetValue
            );
          } else {
            timeConvert = convertTimestampToHoursMinutes(
              item?.time,
              0,
              offsetValue
            );
          }

          categories.push(timeConvert);
        });
      }

      return categories;
    },
  },
};
</script>
<style lang="scss"></style>
