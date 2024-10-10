<template>
  <div class="w-full h-full">
    <!--  -->
    <div
      class="w-full flex justify-start items-center gap-2 pb-2 bor_bottom_color"
    >
      <div class="flex items-center gap-2">
        <img
          width="24"
          height="24"
          src="../../../../assets/images/svg/icons_pressure.svg"
          alt=""
        />
        <p class="txt_bold txt-v2">
          {{
            $t("Pressure_in_the_coming_times_in_{name}", {
              name: renderCountry.city,
            })
          }}
        </p>
      </div>
    </div>
    <!--  -->
    <div class="w-full flex justify-between items-center gap-2 p-2">
      <p class="txt_regular_14">
        {{ convertToShortDay(objectCurrently.time) }}
      </p>
      <p class="txt_regular_14">
        {{ convertToShortDayTime(objectCurrently.time) }}
      </p>
    </div>
    <!--  -->
    <div class="w-full flex justify-between items-center">
      <div id="chart" class="w-full">
        <apexchart
          type="area"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
    <!--  -->
    <div class="w-full text-left">
      <div class="flex items-end gap-1">
        <p class="txt_regular_wind">
          {{ convertPressure(objectCurrently.windSpeed) }}
        </p>
        <p class="txt_light_14 pb-0.5">{{ convertUnitPressure() }}</p>
      </div>
      <div>
        <p class="txt_light_10">
          {{ renderCountry.city }}, {{ renderCountry.country }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  formatHpa,
  convertHpaToMmHg,
  convertHpaToAtm,
  convertHpaToInHg,
  convertHpaToMbar,
  convertHpaToKpa,
  codeToFind,
  convertTimestampToHoursMinutes12,
  convertTimestampToHoursMinutes,
  convertTimestampNow12,
  convertTimestampNow24,
} from "../../../../utils/converValue.js";
export default {
  name: "pressure-weather",
  data() {
    return {
      series: [
        {
          name: "pressure",
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
            show: true,
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
        // tooltip: {
        //   x: {
        //     format: "dd/MM/yy HH:mm",
        //   },
        // },
      },
    };
  },
  computed: {
    listHourly() {
      return this.$store.state.getWeather.hourly;
    },
    objectCurrently() {
      return this.$store.state.getWeather.currently;
    },
    renderCountry() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName;
      }
      return {
        city: "",
        country: "",
      };
    },
  },
  watch: {
    listHourly(newValue) {
      this.handlerPressure(newValue);
    },
  },

  mounted() {
    if (this.listHourly) {
      this.handlerPressure(this.listHourly);
    }
  },
  methods: {
    convertPressure(val) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activePressure_save === "hPa") {
        return val;
      }
      if (unitSetting.activePressure_save === "mmHg") {
        return convertHpaToMmHg(val);
      }
      if (unitSetting.activePressure_save === "atm") {
        return convertHpaToAtm(val);
      }
      if (unitSetting.activePressure_save === "inHg") {
        return convertHpaToInHg(val);
      }
      if (unitSetting.activePressure_save === "mBar") {
        return convertHpaToMbar(val);
      }
      if (unitSetting.activePressure_save === "kPa") {
        return convertHpaToKpa(val);
      }
    },

    convertUnitPressure() {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      return codeToFind(unitSetting.activePressure_save);
    },

    convertToShortDay(value) {
      const date = new Date(value * 1000);
      const dateNew = new Date(date);
      const day = dateNew.getDate();
      const month = date.getMonth() + 1; // Months are zero-based
      const year = date.getFullYear();
      return `${day} ${this.$t("month")} ${month}, ${year}`;
    },
    convertToShortDayTime(value) {
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestampNow12(new Date(), 0, offsetValue);
      } else {
        return convertTimestampNow24(new Date(), 0, offsetValue);
      }
    },
    handlerPressure(value) {
      const categories = this.generateCategories(value);
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

    generateCategories(data) {
      const categories = [];
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      const offsetValue = this.$store.state.getWeather.locationOffset.offset;

      if (data.length !== 0) {
        data.forEach((item, index) => {
          let timeConvert = "";

          if (unitSetting.activeTime_save === "12h") {
            timeConvert = convertTimestampToHoursMinutes12(
              item?.time,
              1,
              offsetValue
            );
          } else {
            timeConvert = convertTimestampToHoursMinutes(
              item?.time,
              1,
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

<style></style>
