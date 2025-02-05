<template>
  <div class="w-full h-full">
    <!--  -->
    <BaseComponent :isShowPad="true">
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <component :is="srcDaytime"></component>
          <p class="txt_medium_14">{{ $t("Moon_Parameters") }}</p>
        </div>
      </template>
      <div class="w-full text-left">
        <div class="w-full text-left pt-4 pb-2">
          <span class="txt_poppins_24">
            {{ objectMoonNewParam.moonPhase }}
          </span>
        </div>
        <!--   -->

        <div class="w-full text-left flex flex-col gap-2 mt-2">
          <div class="flex justify-between items-baseline">
            <p class="txt_regular_12">Illumination</p>
            <p class="txt_regular_12">
              {{ objectMoonNewParam?.infoMoonPhaseDay?.illumination }}%
            </p>
          </div>
          <div class="flex justify-between items-baseline">
            <p class="txt_regular_12">Moonset</p>
            <p class="txt_regular_12">
              {{ objectMoonNewParam?.infoMoonPhaseDay?.moonset }}
            </p>
          </div>
          <div class="flex justify-between items-baseline">
            <p class="txt_regular_12">Moonrise</p>
            <p class="txt_regular_12">
              {{ objectMoonNewParam?.infoMoonPhaseDay?.moonrise }}
            </p>
          </div>
          <div class="flex justify-between items-baseline">
            <p class="txt_regular_12">Next New Moon</p>
            <p class="txt_regular_12">
              {{ objectMoonNewParam?.infoMoonPhaseDay?.nextNewMoon }}
            </p>
          </div>
          <div class="flex justify-between items-baseline">
            <p class="txt_regular_12">Next full moon</p>
            <p class="txt_regular_12">
              {{ objectMoonNewParam?.infoMoonPhaseDay?.nextFullMoon }} days
            </p>
          </div>
          <div class="flex justify-between items-baseline">
            <p class="txt_regular_12">Moon Sign</p>
            <p class="txt_regular_12">
              {{ objectMoonNewParam?.infoMoonPhaseDay?.moonSign }}
            </p>
          </div>

          <div class="flex justify-between items-baseline">
            <p class="txt_regular_12">Distance</p>
            <p class="txt_regular_12">
              {{ objectMoonNewParam?.infoMoonPhaseDay?.distance }}
            </p>
          </div>
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import IcMoonphase from "@/components/icons/IcMoonphase.vue";
import { markRaw } from "vue";

export default {
  name: "form-moon-page",

  components: { BaseComponent },

  data() {
    return {
      srcDaytime: markRaw(IcMoonphase),
    };
  },

  props: {
    objectMoonNew: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    objectMoonNewParam() {
      return this.objectMoonNew;
    },
  },

  methods: {},
};
</script>
<style lang=""></style>
