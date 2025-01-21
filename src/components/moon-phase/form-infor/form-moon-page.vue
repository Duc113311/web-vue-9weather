<template>
  <div class="w-full h-full">
    <!--  -->
    <BaseComponent :isShowPad="true">
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <component :is="srcDaytime"></component>
          <p class="txt_medium_14">Moon phase Current</p>
        </div>
      </template>
      <div class="w-full text-left">
        <div class="w-full text-left pt-4 pb-2">
          <span class="txt_poppins_30"> FullMoon </span>
        </div>
        <div class="w-full text-left flex flex-col gap-2 mt-2">
          <p class="txt_regular_12">Thứ 3, 16:00</p>
        </div>

        <div class="w-full text-left flex flex-col gap-2 mt-2">
          <div class="flex justify-between items-baseline">
            <p class="txt_regular_12">Chiếu sáng</p>
            <p class="txt_regular_12">22%</p>
          </div>
          <div class="flex justify-between items-baseline">
            <p class="txt_regular_12">Moon rise</p>
            <p class="txt_regular_12">11:11PM</p>
          </div>
          <div class="flex justify-between items-baseline">
            <p class="txt_regular_12">Next full moon</p>
            <p class="txt_regular_12">5 days</p>
          </div>
          <div class="flex justify-between items-baseline">
            <p class="txt_regular_12">Phương vị</p>
            <p class="txt_regular_12">22%</p>
          </div>
          <div class="flex justify-between items-baseline">
            <p class="txt_regular_12">Mặt trăng lặn</p>
            <p class="txt_regular_12">22%</p>
          </div>
          <div class="flex justify-between items-baseline">
            <p class="txt_regular_12">Khoảng cách</p>
            <p class="txt_regular_12">22%</p>
          </div>
          <div class="flex justify-between items-baseline">
            <p class="txt_regular_12">Độ cao</p>
            <p class="txt_regular_12">22%</p>
          </div>
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import IcMoonphase from "@/components/icons/IcMoonphase.vue";
import { markRaw } from "vue";

export default {
  name: "form-moon-page",

  components: { BaseComponent },

  data() {
    return {
      srcDaytime: markRaw(IcMoonphase),
    };
  },

  computed: {},

  methods: {},
};
</script>
<style lang=""></style>
