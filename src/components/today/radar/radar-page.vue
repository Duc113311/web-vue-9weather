<template>
  <div class="w-full">
    <!--  -->
    <BaseComponent>
      <!--  -->
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_radar.svg"
            width="24"
            alt=""
          />
          <span>Radar</span>
        </div>
      </template>
      <div class="w-full h-[378px]">
        <!--  -->
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";

export default {
  name: "radar-page",

  components: {
    BaseComponent,
  },

  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang="scss"></style>
