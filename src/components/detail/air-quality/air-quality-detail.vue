<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="w-full h-full flex flex-col lg:flex-row justify-between">
      <!--  -->

      <div class="w-full h-full">
        <!--  -->
        <div class="w-full flex justify-center items-center mb-6">
          <div class="w-full">
            <div class="flex flex-wrap gap-4">
              <div class="h-auto w-full flex gap-4">
                <!--  -->
                <div
                  v-if="renderAir.length !== 0"
                  class="pad-form-radios bg-from w-[650px] h-full card"
                >
                  <AqiWeather></AqiWeather>
                </div>

                <div v-else class="bg-from w-[650px] h-full card">
                  <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
                </div>
                <div
                  class="pad-form-radios bg-from w-[550px] h-full flex justify-center items-center card"
                >
                  <div class="flex flex-col gap-2 text-white">
                    <div
                      class="flex txt_regular items-center justify-between w-full gap-2 txt-v2"
                    >
                      <div
                        class="flex items-center justify-center rounded-full w-[50px]"
                      ></div>
                      <div class="w-[110px] flex justify-center items-center">
                        <div>
                          <p>{{ $t("US_AQI_Level") }}</p>
                        </div>
                      </div>
                      <div class="w-[90px] justify-center flex items-center">
                        <p>PM2.5</p>
                      </div>
                      <div
                        class="w-[250px] text-center justify-center flex items-center"
                      >
                        <p>{{ $t("Healthy_Recomendation") }}</p>
                      </div>
                    </div>
                    <!-- Good -->
                    <div
                      class="flex txt_light items-center justify-between w-full gap-2"
                    >
                      <div
                        class="img-note bg-good flex items-center justify-center rounded-full"
                      >
                        <img
                          src="../../../assets/images/svg/note_air/ic_face_good.svg"
                          alt=""
                        />
                      </div>
                      <div
                        class="pad-note bg-good w-[110px] flex justify-center border-radios-10 items-center"
                      >
                        <div>
                          <p>{{ $t("Good") }}</p>
                          <p>0 - 50</p>
                        </div>
                      </div>
                      <div
                        class="pad-note bg-good border-radios-10 w-[90px] justify-center flex items-center"
                      >
                        <p>0 - 12.0</p>
                      </div>
                      <div
                        class="pad-note border-radios-10 bg-default-note w-[250px] text-left flex items-center"
                      >
                        <p>
                          {{
                            $t(
                              "Air_quality_is_satisfactory_and_poses_little_or_no_risk"
                            )
                          }}
                        </p>
                      </div>
                    </div>
                    <!-- Moderate -->
                    <div
                      class="flex txt_light items-center justify-between w-full"
                    >
                      <div
                        class="img-note bg-moderate flex items-center justify-center rounded-full"
                      >
                        <img
                          src="../../../assets/images/svg/note_air/ic_face_good.svg"
                          alt=""
                        />
                      </div>
                      <div
                        class="pad-note bg-moderate w-[110px] flex justify-center border-radios-10 items-center"
                      >
                        <div>
                          <p>{{ $t("Moderate") }}</p>
                          <p>51 - 100</p>
                        </div>
                      </div>
                      <div
                        class="pad-note bg-moderate border-radios-10 flex w-[90px] justify-center items-center"
                      >
                        <p>12.1 - 35.4</p>
                      </div>
                      <div
                        class="pad-note border-radios-10 bg-default-note w-[250px] text-left flex items-center"
                      >
                        <p>
                          {{
                            $t(
                              "Sensitive_individuals_should_avoid_outdoor_activity_as_they_may_experience_respiraory_symtoms."
                            )
                          }}
                        </p>
                      </div>
                    </div>
                    <!-- Unhealthy Groups-->
                    <div
                      class="flex txt_light items-center justify-between w-full"
                    >
                      <div
                        class="img-note bg-unhealthy-group flex items-center justify-center rounded-full"
                      >
                        <img
                          src="../../../assets/images/svg/note_air/ic_face_good.svg"
                          alt=""
                        />
                      </div>
                      <div
                        class="pad-note bg-unhealthy-group flex justify-center w-[110px] border-radios-10 items-center"
                      >
                        <div>
                          <p>{{ $t("Unhealthy_for_Sensitive_Groups") }}</p>
                          <p>101 - 150</p>
                        </div>
                      </div>
                      <div
                        class="pad-note bg-unhealthy-group border-radios-10 flex w-[90px] justify-center items-center"
                      >
                        <p>35.5 - 55.4</p>
                      </div>
                      <div
                        class="pad-note border-radios-10 bg-default-note w-[250px] text-left flex items-center"
                      >
                        <p>
                          {{
                            $t(
                              "General_public_and_sensitive_individuals_in_particular_are_at_risk_to_experience_irritation_and_respiratory_problems."
                            )
                          }}
                        </p>
                      </div>
                    </div>
                    <!-- Unhealthy -->
                    <div
                      class="flex txt_light items-center justify-between w-full"
                    >
                      <div
                        class="img-note bg-unhealthy flex items-center justify-center rounded-full"
                      >
                        <img
                          src="../../../assets/images/svg/note_air/ic_face_good.svg"
                          alt=""
                        />
                      </div>
                      <div
                        class="pad-note bg-unhealthy flex justify-center w-[110px] border-radios-10 items-center"
                      >
                        <div>
                          <p>{{ $t("Unhealthy") }}</p>
                          <p>151 - 200</p>
                        </div>
                      </div>
                      <div
                        class="pad-note bg-unhealthy border-radios-10 flex w-[90px] justify-center items-center"
                      >
                        <p>55.5 - 150.4</p>
                      </div>
                      <div
                        class="pad-note border-radios-10 bg-default-note w-[250px] text-left flex items-center"
                      >
                        <p>
                          {{
                            $t(
                              "Increased_likelihood_of_adverse_effects_and_aggravation_to_the_heart_and_lungs_among_general_public."
                            )
                          }}
                        </p>
                      </div>
                    </div>
                    <!-- Very Unhealthy -->
                    <div
                      class="flex txt_light items-center justify-between w-full"
                    >
                      <div
                        class="img-note bg-very-unhealthy flex items-center justify-center rounded-full"
                      >
                        <img
                          src="../../../assets/images/svg/note_air/ic_face_good.svg"
                          alt=""
                        />
                      </div>
                      <div
                        class="pad-note bg-very-unhealthy justify-center flex w-[110px] border-radios-10 items-center"
                      >
                        <div>
                          <p>{{ $t("Very_Unhealthy") }}</p>
                          <p>201 - 250</p>
                        </div>
                      </div>
                      <div
                        class="pad-note bg-very-unhealthy border-radios-10 flex w-[90px] justify-center items-center"
                      >
                        <p>150.5 - 250.4</p>
                      </div>
                      <div
                        class="pad-note border-radios-10 bg-default-note w-[250px] text-left flex items-center"
                      >
                        <p>
                          {{
                            $t(
                              "General_public_will_be_noticwably_affected._Sensitive_groups_should_restrict_outdoor_activities."
                            )
                          }}
                        </p>
                      </div>
                    </div>
                    <!-- Hazadous -->
                    <div
                      class="flex txt_light items-center justify-between w-full"
                    >
                      <div
                        class="img-note bg-hazadous flex items-center justify-center rounded-full"
                      >
                        <img
                          src="../../../assets/images/svg/note_air/ic_face_good.svg"
                          alt=""
                        />
                      </div>
                      <div
                        class="pad-note bg-hazadous flex justify-center w-[110px] border-radios-10 items-center"
                      >
                        <div>
                          <p>{{ $t("Hazadous") }}</p>
                          <p>251 - 300</p>
                        </div>
                      </div>
                      <div
                        class="pad-note bg-hazadous border-radios-10 flex w-[90px] justify-center items-center"
                      >
                        <p>250.5+</p>
                      </div>
                      <div
                        class="pad-note border-radios-10 bg-default-note w-[250px] text-left flex items-center"
                      >
                        <p>
                          {{
                            $t(
                              "General_public_at_high_risk_of_experiencing_strong_irritations_and_adverse_healthy_effects._Should_avoid_outdoor_activities."
                            )
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <!--  -->
              </div>
              <div class="w-full h-[210px] flex gap-4">
                <div class="pad-form-radios bg-from h-full w-[650px] card">
                  <!--  -->
                  <div class="w-full h-full text-left">
                    <div class="w-full txt_medium txt-v2 pt-2 pb-2">
                      <p>{{ $t("Healthy_Information") }}</p>
                    </div>
                    <div class="txt_light_summer">
                      <p>
                        {{ getAqiHealthyInformationInfoItem(paramAirModule) }}
                      </p>
                    </div>
                    <div class="txt_medium pt-2 pb-2 txt-v2">
                      <p>{{ $t("Recommended_Precautions") }}</p>
                    </div>
                    <div class="txt_light_summer">
                      <p>
                        {{
                          getAqiRecommendedPrecautionsInfoItem(paramAirModule)
                        }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="pad-form-radios bg-from h-full w-[485px] card">
                  <!--  -->
                  <div class="w-full h-full text-left">
                    <div class="w-full txt_medium pt-2 pb-2 txt-v2">
                      <p>{{ $t("Primary_Pollutant") }}</p>
                    </div>
                    <div class="txt_light_summer pb-2">
                      <p>
                        {{ getStringPrimaryPollutantNameItem(paramAirModule) }}
                      </p>
                    </div>
                    <div class="txt_light_summer">
                      <p>
                        {{ getStringPrimaryPollutantInfoItem(paramAirModule) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex gap-4 w-full h-[500px]">
                <div class="pad-form-radios bg-from h-full w-[535px] card">
                  <!--  -->
                  <div class="w-full h-full text-left overflow-hidden">
                    <!--  -->
                    <div class="w-full txt_medium pt-2 pb-2 txt-v2">
                      {{ $t("Ari_station_list") }}
                    </div>
                    <div
                      class="w-full h-full overflow-scroll pb-6"
                      v-if="renderAir.length !== 0"
                    >
                      <div
                        v-for="(item, index) in renderAir"
                        :key="index"
                        class="flex w-full justify-between items-center p-2 txt_light_summer"
                      >
                        <div
                          class="w-[35px] flex justify-center items-center h-[35px] rounded-full"
                          :style="{ backgroundColor: getAQIColorItem(item.v) }"
                        >
                          <p>{{ item.v }}</p>
                        </div>
                        <!--  -->
                        <div class="text-left w-[calc(100%-130px)] pl-2 pr-2">
                          {{ item.nlo }}
                        </div>
                        <div class="flex items-center w-[100px]">
                          <img
                            src="../../../assets/images/svg/ic_distance.svg"
                            alt=""
                          />
                          <p>{{ convertHaversineItem(item).toFixed(2) }} km</p>
                        </div>
                      </div>
                    </div>
                    <div v-else class="w-full h-full overflow-scroll pb-6">
                      <SkeletonLoader class="w-full h-full"> </SkeletonLoader>
                    </div>
                  </div>
                </div>
                <div class="pad-form-radios bg-from h-full w-[600px] card">
                  <!--  -->
                  <div class="w-full h-full text-left">
                    <!--  -->
                    <GoogleMap
                      :api-key="AIzaSyCy9v8 - DMADL8RYMlp65ui4iky4Agr6vaA"
                      style="width: 100%; height: 100%"
                      :center="center"
                      :zoom="10"
                    >
                      <Marker
                        v-for="(item, index) in this.convertLocationAir(
                          renderAir
                        )"
                        :key="index"
                        :options="{ position: item }"
                      />
                    </GoogleMap>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>
<script>
import SkeletonLoader from "../../../control-ui/SkeletonLoader/SkeletonLoader.vue";

import AqiWeather from "@/components/home/uv-index/AqiWeather.vue";
import { GoogleMap, Marker } from "vue3-google-map";
import {
  convertHaversine,
  getAQIColor,
  getAqiHealthyInformationInfo,
  getAqiRecommendedPrecautionsInfo,
  getStringPrimaryPollutantName,
  getStringPrimaryPollutantInfo,
} from "../../../utils/converValue";
import { decodeBase64 } from "../../../utils/EncoderDecoderUtils";

export default {
  name: "air-quality-detail",

  components: {
    AqiWeather,
    Marker,
    GoogleMap,
    SkeletonLoader,
  },
  data() {
    return {
      center: { lat: 21.020424, lng: 105.806926 },
      center1: { lat: 21.0215063, lng: 105.8188748 },
    };
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    renderPosition() {},
    renderAir() {
      const storageAir = localStorage.getItem("airObject");
      if (storageAir) {
        const airObject = decodeBase64(storageAir);
        const decodeAirObject = JSON.parse(airObject);
        return decodeAirObject.nearest ? decodeAirObject.nearest : [];
      }
      return this.$store.state.getAqi.airObject.nearest
        ? this.$store.state.getAqi.airObject.nearest
        : [];
    },
    paramAirModule() {
      const storageAir = localStorage.getItem("airObject");
      if (storageAir) {
        const airObject = decodeBase64(storageAir);

        const decodeAirObject = JSON.parse(airObject);

        return decodeAirObject.aqi ? decodeAirObject.aqi : 0;
      }
      return this.$store.state.getAqi.airObject.aqi
        ? this.$store.state.getAqi.airObject.aqi
        : 0;
    },
  },

  methods: {
    convertHaversineItem(value) {
      const position = this.$store.state.getWeather.cityCountry;
      return convertHaversine(
        position.latitude,
        position.longitude,
        value.g[0],
        value.g[1]
      );
    },

    getAQIColorItem(value) {
      return getAQIColor(value);
    },
    getAqiHealthyInformationInfoItem(value) {
      return getAqiHealthyInformationInfo(value);
    },
    getAqiRecommendedPrecautionsInfoItem(value) {
      return getAqiRecommendedPrecautionsInfo(value);
    },
    getStringPrimaryPollutantNameItem(value) {
      return getStringPrimaryPollutantName(value);
    },
    getStringPrimaryPollutantInfoItem(value) {
      return getStringPrimaryPollutantInfo(value);
    },

    convertLocationAir(value) {
      const listNearest = value;
      const result = [];
      for (let index = 0; index < listNearest.length; index++) {
        const element = listNearest[index];
        const objectLocation = {
          lat: element.g[0],
          lng: element.g[1],
        };
        result.push(objectLocation);
      }

      return result;
    },
  },
};
</script>
<style lang="scss">
.pad-note {
  padding: 8px;
  background-color: aliceblue;
  // height: 60px;
}
.bg-good {
  background-color: #81d92b;
}
.bg-moderate {
  background-color: #fcdc32;
}
.bg-unhealthy-group {
  background-color: #ff8329;
}
.bg-unhealthy {
  background-color: #f83232;
}
.bg-very-unhealthy {
  background-color: #b21965;
}
.bg-hazadous {
  background-color: #845d6b;
}

.bg-default-note {
  background-color: #4087c7;
}
.img-note {
  width: 50px;
  height: 50px;
}
</style>
