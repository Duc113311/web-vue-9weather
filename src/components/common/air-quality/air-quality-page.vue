<template>
  <div class="w-full">
    <BaseComponent>
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_Air_quality.svg"
            width="24"
            alt=""
            srcset=""
          />
          <p>Air Quality</p>
        </div>
      </template>
      <div class="w-full h-[163px]">
        <!--  -->
        <div class="text-left">
          <div class="txt_bold">
            <span>100</span>
          </div>
          <div>
            <p>Moderate</p>
          </div>
        </div>

        <div class="w-full items-center gap-2 h-[300px]">
          <div id="chart" class="w-full">
            <apexchart
              type="area"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "../baseComponent.vue";

export default {
  name: "air-quality-page",
  components: {
    BaseComponent,
  },

  data() {
    return {
      series: [
        {
          name: "Temperature",
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
          borderColor: "#FADB38", // Border color of the line
          pointBackgroundColor: "#C27021", // Background color of the points
          pointBorderColor: "#C27021", // Border color of the points
        },
      ],
      chartOptions: {
        tooltip: {
          enabled: false, // Bật tooltip
          theme: "light", // Chủ đề của tooltip (có thể là 'light', 'dark', hoặc 'custom')
          x: {
            show: true, // Hiển thị thông tin của trục x trong tooltip
            format: "dd MMM", // Định dạng ngày tháng nếu trục x là thời gian
          },
          y: {
            formatter: function (value) {
              return value + "°"; // Định dạng giá trị hiển thị trong tooltip
            },
          },
          marker: {
            show: false, // Hiển thị marker (dấu chấm) trên tooltip
          },
          followCursor: false, // Tooltip di chuyển theo con trỏ chuột
        },
        fill: {
          colors: "#709F23",
          opacity: 0.5,
          type: "solid",
        },
        colors: ["#709F23"],
        markers: {
          size: 4,
          colors: ["#C27021"], // Background color of the points
          hover: {
            size: 7, // Size of the points when hovered
            strokeWidth: 3, // Width of the border when hovered
          },
        },
        chart: {
          height: 200,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
            type: "x",
          },
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: true, // Enable data labels
          style: {
            fontSize: "10px", // Set font size
            colors: ["#003870"], // Set color of the data labels
          },
          offsetY: -8, // Adjust vertical offset
          background: {
            enabled: false, // Enable background for data labels
            borderRadius: 1, // Set border radius
            padding: 4,
            opacity: 0.9,
          },
          formatter: function (value) {
            return `${value}°`; // Format the label to include % sign
          },
        },
        stroke: {
          width: [1],
          curve: "smooth",
        },
        grid: {
          show: false,
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
          tickPlacement: "on",
          labels: {
            rotate: 1,
            style: {
              colors: "#709F23",
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
        yaxis: {
          opposite: false,
          min: 0,
          max: 150,
          labels: {
            show: true,
            style: {
              colors: "#474A8D",
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              cssClass: "apexcharts-yaxis-label",
            },
            formatter: (value) => {
              return value.toFixed(1);
            },
          },
        },
      },
    };
  },
};
</script>
<style lang="scss"></style>
