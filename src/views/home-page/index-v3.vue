<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="ic_bg">
      <div class="w-full h-full flex justify-between items-center p-40">
        <!--  -->
        <div class="w-full text-left flex flex-col gap-14">
          <!--  -->
          <div class="color_f9f9f9 flex flex-col gap-4">
            <div class="txt_line_48">Everything You Need to Know</div>
            <div>
              <p class="txt_line_24">
                Stay prepared with live updates, detailed forecasts, and alerts.
                Get the app today!
              </p>
            </div>
          </div>
          <!--  -->
          <div class="flex flex-col gap-4">
            <div class="ic-dow-apple cursor-pointer" alt="" srcset="" />
            <div class="ic-dow-ch cursor-pointer" alt="" srcset="" />
          </div>
        </div>
        <!--  -->
        <div class="flex items-center gap-20">
          <div class="ic-dow-app"></div>
          <div class="flex flex-col gap-20">
            <div class="ic-dow-app-1"></div>
            <div class="ic-dow-app-2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home-page",
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.ic_bg {
  background-image: url("../../assets/images/svg_v2/bg-home.png");
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.ic-dow-apple {
  background-image: url("../../assets/images/svg_v2/ic_down_apple.svg");
  width: 262px;
  height: 86px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.ic-dow-ch {
  background-image: url("../../assets/images/svg_v2/ic_down_ch.svg");
  width: 262px;
  height: 86px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.ic-dow-app {
  background-image: url("../../assets/images/svg_v2/ic_hinh_app.png");
  width: 289px;
  height: 587.77px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.ic-dow-app-1 {
  background-image: url("../../assets/images/svg_v2/ic_hinh_app_1.png");
  width: 289px;
  height: 587.77px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.ic-dow-app-2 {
  background-image: url("../../assets/images/svg_v2/ic_hinh_app_2.png");
  width: 289px;
  height: 587.77px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
