<template>
  <div class="w-full">
    <!--  -->
    <BaseComponent>
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_cloud_rain_wind.svg"
            width="24"
            alt=""
            srcset=""
          />
          <p>{{ title }}</p>
        </div>
      </template>
      <InforFullCard></InforFullCard>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import InforFullCard from "./infor-full-card.vue";

export default {
  name: "temp-full-card",

  components: {
    BaseComponent,
    InforFullCard,
  },
  data() {
    return {};
  },

  props: {
    title: {
      type: String,
      default: "",
    },
  },

  computed: {},
};
</script>
<style lang="scss"></style>
