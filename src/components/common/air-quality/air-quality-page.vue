<template>
  <div class="w-full">
    <BaseComponent>
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_Air_quality.svg"
            width="24"
            alt=""
            srcset=""
          />
          <p>Air Quality</p>
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
  name: "air-quality-page",
  components: {
    BaseComponent,
  },

  data() {
    return {};
  },
};
</script>
<style lang="scss"></style>
