<template>
  <div class="w-full">
    <BaseComponent>
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <IcPrecipitation class="icon-svg"></IcPrecipitation>
          <p class="txt_medium_14">Preciptation</p>
        </div>
      </template>
      <div class="w-full h-[180px]">
        <!--  -->
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "../baseComponent.vue";
import IcPrecipitation from "@/components/icons/IcPrecipitation.vue";

export default {
  name: "preciptation-page",

  components: {
    IcPrecipitation,
    BaseComponent,
  },
};
</script>
<style lang=""></style>
