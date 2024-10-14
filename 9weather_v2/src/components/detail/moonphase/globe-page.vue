<template>
  <div class="w-full h-full">
    <!--  -->
    <div
      class="w-full h-full flex flex-col lg:flex-row justify-between items-center mb-6"
    >
      <div class="w-full h-full">
        <div class="flex w-full h-auto mar-b">
          <!--  -->
          <moonPhase class="w-full h-full" />
        </div>

        <div class="w-full h-auto flex flex-wrap gap-4">
          <div class="pad-form-radios bg-cate h-full w-[52rem] card">
            <!--  -->
            <moonPhaseCalendar />
          </div>
          <div class="w-[300px] bg-ads h-full">
            <!--  -->
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-[200px] flex justify-center items-center mb-6 mt-6">
      <div class="bg-ads-1 bg-ads w-full h-full">
        <!-- Ads -->
      </div>
    </div>
  </div>
</template>
<script>
import MoonPhase from "../../home/moon-phase/HorizontalScrollMoonPhase.vue";
import MoonPhaseCalendar from "../../home/moon-phase/calendarMoonPhase.vue";

export default {
  name: "globe-page",
  components: { moonPhase: MoonPhase, moonPhaseCalendar: MoonPhaseCalendar },
  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang="scss">
.bg-cate {
  background-color: rgb(37 54 77 / 95%);
  color: white;
}
.bg-ads-1 {
  background-image: url("../../../assets/images/png/photo_2024-08-20_15-46-47.jpg");
}
</style>
