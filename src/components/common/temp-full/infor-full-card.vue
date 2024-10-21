<template>
  <div class="w-full">
    <!--  -->
    <div class="c-temp text-left">
      <h2 class="txt_title_temp mb-2">29°</h2>
      <div class="txt_regular">Clear day</div>
      <div class="txt_regular_des">Real Feel 33°C</div>
    </div>

    <!--  -->

    <div class="pt-4 pb-4 gap-2 flex-col flex">
      <div class="flex justify-between items-center">
        <div class="flex items-center text-left gap-2 txt_regular_des">
          <img
            src="../../../assets/images/svg_v2/ic_Temp.svg"
            width="24"
            alt=""
          />
          <p>Temperation</p>
        </div>
        <div class="flex items-center">
          <div class="flex items-center">
            <img
              src="../../../assets/images/svg_v2/ic_temperature_max.svg"
              alt=""
            />
            <p>33°C</p>
          </div>
          <div class="flex items-center">
            <img
              src="../../../assets/images/svg_v2/ic_temperature_min.svg"
              alt=""
            />
            <p>33°C</p>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center text-left gap-2 txt_regular_des">
          <img
            src="../../../assets/images/svg_v2/ic_UV_index.svg"
            width="24"
            alt=""
          />
          <p>UV</p>
        </div>
        <p class="txt_medium_des">8 (high)</p>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center text-left gap-2 txt_regular_des">
          <img
            src="../../../assets/images/svg_v2/ic_precititation.svg"
            width="24"
            alt=""
          />
          <p>Precipitation</p>
        </div>
        <p class="txt_medium_des">100%</p>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center text-left gap-2 txt_regular_des">
          <img
            src="../../../assets/images/svg_v2/ic_droplet.svg"
            width="24"
            alt=""
          />
          <p>Rainfall</p>
        </div>
        <p class="txt_medium_des">11.8 mm</p>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center text-left gap-2 txt_regular_des">
          <img
            src="../../../assets/images/svg_v2/ic_Air_quality.svg"
            width="24"
            alt=""
          />
          <p>Air Quality</p>
        </div>
        <p class="txt_medium_des">165 (Moderate)</p>
      </div>
    </div>

    <div class="text-left w-full txt_regular_des">
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
  name: "infor-full-card",

  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang="scss"></style>
