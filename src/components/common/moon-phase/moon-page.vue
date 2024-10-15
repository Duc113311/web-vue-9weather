<template>
  <div class="w-full">
    <BaseComponent>
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_moon.svg"
            width="24"
            alt=""
            srcset=""
          />
          <p>Moonphase</p>
        </div>
      </template>
      <div class="w-full h-[163px]">
        <!--  -->
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "../baseComponent.vue";

export default {
  name: "moon-page",
  components: {
    BaseComponent,
  },

  data() {
    return {};
  },
};
</script>
<style lang="scss"></style>
