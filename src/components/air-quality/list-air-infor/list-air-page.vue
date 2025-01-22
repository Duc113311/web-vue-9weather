<template>
  <div class="w-full">
    <ItemComponent>
      <!--  -->
      <template v-slot:header>
        <div class="flex justify-between items-center">
          <div class="flex items-center text-left gap-2">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.167 2V4M5.09717 4.92993L6.50717 6.33993M20.167 12H22.167M19.2371 4.92993L17.8271 6.33993M16.114 12.6501C16.237 11.9046 16.1464 11.1395 15.8527 10.4433C15.5589 9.74717 15.0739 9.14847 14.454 8.71654C13.834 8.28461 13.1044 8.03711 12.3496 8.00269C11.5948 7.96827 10.8457 8.14835 10.189 8.52206M13.167 22H7.16695C6.22092 21.9998 5.29436 21.7312 4.49487 21.2255C3.69539 20.7197 3.0558 19.9975 2.65038 19.1427C2.24496 18.288 2.09035 17.3358 2.20451 16.3966C2.31867 15.4575 2.69691 14.5701 3.29531 13.8373C3.89371 13.1046 4.6877 12.5567 5.58507 12.2572C6.48244 11.9577 7.44637 11.9189 8.36489 12.1454C9.28342 12.3718 10.1188 12.8542 10.7742 13.5366C11.4295 14.2189 11.8777 15.0731 12.067 16H13.167C13.9626 16 14.7257 16.3161 15.2883 16.8787C15.8509 17.4413 16.167 18.2044 16.167 19C16.167 19.7956 15.8509 20.5587 15.2883 21.1213C14.7257 21.6839 13.9626 22 13.167 22Z"
                stroke="var(--color-icon-df)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <div class="flex items-center txt_medium_14 text-left">
              <span>List air o3</span>
            </div>
          </div>
        </div>
      </template>

      <div class="w-full h-auto flex gap-4">
        <!--  -->
        <div
          class="w-[200px]"
          v-for="(item, index) in paramAqiPollutant"
          :key="index"
        >
          <!-- List -->
          <div class="cursor-pointer">
            <div class="district-card-air pad-smal">
              <div class="relative w-full h-full">
                <div class="absolute top-0 left-0">
                  <p
                    class="relative txt_medium_15"
                    v-html="convertHtmlAir(item.code)"
                  ></p>
                </div>
                <div class="absolute bottom-0 right-0">
                  <p class="txt_regular_17">
                    {{ decodeBase64Data(item.code) }}
                    <span class="txt_regular_14">µg/m3</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ItemComponent>
  </div>
</template>
<script>
import ItemComponent from "@/components/common/itemComponent.vue";
import { dataDecodeFirstPair, getAQIColor } from "@/utils/converValue";
import { decodeBase64 } from "@/utils/EncoderDecoderUtils";

export default {
  name: "list-air-page",

  components: {
    ItemComponent,
  },

  data() {
    return {
      aqi: 160,
      dialColor: "#00ff00",
      isWhiteText: false,
      dialAngle: 0,
    };
  },

  computed: {
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
      return this.$store.state.airQualityModule.airObject.nearest
        ? this.$store.state.airQualityModule.airObject
        : {};
    },
  },

  watch: {
    paramAirModule(newData) {
      return this.setDial(newData.aqi);
    },
  },

  methods: {
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

    getAQIColorItem(value) {
      return getAQIColor(value);
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
<style lang="scss">
.district-card-air {
  box-shadow: inset 0px 0px 56px var(--bg-compo-1),
    inset -50px -50px 100px 0px var(--bg-compo-2),
    inset 500px 500px 100px 0px var(--bg-compo-3);
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  height: 100px;
  list-style-type: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
