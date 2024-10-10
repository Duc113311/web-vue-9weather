<template>
  <div class="w-full h-full overflow-hidden">
    <!--  -->
    <div class="w-full h-full p-4 overflow-hidden">
      <div class="text-left h-[30px] pl-1 pr-1">
        <a href="#" class="feature-location d-flex mb-3">
          <p class="txt_bold txt-v2">Biểu đồ thông số</p>
        </a>
      </div>
      <!--  -->
      <div class="w-full items-center gap-2 h-[300px]">
        <div id="chart" class="w-full">
          <apexchart
            type="area"
            height="300"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </div>
      <div class="w-full flex text-left pt-4">
        <div class="flex text-left items-center">
          <div class="w-[15px] rounded h-[15px] bg-temp"></div>
          <div class="txt_regular_14 ml-2 txt-temp">
            <span>Temperature</span>
          </div>
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>
<script>
export default {
  name: "weather-three-all-page",

  data() {
    return {
      series: [
        {
          name: "Temperature",
          type: "bar",
          data: [
            { x: "Low", y: 23 },
            { x: "High", y: 35 },
          ],
        },
        {
          name: "Humidity",
          type: "bar",
          data: [{ x: "Humidity", y: 44 }],
        },
        {
          name: "Wind Speed",
          type: "bar",
          data: [{ x: "Wind Speed", y: 16.69 }],
        },
        {
          name: "Pressure",
          type: "bar",
          data: [{ x: "Pressure", y: 1014 }],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: false,
          },
        },
        xaxis: {
          categories: ["Low", "High", "Humidity", "Wind Speed", "Pressure"],
        },
        yaxis: {
          title: {
            text: "Values",
          },
        },
        tooltip: {
          y: {
            formatter: function (value) {
              return (
                value +
                (this.seriesName === "Humidity"
                  ? "%"
                  : this.seriesName === "Wind Speed"
                  ? " mi/h"
                  : this.seriesName === "Pressure"
                  ? " hPa"
                  : "°")
              );
            },
          },
        },
      },
    };
  },

  methods: {},
};
</script>
<style lang=""></style>
