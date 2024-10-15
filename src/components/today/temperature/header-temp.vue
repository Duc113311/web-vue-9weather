<template>
  <div class="w-full">
    <!--  -->
    <div class="c-temp text-left">
      <h2 class="txt_title_temp">29°</h2>
      <div class="txt_regular">Clear day</div>
      <div class="txt_regular_des">Real Feel 33°C</div>
    </div>

    <!--  -->
    <div class="c-temp-row w-full flex justify-between items-center">
      <div class="temp-section temp-max-min w-auto b-flex bor-rim-r pad-l-r">
        <div class="h-flex flex items-center justify-center pb-14">
          <p>Temperature</p>
        </div>
        <div class="flex justify-center items-center">
          <div class="text-left flex txt_medium gap-1">
            <img
              src="../../../assets/images/svg_v2/ic_temperature_max.svg"
              alt=""
              srcset=""
            />
            <span>33°C</span>
          </div>

          <div class="text-right flex txt_medium gap-1">
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
        <div class="icon-c flex justify-center p-4">
          <img
            src="../../../assets/images/svg_v2/ic_precititation.svg"
            width="24"
          />
        </div>
        <div class="text-c text-center items-center txt_medium">
          <p>100%</p>
        </div>
      </div>

      <div class="temp-section precipitation-c w-auto b-flex bor-rim-r pad-l-r">
        <div class="h-flex flex items-center justify-center">
          <p>Rainfall</p>
        </div>
        <div class="icon-c flex justify-center p-4">
          <img src="../../../assets/images/svg_v2/ic_droplet.svg" width="24" />
        </div>
        <div class="text-c text-center items-center txt_medium">
          <p>11.8mm</p>
        </div>
      </div>
    </div>

    <!--  -->

    <div class="text-left w-full pt-4 pb-4 txt_regular_des">
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
  border-right: 1px solid #ccc; // Adjust color as needed

  &:last-child {
    border-right: none; // Remove border from the last item
  }
}
</style>
