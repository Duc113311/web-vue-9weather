<template>
  <div class="w-full h-full">
    <!-- -->
    <div class="container mt-10 h-[500px]">
      <div class="header-m">
        <div class="left-hourly">
          <!--  -->
          <RadarMapPage :overlayValue="overlayValue"></RadarMapPage>
          <!--  -->
        </div>

        <div class="right-hourly h-full">
          <!--  -->
          <TempFullCard :title="title"></TempFullCard>
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

export default {
  name: "radar-weather",

  components: {
    TempFullCard,
    RadarMapPage,
    OptionMapRadarPage,
  },
  data() {
    return {
      overlayValue: "temp",
    };
  },

  mounted() {},

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
