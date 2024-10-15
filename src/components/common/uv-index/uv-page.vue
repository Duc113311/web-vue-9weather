<template>
  <div class="w-full">
    <BaseComponent>
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_UV_index.svg"
            width="24"
            alt=""
            srcset=""
          />
          <p>UV index</p>
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
  name: "uv-page",
  components: {
    BaseComponent,
  },

  data() {
    return {};
  },
};
</script>
<style lang="scss"></style>
