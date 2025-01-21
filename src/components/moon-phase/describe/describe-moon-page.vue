<template>
  <div class="w-full h-full">
    <BaseComponent :isShowPad="true">
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <component :is="IcMoonphase"></component>
          <p class="txt_medium_14">Describe moon phase</p>
        </div>
      </template>
      <div class="w-full flex gap-2 flex-col">
        <p class="txt_regular_14 text-left">
          The Third Quarter Moon, also known as the Last Quarter Moon, is a
          phase where the moon appears half-illuminated, but unlike the First
          Quarter, the left side of the moon is lit while the right side is in
          darkness. This phase occurs about three weeks after the New Moon and
          is the last major phase before the moon returns to a new cycle.
        </p>
        <p class="txt_regular_14 text-left">
          During the Third Quarter, the moon rises around midnight and sets
          around noon. This phase is associated with reflection, review, and
          letting go. It’s a time to evaluate your recent actions, release what
          no longer serves you, and prepare for the upcoming New Moon and a new
          cycle of growth and intentions.
        </p>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import IcMoonphase from "@/components/icons/IcMoonphase.vue";
import { markRaw } from "vue";

export default {
  name: "describe-moon-page",
  components: {
    BaseComponent,
  },

  data() {
    return {
      IcMoonphase: markRaw(IcMoonphase),
    };
  },
};
</script>
<style lang=""></style>
