<template>
  <div class="w-full bg-unit">
    <!-- -->
    <div class="w-full">
      <!--  -->
      <div
        class="w-full cursor-pointer flex flex-col gap-0.5 text-left pt-4 pb-4"
      >
        <div class="txt_medium">
          <span>{{ $t("Daily_notification") }}</span>
        </div>
        <div class="txt_light_14">
          <span>{{
            $t(
              "Morning_and_afternoon_forecast_notification_for_any_location_you_follow"
            )
          }}</span>
        </div>
      </div>
      <div class="bor-bottom"></div>
      <div
        class="w-full cursor-pointer flex flex-col gap-0.5 text-left pt-4 pb-4"
      >
        <div class="txt_medium">
          <span>{{ $t("On_going_notification") }}</span>
        </div>
        <div class="txt_light_14">
          <span>{{
            $t(
              "Display_temperature_or_weather_conditions_in_status_bar_and_banner_in_drawer"
            )
          }}</span>
        </div>
      </div>
      <div class="bor-bottom"></div>
      <div class="w-full text-left pt-4 pb-4">
        <div class="flex justify-between items-center w-full">
          <div class="w-full cursor-pointer flex flex-col gap-0.5">
            <div class="txt_medium">
              <span>{{ $t("Next_Hour_Precipitation_Notification") }}</span>
            </div>
            <div class="flex justify-between items-center w-full">
              <div class="txt_light_14">
                <span>{{
                  $t("Alert_you_if_it_is_about_to_rain_or_snow")
                }}</span>
              </div>
            </div>
          </div>

          <div>
            <el-switch
              v-model="valueHour"
              style="
                --el-switch-on-color: #4d87d4;
                --el-switch-off-color: #c0c2c4b8;
              "
              size="large"
              active-value="100"
              inactive-value="0"
              @change="onChangeValueHour(valueHour)"
            />
          </div>
        </div>
      </div>
      <div class="bor-bottom"></div>
      <div class="w-full text-left pt-4 pb-4">
        <div class="flex justify-between items-center w-full">
          <div class="w-full cursor-pointer flex flex-col gap-0.5">
            <div class="txt_medium">
              <span>{{ $t("Temperature_Change_Notification") }}</span>
            </div>
            <div class="flex justify-between items-center w-full">
              <div class="txt_light_14">
                <span>
                  {{
                    $t(
                      "Notification_you_if_it_is_going_to_be_significantly_warmer_or_cooler_next_day"
                    )
                  }}
                </span>
              </div>
            </div>
          </div>

          <div>
            <el-switch
              v-model="valueTemperature"
              style="
                --el-switch-on-color: #4d87d4;
                --el-switch-off-color: #c0c2c4b8;
              "
              size="large"
              active-value="100"
              inactive-value="0"
              @change="onChangeValueHour(valueHour)"
            />
          </div>
        </div>
      </div>
      <div class="bor-bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "notification-page",

  data() {
    return {
      valueHour: true,
      valueTemperature: true,
    };
  },

  mounted() {},

  methods: {
    onChangeValueHour(value) {
      this.valueHour = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-unit {
  transition: right 0.3s ease;
  color: white;
}
</style>
