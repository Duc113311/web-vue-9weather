<template>
  <div class="w-full h-full">
    <!--  -->
    <div class="ic_bg">
      <div class="w-full h-full">
        <div class="w-full flex justify-between items-center p-l-home">
          <!--  -->
          <div class="w-[700px] text-left flex flex-col gap-14">
            <!--  -->
            <div class="color_f9f9f9 flex flex-col gap-4">
              <div class="txt_line_48">Everything You Need to Know</div>
              <div>
                <p class="txt_line_24">
                  Stay prepared with live updates, detailed forecasts, and
                  alerts. Get the app today!
                </p>
              </div>
              <div class="txt_line_50 mt-2">
                <a href="http://9weather.com">9weather.com</a>
              </div>
            </div>
            <!--  -->
            <div class="flex flex-col gap-4">
              <div class="ic-dow-apple cursor-pointer" alt="" srcset="" />
              <div class="ic-dow-ch cursor-pointer" alt="" srcset="" />
            </div>
          </div>
          <div class="w-[calc(100%-700px)] h-full overflow-hidden">
            <!--  -->
            <div class="flex items-center justify-center gap-10 h-full">
              <div class="ic-dow-app"></div>
              <div class="ic-dow-app-1 mb-44"></div>
              <div class="ic-dow-app-2"></div>
            </div>
          </div>
          <!--  -->
        </div>
      </div>

      <div class="w-full flex justify-between items-center pl-80 pr-80">
        <!--  -->
        <div class="w-[700px] text-left flex flex-col gap-14">
          <!--  -->
          <div class="color_f9f9f9 flex flex-col gap-4">
            <div class="txt_line_48">Everything You Need to Know</div>
            <div>
              <p class="txt_line_24">
                Stay prepared with live updates, detailed forecasts, and alerts.
                Get the app today!
              </p>
            </div>
            <div class="txt_line_50 mt-2">
              <a href="http://9weather.com">9weather.com</a>
            </div>
          </div>
          <!--  -->
        </div>
        <div class="w-[calc(100%-700px)] overflow-hidden">
          <!--  -->
          <div class="flex items-center justify-center gap-20 h-[800px]">
            <div class="tilted-image gap-6 flex flex-col">
              <div class="ic-dow-app tilted-images"></div>
              <div class="ic-dow-app-1 tilted-images"></div>
            </div>
            <div class="tilted-image relative">
              <div class="ic-dow-app-2 tilted-images absolute top-64"></div>
              <div class="ic-dow-app-1 tilted-images"></div>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home-page-v3",
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
  width: 180px;
  height: 60px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.ic-dow-ch {
  background-image: url("../../assets/images/svg_v2/ic_down_ch.svg");
  width: 180px;
  height: 60px;
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

.p-l-home {
  padding-left: 26rem;
  padding-right: 26rem;
  padding-top: 10rem;
}

@media (min-width: 576px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1024px) {
}
.tilted-image {
  transform: rotate(30deg); /* Nghiêng ảnh sang phải 30 độ */
  transition: transform 0.3s ease-in-out;
}

// .tilted-image:hover {
//   transform: rotate(0deg); /* Reset khi hover */
// }
</style>
