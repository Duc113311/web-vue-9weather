<template>
  <div class="w-full">
    <!--   -->
    <div class="flex items-center text-left gap-2 text-white mt-2">
      <img
        src="../../../assets/images/svg_v2/ic_cloud_sun.svg"
        width="24"
        alt=""
      />
      <span>New York, USA</span>
    </div>
    <BaseComponent v-for="(item, index) in hourly24hGettersValues" :key="index">
      <div class="w-full">
        <!--  -->
        <div
          @click="onClickShowDetailCard(index)"
          class="flex justify-between items-center w-full"
        >
          <!--  -->
          <div class="flex items-center">
            <p class="w-[100px] text-left">
              <span class="txt_medium">15:00</span>
            </p>

            <p>Light Rain</p>
          </div>

          <div class="flex items-center">
            <div class="flex items-center gap-2 mr-4">
              <img
                src="../../../assets/images/svg_v2/ic_cloud_rain.svg"
                alt=""
              />
              <p>33°C</p>
            </div>
            <div>
              <img
                id="chevron"
                src="../../../assets/images/svg_v2/ic_chevron_right.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div
          v-if="index === valueChoose"
          class="w-full flex items-center justify-between pt-6 pb-4 pr-11"
        >
          <div class="w-[50%] flex flex-col gap-4 bor-rim-r pr-6">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-2">
                <img
                  src="../../../assets/images/svg_v2/ic_Temp.svg"
                  alt=""
                  srcset=""
                />
                <p>Temperation</p>
              </div>

              <div class="flex items-center">
                <div class="flex items-center">
                  <img
                    src="../../../assets/images/svg_v2/ic_temperature_max.svg"
                    alt=""
                  />
                  <p>33°C</p>
                </div>
                <div class="flex items-center">
                  <img
                    src="../../../assets/images/svg_v2/ic_temperature_min.svg"
                    alt=""
                  />
                  <p>33°C</p>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img
                  src="../../../assets/images/svg_v2/ic_smile.svg"
                  alt=""
                  srcset=""
                />
                <p>Feel Like</p>
              </div>
              <div class="flex items-center">
                <p>33°C</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img
                  src="../../../assets/images/svg_v2/ic_UV_index.svg"
                  alt=""
                  srcset=""
                />
                <p>UV Index</p>
              </div>
              <div class="flex items-center">
                <p>33°C</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img
                  src="../../../assets/images/svg_v2/ic_precititation.svg"
                  alt=""
                  srcset=""
                />
                <p>Precipitation</p>
              </div>
              <div class="flex items-center">
                <p>100%</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img
                  src="../../../assets/images/svg_v2/ic_droplet.svg"
                  alt=""
                  srcset=""
                />
                <p>Rainfall</p>
              </div>
              <div class="flex items-center">
                <p>11.8 mm</p>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img
                  src="../../../assets/images/svg_v2/ic_Air_quality.svg"
                  alt=""
                  srcset=""
                />
                <p>Air Quality</p>
              </div>
              <div class="flex items-center">
                <p>165 (Moderate)</p>
              </div>
            </div>
          </div>

          <!--  -->

          <div class="w-[50%] flex flex-col gap-4 pl-6">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-2">
                <img
                  src="../../../assets/images/svg_v2/ic_wind.svg"
                  alt=""
                  srcset=""
                />
                <p>Wind speed</p>
              </div>

              <div class="flex items-center">
                <p>6.91 (mi/h)</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img
                  src="../../../assets/images/svg_v2/ic_wind_flag_svgrepo.svg"
                  alt=""
                  srcset=""
                />
                <p>Wind direction</p>
              </div>
              <div class="flex items-center">
                <p>SE</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img
                  src="../../../assets/images/svg_v2/ic_cloud_fog.svg"
                  alt=""
                  srcset=""
                />
                <p>Cloud cover</p>
              </div>
              <div class="flex items-center">
                <p>0%</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img
                  src="../../../assets/images/svg_v2/ic_pressure.svg"
                  alt=""
                  srcset=""
                />
                <p>Pressure</p>
              </div>
              <div class="flex items-center">
                <p>1012.0 (mbar)</p>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img
                  src="../../../assets/images/svg_v2/ic_weather_svgrepo_com.svg"
                  alt=""
                  srcset=""
                />
                <p>Sunrise</p>
              </div>
              <div class="flex items-center">
                <p>6:15 (AM)</p>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img
                  src="../../../assets/images/svg_v2/ic_weather_svgrepo_com_sunset.svg"
                  alt=""
                  srcset=""
                />
                <p>Sunset</p>
              </div>
              <div class="flex items-center">
                <p>5:55 (PM)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import { mapGetters } from "vuex";

export default {
  name: "item-time-24h",

  components: {
    BaseComponent,
  },
  data() {
    return {
      valueChoose: -1,
      isRotated: false,
    };
  },

  computed: {
    ...mapGetters("weatherModule", ["hourly24hGetters"]),

    hourly24hGettersValues() {
      return [1, 2, 3, 4, 5, 6, 7, 8];
    },
  },

  methods: {
    onClickShowDetailCard(value) {
      const chevron = document.getElementById("chevron");
      if (this.isRotated) {
        chevron.style.transform = "rotate(0deg)"; // Trở về hướng ban đầu
      } else {
        chevron.style.transform = "rotate(90deg)"; // Xoay xuống dưới
      }
      this.isRotated = !this.isRotated; // Đảo ngược trạng thái

      if (this.valueChoose === value) {
        this.valueChoose = -1;
      } else {
        this.valueChoose = value;
      }
    },
  },
};
</script>
<style lang="scss"></style>
