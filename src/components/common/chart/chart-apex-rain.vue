<template>
  <div class="w-full">
    <apexchart
      type="bar"
      :options="chartOptions"
      :series="series"
      height="150"
    />
  </div>
</template>
<script>
import ApexCharts from "vue3-apexcharts";

import {
  codeToFind,
  convertHpaToAtm,
  convertHpaToInHg,
  convertHpaToKpa,
  convertHpaToMbar,
  convertHpaToMmHg,
  convertMillimet,
  convertMillimetToInch,
  convertTimestampToHoursMinutes,
  convertTimestampToHoursMinutes12,
  formatHpa,
} from "@/utils/converValue";

export default {
  name: "chart-apex-rain",

  data() {
    return {
      series: [
        {
          name: "Chance of rain",
          data: [],
        },
      ],
      chartOptions: {
        fill: {
          colors: "#2FC92B",
          opacity: 0.5,
          type: "solid",
        },
        colors: ["#428FDB"],
        markers: {
          size: 4,
          colors: ["#AAB44F"], // Background color of the points
        },
        chart: {
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
          theme: "dark", // Tooltip theme to use
        },
        xaxis: {
          categories: [],
          labels: {
            show: false,
            rotate: 0,
            style: {
              colors: "#2FC92B",
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
        yaxis: {
          opposite: true,
          labels: {
            show: false,
            style: {
              colors: "#474A8D",
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              cssClass: "apexcharts-yaxis-label",
            },
            formatter: (value) => {
              return Math.round(value);
            },
          },
        },
      },
    };
  },

  components: {
    apexchart: ApexCharts,
  },

  computed: {
    listHourly() {
      return this.$store.state.weatherModule.hourly24h;
    },
  },

  watch: {
    listHourly(newValue) {
      this.handlerPrecipitation(newValue);
    },
  },

  mounted() {
    if (this.listHourly.length !== 0) {
      this.handlerPrecipitation(this.listHourly);
    }
  },

  methods: {
    generateSeriesData(data) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;

      return data.map((item) => {
        if (unitSetting.activePressure_save === "hPa") {
          return formatHpa(item?.pressure);
        }
        if (unitSetting.activePressure_save === "mmHg") {
          return convertHpaToMmHg(item?.pressure);
        }
        if (unitSetting.activePressure_save === "atm") {
          return convertHpaToAtm(item?.pressure);
        }
        if (unitSetting.activePressure_save === "inHg") {
          return convertHpaToInHg(item?.pressure);
        }
        if (unitSetting.activePressure_save === "mBar") {
          return convertHpaToMbar(item?.pressure);
        }
        if (unitSetting.activePressure_save === "kPa") {
          return convertHpaToKpa(item?.pressure);
        }
      });
    },

    /**
     * Data Time
     * @param data
     */
    generateCategoriesTime(data) {
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

    handlerPrecipitation(value) {
      const categories = this.generateCategoriesTime(value);
      const data = this.generateSeriesData(value);

      const maxData = Math.max(...data);
      const minData = Math.min(...data);
      this.series = [
        {
          name: "Pressure",
          data: data,
        },
      ];
      this.chartOptions = {
        ...this.chartOptions,
        xaxis: {
          ...this.chartOptions.xaxis,
          categories: categories,
        },
        yaxis: {
          ...this.chartOptions.yaxis,
          opposite: true,
          min: Math.round(minData * 0.9),
          max: Math.round(maxData * 1.1),
          // min: Math.round(minData),
          // max: Math.round(maxData),
        },
      };
    },
  },
};
</script>
<style lang="scss"></style>
