<template>
  <div class="w-full h-[298px]">
    <!--  -->
    <div class="c-temp text-left">
      <h2>29°</h2>
      <p>Clear day</p>
      <p>real Feel 33°C</p>
    </div>

    <!--  -->
    <div class="c-temp-row w-full flex justify-between items-center">
      <div class="temp-section temp-max-min w-auto b-flex bor-rim-r pad-l-r">
        <div class="h-flex flex items-center justify-center">
          <p>Temperature</p>
        </div>
        <div class="flex justify-center items-center">
          <div class="text-left flex">
            <img
              src="../../../assets/images/svg_v2/ic_temperature_max.svg"
              alt=""
              srcset=""
            />
            <span>33°C</span>
          </div>

          <div class="text-right flex">
            <img
              src="../../../assets/images/svg_v2/ic_temperature_min.svg"
              alt=""
              srcset=""
            />
            <span>33°C</span>
          </div>
        </div>
      </div>

      <div class="temp-section precipitation-c w-auto b-flex bor-rim-r pad-l-r">
        <div class="h-flex flex items-center justify-center">
          <p>Precipitation</p>
        </div>
        <div class="icon-c flex justify-center">
          <img
            src="../../../assets/images/svg_v2/ic_precititation.svg"
            width="24"
          />
        </div>
        <div class="text-c text-center items-center">
          <p>100%</p>
        </div>
      </div>

      <div class="temp-section precipitation-c w-auto b-flex bor-rim-r pad-l-r">
        <div class="h-flex flex items-center justify-center">
          <p>Rainfall</p>
        </div>
        <div class="icon-c flex justify-center">
          <img src="../../../assets/images/svg_v2/ic_droplet.svg" width="24" />
        </div>
        <div class="text-c text-center items-center">
          <p>11.8mm</p>
        </div>
      </div>
    </div>

    <!--  -->

    <div class="text-left w-full">
      <p>
        Today's weather features a slight chance of precipitation, with isolated
        showers possible in the afternoon. Expect mostly sunny skies with brief
        periods of light rain.
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "header-temp",

  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang="scss">
.temp-section {
  flex: 1;
  min-width: 0; // This prevents flex items from overflowing
  padding: 10px; // Adjust as needed
  border-right: 1px solid #ccc; // Adjust color as needed

  &:last-child {
    border-right: none; // Remove border from the last item
  }
}
</style>
