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
    </div>

    <div class="text-left w-full txt_regular_des">
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
