<template>
  <div class="w-full h-[345px]">
    <!--  -->
    <div class="c-temp text-left">
      <h2>29°</h2>
      <p>Clear day</p>
      <p>real Feel 33°C</p>
    </div>
    <!--  -->

    <div>
      <div class="flex justify-between items-center">
        <div class="flex items-center text-left">
          <img
            src="../../../assets/images/svg_v2/ic_UV_index.svg"
            width="24"
            alt=""
          />
          <p>UV</p>
        </div>
        <p>8 (high)</p>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center text-left">
          <img
            src="../../../assets/images/svg_v2/ic_precititation.svg"
            width="24"
            alt=""
          />
          <p>Precipitation</p>
        </div>
        <p>100%</p>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center text-left">
          <img
            src="../../../assets/images/svg_v2/ic_droplet.svg"
            width="24"
            alt=""
          />
          <p>Rainfall</p>
        </div>
        <p>11.8 mm</p>
      </div>
    </div>

    <div class="text-left w-full">
      <p>
        Cloudy skies with a cool breeze. Light showers are possible, so you
        might want to grab a light jacket before heading out.
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "infor-common",

  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang="scss"></style>
