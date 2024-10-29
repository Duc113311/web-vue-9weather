<template>
  <div class="w-full">
    <BaseComponent :isShowPad="false">
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_fluent_emoji_high_contrast_sun.svg"
            width="24"
            alt=""
            srcset=""
          />
          <p>Sun</p>
        </div>
      </template>
      <div class="w-full h-full">
        <!--  -->
        <div class="sun-rise-progression w-full relative">
          <div
            class="flex items-center justify-between w-full absolute bottom-24"
          >
            <div class="flex flex-col gap-2 items-center w-[70px]">
              <p class="txt_medium_des pl-2 text-center">
                <span>{{ convertTime(paramDailyOne?.sunriseTime) }}</span
                ><br />
                <span class="txt_regular_des_moon_12">Sunrise</span>
              </p>
            </div>
            <!--  -->
            <div class="flex flex-col gap-2 items-center w-[70px]">
              <p class="txt_medium_des text-center">
                <span>{{ convertTime(paramDailyOne?.sunsetTime) }}</span
                ><br />
                <span class="txt_regular_des_moon_12">Sunrise</span>
              </p>
            </div>
          </div>
          <canvas
            id="draw_progression"
            class="w-full"
            height="370"
            width="680"
          ></canvas>
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "../baseComponent.vue";
import { convertTimeSun } from "../../../utils/converValue.js";
import { mapGetters } from "vuex";
import {
  convertTimestampToHoursMinutes,
  convertTimestampToHoursMinutes12,
} from "../../../utils/converValue.js";
export default {
  name: "sun-page",
  components: {
    BaseComponent,
  },

  data() {
    return {
      sunSize: 50,
      percentProgression: 50,
      imgTop: require("../../../assets/images/svg_v2/ic_Sun.svg"),
      imgBottom: require("../../../assets/images/svg/ic_canvas_bottom.svg"),
    };
  },

  computed: {
    ...mapGetters("weatherModule", [
      "currentlyGetters",
      "dailyOneGetters",
      "locationOffsetGetters",
    ]),

    paramDailyOne() {
      return this.dailyOneGetters;
    },

    timeHourly() {
      const timeValue = this.$store.state.weatherModule.currently;

      console.log(
        "timezone",
        Math.round((convertTimeSun(timeValue.time, 0) * 100) / 24)
      );
      return Math.round((convertTimeSun(timeValue.time, 0) * 100) / 24);
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.createProgressionSin();
    });
  },

  methods: {
    convertTime(val) {
      const offsetValue =
        this.$store.state.weatherModule.locationOffset?.offset;

      console.log("offsetValue", offsetValue);

      const unitSetting = this.$store.state.commonModule.objectSettingSave;
      if (unitSetting.activeTime_save === "12h") {
        return convertTimestampToHoursMinutes12(val, 1, offsetValue);
      } else {
        return convertTimestampToHoursMinutes(val, 1, offsetValue);
      }
    },
    async createProgressionSin() {
      // Lấy canvas gốc và context của nó
      var canvas = document.getElementById("draw_progression");
      var ctx = canvas.getContext("2d");

      // Khởi tạo tiếp 2 thằng con
      var canvasUpper = document.createElement("canvas");
      canvasUpper.width = canvas.width; // Chiều rộng lấy theo canvas gốc
      canvasUpper.height = canvas.height; // Chiều cao tương tự
      var ctxUpper = canvasUpper.getContext("2d");

      // Tạo thằng con tiếp theo
      var canvasDowner = document.createElement("canvas");
      canvasDowner.width = canvas.width;
      canvasDowner.height = canvas.height;
      var ctxDowner = canvasDowner.getContext("2d");

      // Tạo đường path

      var path = new Path2D();
      path.moveTo(-100, canvas.height + 200); // Di chuyển ra tọa độ này
      var sunPosX = []; // Lưu trữ tọa độ x
      var sunPosY = []; // Lưu trữ tọa độ y
      let i = 0;
      while (i < canvas.width + 5) {
        const wx = i;
        const factor =
          (1 - Math.sin(((i / canvas.width) * 2 - 0.5) * Math.PI)) / 2;
        const wy = factor * canvas.height * 0.7 + canvas.height * 0.15;
        path.lineTo(wx, wy);
        sunPosX.push(wx);
        sunPosY.push(wy);
        i += 5;
      }
      path.lineTo(canvas.width + 100, canvas.height + 100);
      path.closePath(); // Đóng đường path

      ctxUpper.clearRect(0, 0, canvas.width, canvas.height);
      ctxDowner.clearRect(0, 0, canvas.width, canvas.height);

      ctx.clearRect(1, 0, canvas.width, canvas.height);

      ctxDowner.strokeStyle = "#C1C1C1";
      ctxUpper.strokeStyle = "#C4E032";
      ctx.strokeStyle = "#FFFFFF";
      ctxUpper.lineWidth = 5;
      ctxDowner.lineWidth = 5;
      ctx.lineWidth = 4;
      ctxDowner.setLineDash([5, 5]);

      ctxUpper.stroke(path); // Vẽ đường cong
      ctxDowner.stroke(path); // Vẽ đường cong

      ctxDowner.clearRect(0, 0, canvas.width, canvas.height * 0.3);
      ctxUpper.clearRect(0, canvas.height * 0.6, canvas.width, canvas.height);

      ctx.drawImage(canvasDowner, 0, 0); // Vẽ canvas canvasDowner lên ctx
      ctx.drawImage(canvasUpper, 0, 0); // Vẽ canvas canvasUpper lên ctx
      var sunSize = 50;
      var percent = this.timeHourly;
      this.drawSunAt(
        ctx,
        ctxDowner,
        canvasDowner,
        percent,
        sunPosX,
        sunPosY,
        sunSize,
        this.imgTop,
        canvas,
        1
      );

      this.drawSunAt(
        ctx,
        ctxUpper,
        canvasUpper,
        percent,
        sunPosX,
        sunPosY,
        sunSize,
        this.imgBottom,
        canvas,
        2
      );
    },
    drawSunAt(
      ctx,
      ctxNew,
      canvasDowner,
      percent,
      sunPosX,
      sunPosY,
      sunSize,
      drawable,
      canvas,
      number
    ) {
      const posIndex = Math.floor((sunPosY.length * percent) / 100);

      console.log("posIndex", posIndex);

      const posX = sunPosX[posIndex];
      const posY = sunPosY[posIndex];

      const img = new Image();
      img.style.width = "220px";
      img.style.height = "220px";
      img.src = drawable;

      img.onload = () => {
        ctxNew.drawImage(
          img,
          posX - this.sunSize / 2,
          posY - this.sunSize / 2,
          sunSize,
          sunSize
        );
        if (number === 1) {
          ctxNew.clearRect(0, canvas.height * 0.5, canvas.width, canvas.height);
        } else {
          ctxNew.clearRect(0, 0, canvas.width, canvas.height * 0.5);
        }
        // Sau khi vẽ lên canvasDowner, bạn cần vẽ canvasDowner lên canvas chính
        ctx.drawImage(canvasDowner, 0, 0);
        // Thêm đường kẻ trắng
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.6);
        ctx.lineTo(canvas.width, canvas.height * 0.6);
        ctx.stroke();
      };
    },
  },
};
</script>
<style lang="scss"></style>
