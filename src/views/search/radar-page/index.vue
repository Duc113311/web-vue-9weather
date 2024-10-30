<template>
  <div class="w-full h-full">
    <!-- -->
    <div class="container mt-10 h-[500px]">
      <div class="header-m">
        <div class="left-hourly h-[400px]">
          <!--  -->
          <RadarMapPage
            v-if="currentlyData && Object.keys(currentlyData).length < 0"
            :overlayValue="overlayValue"
          ></RadarMapPage>
          <div v-else class="w-full h-[510px]">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
          <!--  -->
        </div>

        <div class="right-hourly h-full">
          <!--  -->
          <TempFullCard
            v-if="currentlyData && Object.keys(currentlyData).length < 0"
            :title="title"
          ></TempFullCard>
          <div v-else class="w-full h-[510px]">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-10 h-[500px]">
      <div class="header-r">
        <div class="left-hourly">
          <!--  -->
          <OptionMapRadarPage
            @onStateValueMap="onChangeValueMap"
          ></OptionMapRadarPage>
          <!-- <div class="w-[500px] h-[300px] bg-white"></div> -->
          <!--  -->
        </div>

        <div class="right-hourly h-full">
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
    debugger;
    window.location.replace(to.fullPath);
    next(); // Cho phép chuyển route
  },
};
</script>

<style lang="scss">
.header-r {
  display: grid;
  grid-template-columns: 5fr 2fr;
  gap: 16px;
}

.header-m {
  display: grid;
  grid-template-columns: 5fr 2fr;
  gap: 16px;
}
</style>
