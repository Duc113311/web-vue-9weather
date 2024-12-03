<template>
  <div class="w-full h-full">
    <!-- -->
    <div class="container mt-5">
      <div class="header-m h-full lg:flex w-full gap-4">
        <div class="left-hourly lg:w-[70%] w-full">
          <!--  -->
          <RadarMapPage
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
            :overlayValue="overlayValue"
          ></RadarMapPage>
          <div v-else class="w-full h-[510px]">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
          <!--  -->
        </div>

        <div class="right-hourly lg:w-[30%] w-full lg:flex hidden">
          <!--  -->
          <TempFullCard
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
            :title="title"
          ></TempFullCard>
          <div v-else class="w-full h-[510px]">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="header-r h-full lg:flex w-full gap-4 mt-5">
        <div class="left-hourly lg:w-[70%] w-full">
          <!--  -->
          <OptionMapRadarPage
            @onStateValueMap="onChangeValueMap"
          ></OptionMapRadarPage>
        </div>

        <div class="right-hourly w-[30%] lg:flex hidden">
          <!--  -->
          <!-- <TempFullCard :title="title"></TempFullCard> -->
          <div>
            <img
              src="../../../assets/images/png/ic_app_download.png"
              alt=""
              class=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TempFullCard from "@/components/common/temp-full/temp-full-card.vue";
import OptionMapRadarPage from "@/components/radar/option-radar/option-map-radar-page.vue";
import RadarMapPage from "@/components/radar/weather-radar/radar-map-page.vue";
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import { mapGetters } from "vuex";

export default {
  name: "radar-weather",

  components: {
    TempFullCard,
    RadarMapPage,
    OptionMapRadarPage,
    SkeletonLoader,
  },
  data() {
    return {
      overlayValue: "temp",
      title: this.$t("Current_weather_today"),
    };
  },

  mounted() {},

  computed: {
    ...mapGetters("weatherModule", ["currentlyGetters"]),

    currentlyData() {
      return this.currentlyGetters;
    },
  },

  methods: {
    onChangeValueMap(value) {
      this.overlayValue = value;
    },
  },

  beforeRouteLeave(to, from, next) {
    window.location.replace(to.fullPath);
    next(); // Cho phép chuyển route
  },
};
</script>

<style lang="scss"></style>
