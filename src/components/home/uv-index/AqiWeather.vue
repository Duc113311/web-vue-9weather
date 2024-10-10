<template>
  <div class="w-full h-full relative">
    <div class="w-full flex justify-between items-center gap-2 p-2">
      <p class="txt_light_summer">
        {{ renderCityName.city }}, {{ renderCityName.country }}
      </p>
    </div>
    <div class="w-full h-[250px] flex justify-center items-center">
      <!-- <div style="margin-bottom: 2rem">
      <label for="set-aqi">Set AQI:</label>
      <input
        type="range"
        id="set-aqi"
        min="0"
        max="500"
        v-model="aqi"
        @input="setDial(aqi)"
      />
    </div> -->
      <div class="gauge">
        <div class="gauge-labels txt_light_summer" data-v-7cc00d6e="">
          <div
            class="label"
            style="transform: rotate(0deg); left: -4%; top: 90%"
            data-v-7cc00d6e=""
          >
            0
          </div>
          <div
            class="label"
            style="transform: rotate(30deg); left: 2%; top: 39%"
            data-v-7cc00d6e=""
          >
            50
          </div>
          <div
            class="label"
            style="transform: rotate(-31deg); left: 20%; top: 3%"
            data-v-7cc00d6e=""
          >
            100
          </div>
          <div
            class="label"
            style="transform: rotate(0deg); left: 48%; top: -12%"
            data-v-7cc00d6e=""
          >
            150
          </div>
          <div
            class="label"
            style="transform: rotate(391deg); left: 74%; top: 2%"
            data-v-7cc00d6e=""
          >
            200
          </div>
          <div
            class="label"
            style="transform: rotate(63deg); left: 94%; top: 41%"
            data-v-7cc00d6e=""
          >
            300
          </div>
          <div
            class="label"
            style="
              transform: rotate(360deg);
              left: 102%; /* top: 0%; */
              top: 90%;
            "
            data-v-7cc00d6e=""
          >
            500
          </div>
        </div>
        <div
          role="meter"
          aria-valuemin="0"
          aria-valuemax="500"
          :aria-valuenow="aqi"
          :aria-valuetext="aqi"
        >
          <div class="dial">
            <div
              class="dial2"
              :style="{ backgroundColor: dialColor }"
              :class="{ white: isWhiteText }"
            >
              <p class="txt_bold_32">{{ this.paramAirModule.aqi }}</p>
              <span class="txt_medium">{{
                convertAirIndexName(this.paramAirModule.aqi)
              }}</span>
            </div>
            <!-- <span class="aqi-num">{{ aqi }}</span>
          <span>AQI</span> -->
            <div
              class="arrow"
              :style="{ transform: `rotate(${dialAngle - 90}deg)` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-4 mb-2 absolute bottom-0 txt_light_14">
      <div>
        <div class="flex items-center gap-1">
          <div class="rounded-full w-[10px] h-[10px] bg-night"></div>
          <p>{{ $t("Good") }}</p>
        </div>
        <div class="flex items-center gap-1">
          <div class="rounded-full w-[10px] h-[10px] bg-medium"></div>
          <p>{{ $t("Moderate") }}</p>
        </div>
        <div class="flex items-center gap-1">
          <div class="rounded-full w-[10px] h-[10px] bg-unhealthy"></div>
          <p>{{ $t("Unhealthy_for_Sensitive_Groups") }}</p>
        </div>
      </div>
      <div>
        <div class="flex items-center gap-1">
          <div class="rounded-full w-[10px] h-[10px] bg-danger"></div>
          <p>{{ $t("Unhealthy") }}</p>
        </div>
        <div class="flex items-center gap-1">
          <div class="rounded-full w-[10px] h-[10px] bg-very-not-cold"></div>
          <p>{{ $t("Very_Unhealthy") }}</p>
        </div>
        <div class="flex items-center gap-1">
          <div class="rounded-full w-[10px] h-[10px] bg-unhealthy-group"></div>
          <p>{{ $t("Hazardous") }}</p>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-between items-center mt-4">
      <div
        class="pd-nearest border-radios-10 txt-v2"
        v-for="(item, index) in this.paramAqiPollutant"
        :key="index"
      >
        <p class="relative txt_medium" v-html="convertHtmlAir(item.code)"></p>
        <p class="txt_light_summer">
          {{ decodeBase64Data(item.code) }} <span class="txt_light">µg/m3</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  dataDecodeFirstPair,
  getAirSummaryName,
  getAQIColor,
} from "../../../utils/converValue.js";
import { decodeBase64 } from "../../../utils/EncoderDecoderUtils";

export default {
  data() {
    return {
      aqi: 160,
      dialColor: "#00ff00",
      isWhiteText: false,
      dialAngle: 0,
    };
  },

  computed: {
    renderCityName() {
      const storageCountry = localStorage.getItem("country");
      if (storageCountry) {
        const storageCountryName = JSON.parse(storageCountry);

        return storageCountryName;
      }
      return "";
    },
    paramAqiPollutant() {
      return this.$store.state.commonModule.objectAqiPollutant;
    },
    paramAirModule() {
      const storageAir = localStorage.getItem("airObject");
      if (storageAir) {
        const airObject = decodeBase64(storageAir);
        const decodeAirObject = JSON.parse(airObject);
        return decodeAirObject ? decodeAirObject : {};
      }
      return this.$store.state.getAqi.airObject.nearest
        ? this.$store.state.getAqi.airObject
        : {};
    },
  },

  watch: {
    paramAirModule(newData) {
      return this.setDial(newData.aqi);
    },
  },
  methods: {
    convertAirIndexName(val) {
      return getAirSummaryName(val);
    },
    getAQIColorItem(value) {
      return getAQIColor(value);
    },

    convertHtmlAir(value) {
      switch (value) {
        case "pm25":
          return '<span class="txt_light_summer">PM</span> <span class="txt_light absolute -bottom-0.5 right-6.5">2.5</span>';
        case "pm10":
          return '<span class="txt_light_summer">PM</span> <span class="txt_light absolute -bottom-0.5 right-6.5">10</span>';
        case "03":
          return '<span class="txt_light_summer">O</span> <span class="txt_light absolute -bottom-0.5 right-6.5">3</span>';
        case "no2":
          return '<span class="txt_light_summer">NO</span> <span class="txt_light absolute -bottom-0.5 right-6.5">2</span>';
        case "SO2":
          return '<span class="txt_light_summer">SO</span> <span class="txt_light absolute -bottom-0.5 right-6.5">2</span>';
        case "co":
          return '<span class="txt_light_summer">CO</span>';

        default:
          break;
      }
    },

    decodeBase64Data(value) {
      if (
        this.paramAirModule !== undefined &&
        Object.keys(this.paramAirModule).length !== 0
      ) {
        const findData = this.paramAirModule?.historic.find(
          (item) => item.n === value
        );
        if (findData) {
          const resultData = dataDecodeFirstPair(findData.d, 1, 0, 1);

          return resultData[0][1] + " " + "";
        }
        return "--" + " " + "";
      }
    },
    setDial(aqi) {
      const angle = this.getAQIDialAngle(aqi);
      const bg = this.getAQIColorItem(aqi);

      this.dialAngle = angle;
      this.dialColor = bg;
      // this.isWhiteText = white;
    },
    getAQIDialAngle(aqi) {
      if (aqi >= 301) {
        return Math.min(((aqi - 301) / 200) * 30 + 150, 180);
      } else if (aqi >= 201) {
        return ((aqi - 201) / 100) * 30 + 120;
      } else if (aqi >= 151) {
        return ((aqi - 151) / 50) * 30 + 90;
      } else if (aqi >= 101) {
        return ((aqi - 101) / 50) * 30 + 60;
      } else if (aqi >= 51) {
        return ((aqi - 51) / 50) * 30 + 30;
      } else if (aqi >= 0) {
        return (aqi / 50) * 30;
      } else {
        return 0;
      }
    },
  },
  mounted() {
    this.setDial(this.paramAirModule.aqi);
  },
};
</script>

<style scoped>
.gauge {
  display: inline-block;
  position: relative;
}

.gauge > div[role="meter"] {
  border-radius: 14rem 14rem 0 0;
  border: 1px solid #495fb8;
  width: 24rem;
  height: 12rem;
  background-color: black;
  position: relative;
  /* overflow: hidden; */
  background: conic-gradient(
    from 0deg at 50% 100%,
    red 30deg,
    #8f3f97 30deg 60deg,
    #7e0023 60deg 91deg,
    transparent 91deg 269deg,
    #00e400 269deg 300deg,
    #ffff00 300deg 330deg,
    #ff7e00 330deg 360deg
  );
}

.gauge > label {
  font-size: 14px;
  text-align: center;
  background-color: black;
  padding: 0.2rem 0;
  display: block;
}

.dial {
  background-color: #3d5161;
  border-radius: 10rem 10rem 0 0;
  width: 80%;
  height: 80%;
  position: absolute;
  bottom: 0;
  left: 10%;
  z-index: 2;
  /* box-shadow: 0px 0px 0px 1rem #495fb8; */
}

.dial2 {
  transition: background-color 1s, color 0.25s;
  border-radius: 10rem 10rem 0 0;
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 16%;
  z-index: 2;
  overflow: hidden;
  box-shadow: 0px 0px 0px 4px #ffffff;
  border-bottom: none;
  box-sizing: border-box;
  color: #19062c;
}
.dial.white {
  color: #fff;
}

.dial > span {
  text-align: center;
  font-family: sans-serif;
}

.dial > .arrow {
  position: absolute;
  left: calc(50% - 0.25rem);
  bottom: 0;
  width: 0.5rem;
  height: calc(100% + -20px);
  background-color: transparent;
  transform-origin: bottom center;
  transform: rotate(-90deg);
  transition: transform 1s;
}

.dial > .arrow:after {
  content: "";
  border-left: 0.5rem solid transparent;
  border-right: 0.5rem solid transparent;
  border-top: 0.5rem solid #ffffff;
  position: absolute;
  left: calc(50% - 0.5rem);
  top: 0;
  width: 0;
  height: 0;
  transition: border-color 0.25s;
  transform: rotate(180deg);
}

.dial.white > .arrow:after {
  border-top-color: #fff;
}

.gauge-labels {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 3;
}

.label {
  position: absolute;
  font-size: 0.75rem;
  color: #fff;
  white-space: nowrap;
  text-align: center;
}

.bg-night {
  background-color: #00e400;
}
.bg-medium {
  background-color: #ffff00;
}
.bg-unhealthy {
  background-color: #ff7e00;
}
.bg-danger {
  background-color: red;
}
.bg-very-not-cold {
  background-color: #8f3f97;
}

.bg-unhealthy-group {
  background-color: #7e0023;
}

.pd-nearest {
  padding: 3px 10px;
  border: 1.5px solid #b5ace2b1;
  text-align: left;
  width: 88px;
  background-color: #e7e8ea;
}
</style>
