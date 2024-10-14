<template>
  <div class="w-full">
    <BaseComponent>
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_fluent_emoji_high_contrast_sun.svg"
            width="24"
            alt=""
            srcset=""
          />
          <p>Sun</p>
        </div>
      </template>
      <div class="w-full h-[189px]">
        <!--  -->
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "../baseComponent.vue";

export default {
  name: "sun-page",
  components: {
    BaseComponent,
  },

  data() {
    return {};
  },
};
</script>
<style lang="scss"></style>
