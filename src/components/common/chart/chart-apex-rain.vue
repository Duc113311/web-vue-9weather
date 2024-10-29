<template>
  <div class="w-full">
    <apexchart
      type="bar"
      :options="chartOptions"
      :series="series"
      height="50"
    />
  </div>
</template>
<script>
import ApexCharts from "vue3-apexcharts";

import { ref } from "vue";

export default {
  name: "chart-apex-rain",

  data() {
    return {};
  },

  computed: {
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
          columnWidth: "20%",
          distributed: true, // Tạo màu khác nhau cho từng cột
          borderRadius: 10,
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
};
</script>
<style lang="scss"></style>
