<template>
  <div class="w-full">
    <BaseComponent>
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_UV_index.svg"
            width="24"
            alt=""
            srcset=""
          />
          <p>UV index</p>
        </div>
      </template>
      <div class="w-full h-[163px]">
        <!--  -->
        <div class="text-left">
          <div class="txt_bold">
            <span>8</span>
          </div>
          <div>
            <p>Moderate</p>
          </div>
          <div>
            <p>The air is mostly okay</p>
          </div>
        </div>
        <div class="w-full relative mt-2">
          <div class="chart-container">
            <div class="chart">
              <div
                v-for="(value, index) in paramHourly"
                :key="index"
                class="bar"
                :style="{
                  '--size': 100 + '%',
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "../baseComponent.vue";

export default {
  name: "uv-page",
  components: {
    BaseComponent,
  },

  data() {
    return {};
  },

  computed: {
    paramHourly() {
      console.log("hourly24h", this.$store.state.weatherModule.hourly24h);
      return this.$store.state.weatherModule.hourly24h;
    },
  },
};
</script>
<style lang="scss">
.chart {
  width: 100%;
  height: 80px;
  display: flex;
  gap: 1px;
  align-items: flex-end;
  justify-content: space-between;
}

.bar {
  width: 6px;
  background-color: #f5d400;
  transition: background-color 0.3s;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
    width: 9.45px;
  }
}
.bar:hover {
  background-color: #45a049;
}

.bar {
  height: var(--size);
}
</style>
