<template>
  <div class="w-full">
    <ItemComponent>
      <template v-slot:header>
        <div class="flex justify-between items-center">
          <div class="flex items-center text-left gap-2">
            <img
              src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
              width="24"
              alt=""
            />
            <span>Top 100 city</span>
          </div>
          <div>
            <p>See more</p>
          </div>
        </div>
      </template>

      <div class="w-full h-[302px]">
        <!--  -->
        <div class="district-list">
          <DistrictCardPage
            v-for="(item, index) in districts"
            :key="index"
            :objectLocation="item"
          ></DistrictCardPage>
        </div>
      </div>
    </ItemComponent>
  </div>
</template>
<script>
import DistrictCardPage from "@/components/common/card/district-card-page.vue";
import ItemComponent from "@/components/common/itemComponent.vue";

export default {
  name: "list-nearby-location",

  components: {
    ItemComponent,
    DistrictCardPage,
  },
  data() {
    return {
      districts: [
        {
          name: "District name",
          condition: "Light Rain",
          lowTemp: 24,
          highTemp: 32,
        },
        {
          name: "District name",
          condition: "Light Rain",
          lowTemp: 24,
          highTemp: 32,
        },
        {
          name: "District name",
          condition: "Light Rain",
          lowTemp: 24,
          highTemp: 32,
        },
        {
          name: "District name",
          condition: "Light Rain",
          lowTemp: 24,
          highTemp: 32,
        },
        {
          name: "District name",
          condition: "Light Rain",
          lowTemp: 24,
          highTemp: 32,
        },
        {
          name: "District name",
          condition: "Light Rain",
          lowTemp: 24,
          highTemp: 32,
        },
        {
          name: "District name",
          condition: "Light Rain",
          lowTemp: 24,
          highTemp: 32,
        },
        {
          name: "District name",
          condition: "Light Rain",
          lowTemp: 24,
          highTemp: 32,
        },

        // ... thêm các district khác
      ],
    };
  },
};
</script>
<style lang="scss">
.district-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
}
</style>
