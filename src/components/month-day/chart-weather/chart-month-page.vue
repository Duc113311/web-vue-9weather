<template>
  <div class="w-full h-full">
    <BaseComponent :height="heightAuto">
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
            width="24"
            alt=""
          />
          <span>{{ $t("temperature") }}</span>
        </div>
      </template>

      <div class="w-full gap-4">
        <div class="w-auto h-[374px]">
          <!-- <ChartTempRain></ChartTempRain> -->
          <div class="w-full relative h-full">
            <div class="w-full h-full relative">
              <vue-horizontal
                responsive
                :displacement="0.7"
                class="w-full h-full relative horizontal"
              >
                <div>
                  <ChartTimeIcon></ChartTimeIcon>

                  <!--  -->

                  <ChartTempMaxMin></ChartTempMaxMin>

                  <!--  -->
                  <ChartChanceOfRain></ChartChanceOfRain>

                  <!--  -->

                  <ChartPrecipitation></ChartPrecipitation>
                </div>
              </vue-horizontal>

              <div class="absolute w-full bottom-0 left-0 flex justify-between">
                <div class="flex items-center text-left gap-2">
                  <div class="bg-temp-c rounded-full w-[15px] h-[15px]"></div>
                  <span class="txt_regular_des">{{ $t("temperature") }}</span>
                </div>
                <div class="flex items-center text-left gap-2">
                  <div class="bg-rain-c rounded-full w-[15px] h-[15px]"></div>
                  <span class="txt_regular_des">{{
                    $t("Chance_of_rain")
                  }}</span>
                </div>
                <div class="flex items-center text-left gap-2">
                  <div
                    class="bg-rainfall-c rounded-full w-[15px] h-[15px]"
                  ></div>
                  <span class="txt_regular_des">{{ $t("precipitation") }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--  -->
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import ChartTimeIcon from "./chart-time-icon.vue";
import ChartTempMaxMin from "./chart-temp-max-min.vue";
import VueHorizontal from "vue-horizontal";
import ChartChanceOfRain from "./chart-chance-of-rain.vue";
import ChartPrecipitation from "./chart-precipitation.vue";

export default {
  name: "chart-month-page",

  components: {
    BaseComponent,
    ChartTimeIcon,
    ChartTempMaxMin,
    VueHorizontal,
    ChartChanceOfRain,
    ChartPrecipitation,
  },
  data() {
    return {
      heightAuto: "auto",
    };
  },

  methods: {},
};
</script>
<style scoped>
.horizontal >>> .v-hl-btn-prev {
  display: none !important;
  left: 10px !important;
}
.horizontal >>> .v-hl-btn-next {
  display: none !important;

  right: 10px !important;
}
.horizontal:hover >>> .v-hl-btn-prev {
  display: flex !important;
  left: 10px !important;
  opacity: 0.5;
}

.horizontal:hover >>> .v-hl-btn-next {
  display: flex !important;
  right: 10px !important;
  opacity: 0.5;
}

.bg-temp-c {
  background-color: #ec9d00;
}

.bg-rain-c {
  background-color: #39e4f2;
}

.bg-rainfall-c {
  background-color: #327cee;
}
</style>
