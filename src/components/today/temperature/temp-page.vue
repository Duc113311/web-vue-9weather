<template>
  <div class="w-full">
    <!--  -->
    <BaseComponent>
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <img
            src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
            width="24"
            alt=""
          />
          <div v-if="wardParam.country_key === 'vn'">
            <span v-if="wardParam?.city && !wardParam?.district">{{
              $t(`{city}_Weather`, {
                city: $t(`city.city_${languageParam}.${wardParam?.city_key}`),
              })
            }}</span>
            <span
              v-if="wardParam?.city && wardParam?.district && !wardParam?.ward"
              >{{
                convertCapitalizeWords(
                  $t(`{city}_Weather`, {
                    city: $t(
                      `${convertToSlugCity(
                        wardParam?.city
                      )}.${convertToSlugCity(
                        wardParam?.city
                      )}_${languageParam}.${convertToLowCase(
                        wardParam?.district_key
                      )}`
                    ),
                  })
                )
              }}</span
            >

            <span
              v-if="wardParam?.city && wardParam?.district && wardParam?.ward"
              >{{
                convertCapitalizeWords(
                  $t(`{city}_Weather`, {
                    city: $t(
                      `${convertToSlugCity(
                        wardParam?.city
                      )}.${convertToSlugCity(
                        wardParam?.city
                      )}_${languageParam}.${convertToLowCase(
                        wardParam?.ward_key
                      )}`
                    ),
                  })
                )
              }}</span
            >
          </div>

          <span v-else-if="wardParam.country_key === 'us'">{{
            $t(`{city}_Weather`, {
              city: $t(`${wardParam?.state}`),
            })
          }}</span>
          <span v-else>{{
            $t(`{city}_Weather`, {
              city: $t(`${wardParam?.state}`),
            })
          }}</span>
        </div>
      </template>

      <div class="w-full">
        <HeaderTemp
          :currentlyData="currentlyData"
          :dailyOneData="dailyOneData"
        ></HeaderTemp>
        <!--  -->
        <TabNavigation @onChangeTabChart="onChangeTabChart"></TabNavigation>
        <!--  -->
        <div class="w-auto h-[368px]">
          <ChartTempRain
            :key="indexKey + Math.random()"
            v-show="indexChart === 0"
          ></ChartTempRain>
          <UvChartPage
            :key="indexKey + Math.random()"
            v-show="indexChart === 1"
          >
          </UvChartPage>
          <WindChartPage
            :key="indexKey + Math.random()"
            v-show="indexChart === 2"
          >
          </WindChartPage>
          <HumidChartPage
            :key="indexKey + Math.random()"
            v-show="indexChart === 3"
          ></HumidChartPage>
          <PressureChartPage
            :key="indexKey + Math.random()"
            v-show="indexChart === 4"
          ></PressureChartPage>
        </div>

        <!--  -->
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import HeaderTemp from "./header-temp.vue";
import TabNavigation from "./tab-navigation.vue";
import ChartTempRain from "./chart-temp-rain.vue";
import { mapGetters, mapMutations } from "vuex";
import UvChartPage from "../uv-chart/uv-chart-page.vue";
import WindChartPage from "../wind-chart/wind-chart-page.vue";
import HumidChartPage from "../humid-chart/humid-chart-page.vue";
import PressureChartPage from "../pressure-chart/pressure-chart-page.vue";
import removeAccents from "remove-accents";
import { capitalizeWords } from "@/utils/converValue";

export default {
  name: "temp-page",

  components: {
    BaseComponent,
    HeaderTemp,
    TabNavigation,
    ChartTempRain,
    UvChartPage,
    WindChartPage,
    HumidChartPage,
    PressureChartPage,
  },

  computed: {
    ...mapGetters("weatherModule", ["currentlyGetters", "dailyOneGetters"]),

    ...mapGetters("commonModule", ["indexComponentGetters"]),

    currentlyData() {
      return this.currentlyGetters;
    },

    dailyOneData() {
      return this.dailyOneGetters;
    },

    indexState() {
      debugger;
      return this.$store.state.commonModule.indexComponent;
    },

    wardParam() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      const resultData = retrievedArray
        ? retrievedArray
        : this.breadcumsObjectGetters;

      return resultData;
    },

    languageParam() {
      debugger;
      const languageRouter = this.$route.params;
      return Object.keys(languageRouter).length !== 0
        ? languageRouter.language
        : this.$i18n.locale;
    },
  },

  data() {
    return {
      indexChart: 0,
      indexKey: 0,
    };
  },

  methods: {
    ...mapMutations("commonModule", ["setIndexComponent"]),
    convertCapitalizeWords(value) {
      return capitalizeWords(value);
    },
    convertToLowCase(value) {
      const normalizedStr = value
        .normalize("NFD") // Chuyển chuỗi sang dạng tổ hợp Unicode
        .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ các dấu

      return normalizedStr;
    },
    convertToSlugCity(str) {
      const slug = removeAccents(str);
      debugger;
      return slug
        .toLowerCase() // Chuyển thành chữ thường
        .replace(/\s+/g, ""); // Xóa khoảng trắng
    },
    onChangeTabChart(value) {
      this.indexChart = value;
      this.indexKey = this.indexKey + 1;

      // this.setIndexComponent(this.indexKey);
    },
  },
};
</script>
<style lang=""></style>
