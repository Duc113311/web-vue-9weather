<template>
  <div class="w-full">
    <BaseComponent>
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <IcTitleCloudCover class="icon-svg"></IcTitleCloudCover>
          <p class="txt_medium_14">Cloud Cover</p>
        </div>
      </template>
      <div class="w-full h-[182px]">
        <!--  -->
        <div class="w-full h-full flex justify-between gap-2">
          <div class="text-left h-[100px]">
            <p class="txt_bold_24">
              {{ Math.round(currentlyData.cloudCover * 100) }}
            </p>
            <p v-if="Math.round(currentlyData.cloudCover * 100) > 50">
              Partly Sunny
            </p>
            <p class="txt_regular_12">
              Decreasing with mostly clear sky at 8:00 PM. Mostly clear sky
              expected in the evening.
            </p>
          </div>
          <div class="h-full flex justify-center items-center">
            <IcCloudyHome></IcCloudyHome>
          </div>
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import IcTitleCloudCover from "@/components/icons/IcTitleCloudCover.vue";
import BaseComponent from "../baseComponent.vue";
import IcCloudyHome from "@/components/icons/IcCloudyHome.vue";
import { mapGetters } from "vuex";

export default {
  name: "cloud-cover-page",

  components: {
    IcTitleCloudCover,
    BaseComponent,
    IcCloudyHome,
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
