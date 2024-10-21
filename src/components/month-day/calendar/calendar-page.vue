<template>
  <div class="w-full h-full">
    <BaseComponent>
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
            width="24"
            alt=""
          />
          <span>Calendar</span>
        </div>
      </template>

      <div class="w-full gap-4 grid">
        <div class="w-[778px] h-full"></div>

        <!--  -->
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";

export default {
  name: "calendar-page",

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
