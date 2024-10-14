<template>
  <div class="w-full h-auto bg-white p-2">
    <div class="w-full h-full">
      <!-- footer -->
      <div class="container md:h-[230px] h-auto md:pt-10 md:pb-10">
        <!--  -->
        <el-collapse v-model="activeName" accordion>
          <div
            class="footer-content-tablet flex-row md:hidden block md:pl-0 md:pr-0 pl-4 pr-4"
          >
            <!-- 01 -->
            <el-collapse-item name="1">
              <template #title>
                <div class="footer-content-category-header">
                  <span>{{ $t("Company") }}</span>
                </div>
              </template>
              <template #default>
                <div class="footer-content-category">
                  <div class="footer-content-category-wrapper">
                    <!-- title -->

                    <!-- category -->
                    <div class="footer-category-section">
                      <a href="#" class="footer-category-section-link">
                        <font class="txt_regular">{{
                          $t("Proven_Superior_Accuracy")
                        }}</font>
                      </a>
                      <a href="#" class="footer-category-section-link">
                        <font class="txt_regular">{{
                          $t("About_Weather")
                        }}</font>
                      </a>
                      <a href="#" class="footer-category-section-link">
                        <font class="txt_regular">{{ $t("Contact_Us") }}</font>
                      </a>
                      <a href="#" class="footer-category-section-link">
                        <font class="txt_regular">{{ $t("Press") }}</font>
                      </a>
                    </div>
                  </div>
                </div>
              </template>
            </el-collapse-item>
            <!-- 02 -->
            <el-collapse-item name="2">
              <template #title>
                <div class="footer-content-category-header">
                  <span>{{ $t("PRODUCTS_&_SERVICES") }}</span>
                </div>
              </template>
              <template #default>
                <div class="footer-content-category">
                  <div class="footer-content-category-wrapper">
                    <!-- title -->

                    <!-- category -->
                    <div class="footer-category-section">
                      <a href="#" class="footer-category-section-link">
                        <font class="txt_regular">{{
                          $t("For_Business")
                        }}</font>
                      </a>
                    </div>
                  </div>
                </div>
              </template>
            </el-collapse-item>
            <!-- 03 -->
            <el-collapse-item name="3">
              <template #title>
                <div class="footer-content-category-header">
                  <span>{{ $t("APPS_&_DOWNLOADS") }}</span>
                </div>
              </template>
              <template #default>
                <div class="footer-content-category">
                  <div class="footer-content-category-wrapper">
                    <!-- title -->

                    <!-- category -->
                    <div class="footer-category-section">
                      <a href="#" class="footer-category-section-link">
                        <font class="txt_regular">{{ $t("Iphone_App") }}</font>
                      </a>
                      <a href="#" class="footer-category-section-link">
                        <font class="txt_regular">{{ $t("Android_App") }}</font>
                      </a>
                      <a href="#" class="footer-category-section-link">
                        <font class="txt_regular">{{
                          $t("See_all_Apps_&_Downloads")
                        }}</font>
                      </a>
                    </div>
                  </div>
                </div>
              </template>
            </el-collapse-item>
            <!-- 04 -->
            <el-collapse-item name="4">
              <template #title>
                <div class="footer-content-category-header">
                  <span>{{ $t("MORE") }}</span>
                </div>
              </template>
              <template #default>
                <div class="footer-content-category">
                  <div class="footer-content-category-wrapper">
                    <!-- title -->

                    <!-- category -->
                    <div class="footer-category-section">
                      <a href="#" class="footer-category-section-link">
                        <font class="txt_regular">{{
                          $t("Severe_Weather")
                        }}</font>
                      </a>
                    </div>
                  </div>
                </div>
              </template>
            </el-collapse-item>
          </div>

          <div class="footer-content-tablet flex-row md:flex hidden">
            <!-- 01 -->
            <div class="footer-content-category">
              <div class="footer-content-category-wrapper">
                <!-- title -->
                <div class="footer-content-category-header">
                  <span>{{ $t("Company") }}</span>
                </div>
                <!-- category -->
                <div class="footer-category-section">
                  <a href="#" class="footer-category-section-link">
                    <font class="txt_regular">{{
                      $t("Proven_Superior_Accuracy")
                    }}</font>
                  </a>
                  <a href="#" class="footer-category-section-link">
                    <font class="txt_regular">{{ $t("About_Weather") }}</font>
                  </a>
                  <a href="#" class="footer-category-section-link">
                    <font class="txt_regular">{{ $t("Contact_Us") }} </font>
                  </a>
                  <a href="#" class="footer-category-section-link">
                    <font class="txt_regular">{{ $t("Press") }}</font>
                  </a>
                </div>
              </div>
            </div>
            <!-- 02 -->
            <div class="footer-content-category">
              <div class="footer-content-category-wrapper">
                <!-- title -->
                <div class="footer-content-category-header">
                  <span>{{ $t("PRODUCTS_&_SERVICES") }}</span>
                </div>
                <!-- category -->
                <div class="footer-category-section">
                  <a href="#" class="footer-category-section-link">
                    <font class="txt_regular">{{ $t("For_Business") }}</font>
                  </a>
                </div>
              </div>
            </div>
            <!-- 03 -->
            <div class="footer-content-category">
              <div class="footer-content-category-wrapper">
                <!-- title -->
                <div class="footer-content-category-header">
                  <span>{{ $t("APPS_&_DOWNLOADS") }}</span>
                </div>
                <!-- category -->
                <div class="footer-category-section">
                  <a href="#" class="footer-category-section-link">
                    <font class="txt_regular">{{ $t("Iphone_App") }}</font>
                  </a>
                  <a href="#" class="footer-category-section-link">
                    <font class="txt_regular">{{ $t("Android_App") }}</font>
                  </a>
                  <a href="#" class="footer-category-section-link">
                    <font class="txt_regular">{{
                      $t("See_all_Apps_&_Downloads")
                    }}</font>
                  </a>
                </div>
              </div>
            </div>
            <!-- 04 -->
            <div class="footer-content-category">
              <div class="footer-content-category-wrapper">
                <!-- title -->
                <div class="footer-content-category-header">
                  <span>{{ $t("MORE") }}</span>
                </div>
                <!-- category -->
                <div class="footer-category-section">
                  <a href="#" class="footer-category-section-link">
                    <font class="txt_regular">{{ $t("Severe_Weather") }}</font>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </el-collapse>
        <!--  -->
      </div>

      <!--  -->
      <div
        class="bor-top flex justify-center items-center h-[calc(100%-230px)]"
      >
        <div class="w-full">
          <div class="txt_regular pl-4 pr-4 pt-2">
            <span>
              {{
                $t(
                  '©_2024_BacHaWeather,_Inc._"BacHaWeather"_and_sun_design_are_registered_trademarks_of_BacHaWeather,_Inc._All_Rights_Reserved.'
                )
              }}
            </span>
          </div>
          <div id="footer-terms" class="txt_medium mt-2">
            <a
              data-ga="Terms of Use"
              href="#"
              target="_blank"
              previewlistener="true"
            >
              {{ $t("Terms_of_Use") }}
            </a>
            |
            <a
              data-ga="Privacy Policy"
              href="#"
              target="_blank"
              previewlistener="true"
            >
              {{ $t("Privacy_Policy") }}
            </a>
            |
            <a
              data-ga="Cookie Policy"
              href="#"
              target="_blank"
              previewlistener="true"
            >
              {{ $t("Cookie_Policy") }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "footer_page",
};
</script>
<style lang="scss">
.footer-content-category {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  display: flex;
}

.footer-content-category-header {
  color: #878787;
  font-size: 14px;
  margin-bottom: 4px;
  text-transform: uppercase;
  text-align: left;
}

.footer-category-section {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  flex-wrap: wrap;
  display: flex;
}

.footer-category-section .footer-category-section-link {
  line-height: 2.15;
  margin-right: auto;
  margin-bottom: 0;
  font-size: 13px;
  color: #000;
  text-align: left;
}
</style>
