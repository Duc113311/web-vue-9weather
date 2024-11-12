<template>
  <div class="w-full">
    <BaseComponent>
      <!--  -->
      <template v-slot:header>
        <div class="flex justify-between items-center">
          <div class="flex items-center text-left gap-2">
            <img
              src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
              width="24"
              alt=""
            />
            <span>Country</span>
          </div>
          <div>
            <p>See more</p>
          </div>
        </div>
      </template>

      <div class="w-full h-[302px]">
        <!--  -->
        <div class="flex justify-between items-center pb-2 pt-2">
          <div>Hồ chí minh</div>
          <img
            src="../../../assets/images/svg_v2/ic_rain_data.svg"
            width="24"
            alt=""
          />
        </div>
        <div class="flex justify-between items-center pb-2 pt-2">
          <div>Hồ chí minh</div>
          <img
            src="../../../assets/images/svg_v2/ic_rain_data.svg"
            width="24"
            alt=""
          />
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";

export default {
  name: "list-country-page",

  components: {
    BaseComponent,
  },
  data() {
    return {};
  },

  computed: {},
};
</script>
<style lang="scss"></style>
