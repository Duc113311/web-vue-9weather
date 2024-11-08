<template>
  <div class="w-full h-full">
    <div class="w-full relative h-full">
      <div class="w-full h-full relative">
        <!--  -->
        <apexchart
          type="area"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "uv-chart-page",

  data() {
    return {
      series: [
        {
          name: "humidity",
          data: [],
        },
      ],
      chartOptions: {
        fill: {
          colors: "#01E1FF",
          opacity: 0.5,
          type: "solid",
        },
        colors: ["#428FDB"],
        markers: {
          size: 4,
          colors: ["#1C84EE"], // Background color of the points
          hover: {
            size: 7, // Size of the points when hovered
            strokeWidth: 3, // Width of the border when hovered
          },
        },
        chart: {
          height: 350,
          type: "area",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [1],
          curve: "smooth",
        },
        tooltip: {
          enabled: true,
        },
        xaxis: {
          categories: [],
          labels: {
            rotate: 0,
            style: {
              colors: "#474A8D",
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
        yaxis: {
          opposite: true,
          min: 0,
          max: 100,
          labels: {
            show: true,
            style: {
              colors: "#474A8D",
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              cssClass: "apexcharts-yaxis-label",
            },
            formatter: (value) => {
              return value + "%";
            },
          },
        },
        // tooltip: {
        //   x: {
        //     format: "dd/MM/yy HH:mm",
        //   },
        // },
      },
    };
  },

  methods: {},
};
</script>
<style lang="scss"></style>
