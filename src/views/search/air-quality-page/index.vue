<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="container mt-5">
      <div class="header-h h-full w-full flex gap-20-px">
        <div class="left-hourly lg:w-[80%] w-full">
          <SkeletonLoader class="w-full h-[320px]"> </SkeletonLoader>
        </div>
        <div class="right-hourly w-[20%]">
          <div class="w-full h-full">
            <SkeletonLoader class="w-full h-[320px]"> </SkeletonLoader>
          </div>
        </div>
      </div>
    </div>

    <!--  -->
    <div class="container mt-5">
      <div class="lg:flex w-full h-full gap-20-px">
        <div class="left-hourly lg:w-[68%] w-full">
          <!-- O3, PM2.5, PM10 -->
          <div
            class="w-full"
            v-if="currentlyData && Object.keys(currentlyData).length < 0"
          >
            <!--  -->
          </div>
          <div v-else class="w-full h-[240px] mt-4">
            <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
          </div>
          <!-- Air station -->
          <div class="w-full gap-20-px mt-4 flex h-[310px]">
            <!--  -->
            <div class="w-[40%] h-full">
              <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
            </div>

            <div class="w-[60%] h-full">
              <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
            </div>
          </div>
        </div>

        <div class="right-hourly lg:w-[30%] w-full md:block hidden">
          <TempFullCard
            :key="indexState + Math.random()"
            v-if="currentlyData && Object.keys(currentlyData).length > 0"
          ></TempFullCard>
          <div v-else class="w-full h-full">
            <SkeletonLoader class="w-full h-[500px]"> </SkeletonLoader>
          </div>

          <div class="right-c pt-5 h-full w-full">
            <!--  -->
            <div class="flex justify-center items-center h-auto">
              <img
                src="../../../assets/images/png/ic_app_download.png"
                alt=""
                class="img-logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>
<script>
import TempFullCard from "@/components/common/temp-full/temp-full-card.vue";
import SkeletonLoader from "@/control-ui/SkeletonLoader/SkeletonLoader.vue";
import { mapGetters } from "vuex";

export default {
  name: "api-page",

  components: {
    SkeletonLoader,
    TempFullCard,
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters("weatherModule", ["currentlyGetters"]),

    currentlyData() {
      return this.currentlyGetters;
    },

    indexState() {
      debugger;
      return this.$store.state.commonModule.indexComponent;
    },
  },

  methods: {},
};
</script>
<style lang="scss"></style>
