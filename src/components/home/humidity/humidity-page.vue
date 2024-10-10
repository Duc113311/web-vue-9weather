<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="w-full flex items-center justify-between">
      <div class="flex justify-start items-center">
        <img src="../../../assets/images/svg/ic_humidity.svg" alt="" />
        <div class="txt_bold ml-2 txt_color_uv">
          <span>{{ $t("Humidity") }}</span>
        </div>
      </div>
      <div>
        <img src="../../../assets/images/svg/gg_info.svg" alt="" />
      </div>
    </div>

    <div class="w-full flex justify-start pad-option">
      <div class="text-left">
        <div class="txt_regular_title">
          <span>{{ Math.round(paramCurrently?.humidity * 100) }}%</span>
        </div>
        <div class="txt_light">
          <span>
            {{
              $t("The_dew_point_is_{number}°_right_now", {
                number: Math.round(paramCurrently?.dewPoint),
              })
            }}
          </span>
        </div>
      </div>
    </div>

    <!--  -->
  </div>
</template>
<script>
export default {
  name: "humidity-page",

  data() {
    return {
      valueHumidity: 50,
    };
  },

  computed: {
    paramCurrently() {
      return this.$store.state.getWeather.currently;
    },
  },

  methods: {},
};
</script>
<style lang="scss"></style>
