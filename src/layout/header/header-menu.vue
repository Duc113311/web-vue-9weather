<template>
  <div class="header-menu">
    <!--  -->
    <div class="w-full h-full relative">
      <div class="md:flex w-full items-center justify-between hidden">
        <div
          class="flex items-center gap-2"
          v-if="namePage !== 'unit_settings'"
        >
          <img
            src="../../assets/images/svg_v2/ic_settings.svg"
            alt=""
            srcset=""
          />
          <p class="txt_regular">{{ $t("Setting") }}</p>
        </div>
        <div
          @click="onClickBack('settings')"
          class="flex items-center gap-2 cursor-pointer"
          v-if="namePage === 'unit_settings'"
        >
          <img
            src="../../assets/images/svg_v2/ic_back_st.svg"
            alt=""
            srcset=""
          />
          <p class="txt_regular">
            <span>{{ $t(`Unit_preferences_settings`) }}</span>
          </p>
        </div>

        <img
          @click="onClickCancel"
          src="../../assets/images/svg_v2/ic_close.svg"
          alt=""
          width="24"
          class="cursor-pointer"
        />
      </div>
      <!-- Mobile -->

      <div
        class="md:hidden block address-now pt-2 pb-2 text-left cursor-pointer text-blue-300 bg-slate-400"
        :key="indexState + Math.random()"
      >
        <div class="flex justify-between items-center pl-4 pr-4">
          <div
            class="flex"
            v-if="breadcumsObject?.country_key?.toLowerCase() === 'vn'"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 12H5M5 12C5 15.866 8.13401 19 12 19M5 12C5 8.13401 8.13401 5 12 5M19 12H22M19 12C19 15.866 15.866 19 12 19M19 12C19 8.13401 15.866 5 12 5M12 2V5M12 19V22M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            &nbsp;
            <p v-if="breadcumsObject?.city">
              {{
                $t(
                  `city.city_${languageParam}.${convertToLowCase(
                    breadcumsObject?.city_key
                  )}`
                )
              }},
            </p>
            &nbsp;
            <p v-if="breadcumsObject?.country">
              {{ breadcumsObject?.country }}
            </p>
          </div>

          <div class="flex items-center mr-4 txt_regular_14 color-text">
            <div class="flex items-center gap-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="icon-path"
                  d="M12.0229 13.4997C12.3511 13.4999 12.6702 13.3917 12.9308 13.1921C13.1914 12.9925 13.3788 12.7125 13.4641 12.3955C13.5493 12.0785 13.5277 11.7422 13.4024 11.4388C13.2772 11.1354 13.0554 10.8818 12.7714 10.7172V6.01172C12.7714 5.81281 12.6924 5.62204 12.5517 5.48139C12.4111 5.34074 12.2203 5.26172 12.0214 5.26172C11.8225 5.26172 11.6317 5.34074 11.491 5.48139C11.3504 5.62204 11.2714 5.81281 11.2714 6.01172V10.7195L11.2691 10.7202L8.49862 9.12122C8.32645 9.02333 8.12256 8.99752 7.93142 9.04941C7.74029 9.1013 7.57744 9.22668 7.47842 9.3982C7.37939 9.56971 7.35222 9.77344 7.40284 9.96491C7.45347 10.1564 7.57777 10.3201 7.74862 10.4202L10.5311 12.0267C10.5361 12.4192 10.6955 12.794 10.9749 13.0697C11.2543 13.3454 11.6303 13.4999 12.0229 13.4997Z"
                />
                <path
                  class="icon-path"
                  d="M22.5 12C22.5 6.201 17.799 1.5 12 1.5C6.201 1.5 1.5 6.201 1.5 12C1.5 17.799 6.201 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12ZM20.25 12C20.25 16.5562 16.5562 20.25 12 20.25C7.44375 20.25 3.75 16.5562 3.75 12C3.75 7.44375 7.44375 3.75 12 3.75C16.5562 3.75 20.25 7.44375 20.25 12Z"
                />
              </svg>
              <div class="text-left">
                <span>{{ $t("Local_time") }}: </span>&nbsp;
              </div>
            </div>
            <span id="s-date-time" class="flex items-center">
              {{ vietnamTime }}
            </span>
          </div>
        </div>
      </div>

      <!-- Desktop -->
      <div
        class="md:block hidden address-now pt-2 pb-2 text-left cursor-pointer text-blue-300"
        :key="indexState + Math.random()"
      >
        <div
          class="flex"
          v-if="breadcumsObject?.country_key?.toLowerCase() === 'vn'"
        >
          <p v-if="breadcumsObject?.city">
            {{
              $t(
                `city.city_${languageParam}.${convertToLowCase(
                  breadcumsObject?.city_key
                )}`
              )
            }},
          </p>
          &nbsp;
          <p v-if="breadcumsObject?.country">{{ breadcumsObject?.country }}</p>
        </div>
      </div>

      <!-- desktop -->
      <div class="w-full md:block hidden">
        <div
          v-if="namePage !== 'unit_settings'"
          class="w-full nav-bar cursor-pointer flex justify-between pad-option-tb-8"
          @click="onClickUnitSetting('unit_settings')"
        >
          <div class="txt_regular flex items-center">
            <span>{{ $t(`Unit_preferences_settings`) }}</span>
          </div>
          <div>
            <img src="../../assets/images/svg/ic_back_right.svg" alt="" />
          </div>
        </div>
        <div
          v-if="namePage !== 'unit_settings'"
          class="w-full nav-bar cursor-pointer flex justify-between pad-option-tb-8"
        >
          <div class="txt_regular flex items-center">
            <span>{{ $t("Dark/Light") }}</span>
          </div>
          <div>
            <el-switch
              v-model="valueLives"
              @change="onChangeLiveActivity"
              class="ml-2"
              style="
                --el-switch-on-color: #0c61ee;
                --el-switch-off-color: #d4cccc;
              "
            />
          </div>
        </div>

        <!--  -->
        <UnitPreferencesPage
          v-if="namePage === 'unit_settings'"
        ></UnitPreferencesPage>
      </div>

      <!-- mobile -->

      <div class="txt_medium absolute bottom-0 right-0 color-footer p-5">
        <span>{{ $t("version") }} 4/ 23.01.2024</span>
      </div>
    </div>
  </div>
</template>
<script>
import UnitPreferencesPage from "@/components/settings/unit-preferences-page.vue";
import { convertToEnglish } from "@/utils/converValue";
import { mapGetters, mapMutations } from "vuex";
import { formatInTimeZone } from "date-fns-tz";

export default {
  name: "header-menu",

  components: {
    UnitPreferencesPage,
  },

  data() {
    return {
      namePage: "setting",
      valueLives: false,
      theme: "dark",
      indexKey: 0,
      vietnamTime: "",
      usTime: "",
      userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Múi giờ của người dùng
    };
  },

  computed: {
    ...mapGetters("commonModule", ["breadcumsObjectGetters"]),
    indexState() {
      debugger;
      return this.$store.state.commonModule.indexComponent;
    },
    languageParam() {
      const languageRouter = this.$route.params;
      return Object.keys(languageRouter).length !== 0
        ? languageRouter.language
        : this.$i18n.locale;
    },
    breadcumsObject() {
      const retrievedArray = JSON.parse(localStorage.getItem("objectBread"));
      return retrievedArray ? retrievedArray : this.breadcumsObjectGetters;
    },
  },

  mounted() {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    if (savedTheme === "light") {
      this.valueLive = true;
    } else {
      this.valueLive = false;
    }

    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  },

  methods: {
    ...mapMutations("commonModule", [
      "setIndexComponent",
      "updateThemeColor",
      "setThemeState",
    ]),

    updateTime() {
      const now = new Date();

      // Định dạng giờ Việt Nam (Asia/Ho_Chi_Minh)
      const timeZone = this.userTimeZone;
      this.vietnamTime = formatInTimeZone(
        now,
        timeZone,
        "HH:mm:ss | dd/MM/yyyy"
      );
    },

    convertToEnglishRender(value) {
      return convertToEnglish(value);
    },
    convertToLowCase(value) {
      const normalizedStr = value
        .normalize("NFD") // Chuyển chuỗi sang dạng tổ hợp Unicode
        .replace(/[\u0300-\u036f]/g, ""); // Loại bỏ các dấu

      return normalizedStr;
    },
    onClickUnitSetting(value) {
      this.namePage = value;
    },

    onClickLanguagesSetting(value) {
      debugger;
    },

    onClickCancel() {
      this.$emit("onChangeCloseMenu", false);
    },

    onClickBack(value) {
      this.namePage = value;
    },

    onChangeLiveActivity(value) {
      debugger;
      this.valueLive = value;
      this.setIndexComponent(this.indexKey++);

      this.theme = this.valueLive ? "light" : "dark";
      this.setThemeState(this.theme);
      document.documentElement.setAttribute("data-theme", this.theme); // Gán `data-theme` vào HTML
      localStorage.setItem("theme", this.theme); // Lưu trạng thái vào localStorage
    },
  },
};
</script>
<style lang="scss">
.header-menu {
  background-color: #f9f9f9;
  border-top: 1px solid hsla(0, 0%, 76%, 0.2);
  display: none;
  overflow-y: auto;
  // padding: 12px 0 0px;
  z-index: 100;
}
@media (min-width: 768px) {
  .header-menu {
    // background: linear-gradient(to bottom, #343863, #a6a6c4);
    background-image: url(../../assets/images/svg_v2/background.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    -webkit-box-shadow: 1px 0 4px 0 rgba(0, 0, 0, 0.5);
    box-shadow: 1px 0 4px 0 rgba(0, 0, 0, 0.5);
    color: #f9f9f9;
    padding: 20px 20px 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 478px;
  }
}
.basic-header.menu-open .header-menu {
  display: block;
}
.basic-header .header-menu {
  height: 100vh;
}

@media (max-width: 767px) {
  .basic-header .header-menu {
    height: calc(100vh - 44px);
  }
}
.basic-header.menu-open .header-menu {
  display: block;
}

.pad-option-tb-8 {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
