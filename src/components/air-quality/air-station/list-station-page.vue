<template>
  <div class="w-full h-full">
    <BaseComponent>
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
            <span class="txt_medium_14">Air station near by</span>
          </div>
        </div>
      </template>

      <div class="w-full h-[280px] show-scroll pt-1 pb-1">
        <!--  -->
        <div class="flex flex-col gap-4 w-full h-full pb-4">
          <div
            class="w-full h-full"
            v-for="(item, index) in renderAir"
            :key="index"
          >
            <div class="flex w-full justify-between gap-2 items-center">
              <div
                class="w-[30px] flex justify-center items-center h-[30px] rounded-full"
                :style="{ backgroundColor: getAQIColorItem(item.v) }"
              >
                <p class="txt_regular_12 text-station">{{ item.v }}</p>
              </div>
              <div class="text-left w-[calc(100%-130px)] pl-2 pr-2">
                <p class="txt_medium_14 text-left">{{ item.nlo }}</p>
              </div>
              <div class="flex items-center gap-1">
                <p class="txt_regular_14">
                  {{ convertHaversineItem(item).toFixed(2) }} km
                </p>
                <img
                  src="../../../assets/images/svg_v2/ic_distance_svgrepo_com.svg"
                  alt=""
                  srcset=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import { convertHaversine, getAQIColor } from "@/utils/converValue";
import { decodeBase64 } from "@/utils/EncoderDecoderUtils";

export default {
  name: "list-station-page",

  components: {
    BaseComponent,
  },
  data() {
    return {
      listStation: [2, 3, 4, 6, 7, 8],
    };
  },

  computed: {
    renderAir() {
      const storageAir = localStorage.getItem("airObject");
      if (storageAir) {
        const airObject = decodeBase64(storageAir);
        const decodeAirObject = JSON.parse(airObject);
        return decodeAirObject.nearest ? decodeAirObject.nearest : [];
      }
      return this.$store.state.airQualityModule.airObject.nearest
        ? this.$store.state.airQualityModule.airObject.nearest
        : [];
    },

    wardParam() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.breadcumsObjectGetters;

      return resultData;
    },
  },

  methods: {
    getAQIColorItem(value) {
      return getAQIColor(value);
    },

    convertHaversineItem(value) {
      const position = this.wardParam;
      return convertHaversine(
        position.latitude,
        position.longitude,
        value.g[0],
        value.g[1]
      );
    },
  },
};
</script>
<style lang="scss">
.text-station {
  color: #0e2950;
}
</style>
