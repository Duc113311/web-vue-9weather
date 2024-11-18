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
            <span>Quận/ huyện lân cận</span>
          </div>
          <div
            v-if="
              renderListCityAllGetters.length !== 0 &&
              this.breadcumsObjectGetters.country === 'Vietnam'
            "
          >
            <p>See more</p>
          </div>
        </div>
      </template>

      <div
        class="w-full h-[302px]"
        v-if="
          renderListCityAllGetters.length !== 0 &&
          this.breadcumsObjectGetters.country === 'Vietnam'
        "
      >
        <!--  -->
        <div class="district-list">
          <DistrictCardPage
            v-for="(item, index) in renderListCityAllGetters"
            :key="index"
            :objectLocation="item"
          ></DistrictCardPage>
        </div>
      </div>
      <div class="h-[340px] bg-color text-white overflow-hidden pad-big" v-else>
        <div class="w-full h-full justify-center flex items-center">
          In development
        </div>
      </div>
    </ItemComponent>
  </div>
</template>
<script>
import DistrictCardPage from "@/components/common/card/district-card-page.vue";
import ItemComponent from "@/components/common/itemComponent.vue";
import { mapGetters } from "vuex";

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

  computed: {
    ...mapGetters("commonModule", [
      "listCityAllGetters",
      "breadcumsObjectGetters",
    ]),

    renderListCityAllGetters() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      debugger;
      console.log("retrievedArray", retrievedArray);

      // const cityLocation = retrievedArray
      //   ? retrievedArray
      //   : this.breadcumsObjectGetters;

      if (retrievedArray) {
        console.log("listCityAllGetters", this.listCityAllGetters);
        const findData = this.listCityAllGetters.find(
          (x) => x.keyLanguage === retrievedArray.keyLanguage
        );

        if (findData) {
          return findData.districtList.slice(0, 8);
        } else {
          return [];
        }
      } else {
        const findData = this.listCityAllGetters.find(
          (x) => x.nameCategory === this.breadcumsObjectGetters.city
        );
        return findData.districtList.slice(0, 8);
      }
    },
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
