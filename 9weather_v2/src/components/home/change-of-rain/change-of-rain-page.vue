<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="w-full flex items-center justify-between">
      <div class="flex justify-start items-center">
        <img src="../../../assets/images/svg/ic chance-of-rain.svg" alt="" />
        <div class="txt_bold ml-2 txt-v2">
          <span>{{ $t("Chance_of_rain") }}</span>
        </div>
      </div>
    </div>
    <!--  -->

    <div class="w-full flex justify-start 2xl:pt-5 lg:pt-0 pt-5">
      <div class="text-left">
        <div class="txt_regular_title">
          <span>{{ paramCurrently?.precipProbability * 100 }}%</span>
        </div>
      </div>
    </div>

    <!--  -->
    <div class="w-full relative">
      <div class="chart-container">
        <div class="chart">
          <div
            v-for="(value, index) in paramHourly"
            :key="index"
            class="bar"
            :style="{
              '--size':
                value.precipProbability === 0
                  ? 5 + '%'
                  : value.precipProbability * 100 + '%',
            }"
          ></div>
        </div>
      </div>
    </div>

    <!--  -->
  </div>
</template>
<script>
export default {
  name: "change-of-rain-page",

  data() {
    return {
      valueRain: "50",
    };
  },

  computed: {
    paramCurrently() {
      return this.$store.state.getWeather.currently;
    },
    paramHourly() {
      return this.$store.state.getWeather.hourly;
    },
  },

  methods: {},
};
</script>
<style lang="scss">
.chart {
  width: 100%;
  height: 48px;
  display: flex;
  gap: 1px;
  align-items: flex-end;
  justify-content: space-between;
}

.bar {
  width: 5px;
  background-color: rgba(0, 225, 255, 0.3);
  transition: background-color 0.3s;
}
@media (min-width: 576px) {
  .bar {
    width: 6px;
  }
}

@media (min-width: 768px) {
  .bar {
    width: 6px;
  }
}

@media (min-width: 992px) {
  .bar {
    width: 6px;
  }
}

@media (min-width: 1200px) {
  .bar {
    width: 6.45px;
  }
}

@media (min-width: 1400px) {
  .bar {
    width: 6.45px;
  }
}
.bar:hover {
  background-color: #45a049;
}

.bar {
  height: var(--size);
}
</style>
