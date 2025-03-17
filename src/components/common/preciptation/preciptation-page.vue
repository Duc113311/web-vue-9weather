<template>
  <div class="w-full">
    <BaseComponent>
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <!-- <IcPrecipitation class="icon-svg"></IcPrecipitation> -->
          <p class="txt_medium_14">Preciptation</p>
        </div>
      </template>
      <div class="w-full h-[184px]">
        <div class="w-full h-full flex justify-between gap-2">
          <div class="text-left h-[100px]">
            <p class="txt_bold_24">
              <!-- {{ Math.round(currentlyData.cloudCover * 100) }} -->
            </p>
            <!-- <p v-if="Math.round(currentlyData.cloudCover * 100) > 50">
              Light rain
            </p>
            <p class="txt_regular_12">Light rain Heavier rain soon</p> -->
          </div>
          <div class="h-full flex justify-center items-center">
            <IcPrecipitationHome></IcPrecipitationHome>
            <!-- <img
              src="../../../assets/images/svg_v2/ic_precip/20%.svg"
              alt=""
              srcset=""
            /> -->
          </div>
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import BaseComponent from "../baseComponent.vue";
import IcCloudyHome from "@/components/icons/IcCloudyHome.vue";
import IcPrecipitationHome from "@/components/icons/IcPrecipitationHome.vue";
// import IcPrecipitation from "@/components/icons/IcPrecipitation.vue";

export default {
  name: "preciptation-page",

  components: {
    // IcCloudyHome,
    BaseComponent,
    // IcPrecipitation,
    IcPrecipitationHome,
  },

  computed: {
    ...mapGetters("weatherModule", ["currentlyGetters"]),
    listHourly() {
      return this.$store.state.weatherModule.hourly24h;
    },
    currentlyData() {
      return this.currentlyGetters;
    },
  },
};
</script>
<style lang=""></style>
