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
          src="../../../../assets/images/svg/ic_cloudy.svg"
          alt=""
        />
        <p class="txt_bold txt-v2">
          {{
            $t("Cloud_cover_in_the_coming_hours_in_{name}", {
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
          {{ Math.round(objectCurrently?.cloudCover * 100) }}%
        </p>
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
  convertTimestampToHoursMinutes12,
  convertTimestampToHoursMinutes,
  convertTimestampNow12,
  convertTimestampNow24,
} from "../../../../utils/converValue.js";
export default {
  name: "cloud-cover-weather",
  data() {
    return {
      series: [
        {
          name: "Cloud cover",
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
          //   zoom: {
          //     enabled: false,
          //   },
          zoom: {
            enabled: true,
            type: "x",
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
          tickPlacement: "on",
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
      this.handlerCloudCover(newValue);
    },
  },
  mounted() {
    if (this.listHourly) {
      this.handlerCloudCover(this.listHourly);
    }
  },
  methods: {
    handlerCloudCover(value) {
      const categories = this.generateCategories(value);
      this.series = [
        {
          name: "Cloud cover",
          data: this.generateSeriesData(value),
        },
      ];
      this.chartOptions = {
        ...this.chartOptions,
        xaxis: {
          ...this.chartOptions.xaxis,
          categories: categories,
        },
      };
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
    generateSeriesData(data) {
      return data.map((item) => Math.round(item.cloudCover * 100) || 0);
    },
    generateCategories(data) {
      const categories = [];
      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      const offsetValue =
        this.$store.state.getWeather.locationOffset?.offset || 0;
      if (!data || data.length === 0) {
        console.warn("No data available to generate categories");
        return categories; // Trả về mảng rỗng nếu không có dữ liệu
      }

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
