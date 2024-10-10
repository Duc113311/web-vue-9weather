<template>
  <div class="w-full h-full">
    <!--  -->
    <div
      class="w-full h-[30px] flex justify-start items-center gap-2 pb-2 bor_bottom_color"
    >
      <div class="flex items-center gap-2">
        <img
          width="24"
          height="24"
          src="../../../../assets/images/svg/ic_smile.svg"
          alt=""
        />
        <p class="txt_bold txt-v2">{{ $t("Feels_like") }}</p>
      </div>
    </div>
    <!--  -->
    <div class="w-full h-[40px] flex justify-between items-center gap-2 p-2">
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
          :options="chartOptionsFeel"
          :series="series"
        ></apexchart>
      </div>
    </div>
    <!--  -->

    <div class="w-full text-left">
      <div class="flex items-end gap-1">
        <p class="txt_regular_wind">
          {{ convertCelsiusToFahrenheit(objectCurrently?.apparentTemperature) }}
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
  codeToFind,
  convertTimestampToHoursMinutes12,
  convertTimestampToHoursMinutes,
  convertFtoC,
  convertCtoF,
  convertTimestampNow12,
  convertTimestampNow24,
} from "../../../../utils/converValue";
export default {
  name: "feels-like-weather",
  data() {
    return {
      series: [
        {
          name: "Feels like",
          data: [],
        },
      ],
      chartOptionsFeel: {
        fill: {
          colors: "#62e35f",
          opacity: 0.5,
          type: "solid",
        },
        colors: ["#62e359"],
        markers: {
          size: 2,
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
          enabled: false,
        },
        xaxis: {
          categories: [],
          labels: {
            rotate: 0,
            style: {
              colors: "#428FDB",
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
        yaxis: {
          opposite: true,
          labels: {
            style: {
              colors: "#428FDB",
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              cssClass: "apexcharts-yaxis-label",
            },
            show: true,
            formatter: (value) => {
              return value + "°";
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

  mounted() {
    if (this.listHourly.length !== 0) {
      this.handlerFeelsLike(this.listHourly);
    }
  },

  watch: {
    listHourly(newValue) {
      this.handlerFeelsLike(newValue);
    },
  },

  methods: {
    convertCelsiusToFahrenheit(value) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;

      if (unitSetting.activeTemperature_save === "f") {
        return convertCtoF(value);
      } else {
        return convertFtoC(value);
      }
    },
    convertUnitPressure() {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;

      if (unitSetting.activeTemperature_save === "f") {
        return codeToFind(unitSetting.activeTemperature_save);
      } else {
        return codeToFind(unitSetting.activeTemperature_save);
      }
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
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestampNow12(new Date(), 0);
      } else {
        return convertTimestampNow24(new Date(), 0);
      }
    },
    handlerFeelsLike(value) {
      const categories = this.generateCategories(value);
      debugger;
      this.series = [
        {
          name: "Feels Like",
          data: this.generateSeriesData(value),
        },
      ];

      this.chartOptionsFeel = {
        ...this.chartOptionsFeel,
        xaxis: {
          ...this.chartOptionsFeel.xaxis,
          categories: categories,
        },
      };
    },
    generateSeriesData(data) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;

      return data.map((item) => {
        if (unitSetting.activeTemperature_save === "f") {
          return convertCtoF(item?.apparentTemperature);
        }
        if (unitSetting.activeWindSpeed_save === "c") {
          return convertFtoC(item?.apparentTemperature);
        }
      });
    },
    generateCategories(data) {
      const categories = [];
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      const offsetValue =
        this.$store.state.getWeather.locationOffset?.offset || 0;
      debugger;

      if (!data || data.length === 0) {
        console.warn("No data available to generate categories");
        return categories; // Trả về mảng rỗng nếu không có dữ liệu
      }
      debugger;
      if (data.length !== 0) {
        data.forEach((item, index) => {
          let timeConvert = "";
          debugger;

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
