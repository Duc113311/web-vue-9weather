import { createRouter, createWebHistory } from "vue-router";
// import HomePage from "../views/home/index.vue";
import HomePage from "../views/home-page-v2/index.vue";
import HomePageV2 from "../views/home-page/index.vue";
import CityPage from "../views/city/index.vue";
import WidgetView from "../views/widget-create/form-iframe/index.vue";
import NotFoundComponent from "../views/404/index.vue";

const routes = [
  {
    path: "/",
    name: "home-page",
    component: HomePage,
  },
  {
    path: "/:language/:country/:city/:code/",
    name: "city-page",
    component: CityPage,

    children: [
      // router detail
      {
        path: `current-weather`, // Add ':language' as a dynamic segment
        name: "dash-city",
        component: () => import("@/views/city/dash-city/index.vue"), // Component cho route con
      },
      {
        path: `hourly-weather-forecast`,
        name: "hourly-forecast-view",
        component: () => import("@/views/city/hourly-forecast/index.vue"),
      },
      {
        path: "weather-radar",
        name: "radar-view",
        component: () => import("@/views/city/radar/index.vue"),
      },
      {
        path: "now-detail",
        name: "now-view",
        component: () => import("@/views/city/now-page/index.vue"),
      },
      {
        path: "moon-phase",
        name: "moonphase-view",
        component: () => import("@/views/city/moonphase/index.vue"),
      },
      {
        path: "air-quality",
        name: "air-quality-view",
        component: () => import("@/views/city/air-quality/index.vue"),
      },
      {
        path: "uv-index-detail",
        name: "uv-index-view",
        component: () => import("@/views/city/uv-index/index.vue"),
      },
      {
        path: "weather-next-30-days",
        name: "30-day-forecast-view",
        component: () => import("@/views/city/30-day-forecast/index.vue"),
      },
      {
        path: "weather-tomorrow",
        name: "tomorrow-view",
        component: () => import("@/views/city/tomorrow/index.vue"),
      },
      {
        path: "next-3-day",
        name: "next-3-day-view",
        component: () => import("@/views/city/next-3-day/index.vue"),
      },
      {
        path: "weather-next-7-days",
        name: "next-7-day-view",
        component: () => import("@/views/city/next-7-day/index.vue"),
      },
    ],
  },
  {
    path: "/introduce",
    name: "introduce-page",
    component: () =>
      // eslint-disable-next-line prettier/prettier
      import(
        /* webpackChunkName: "introduce-page" */ "../views/introduce/index.vue"
      ),
  },
  {
    path: "/create-widget",
    name: "create-widget-view",
    component: () =>
      // eslint-disable-next-line prettier/prettier
      import(
        /* webpackChunkName: "create-widget-view" */ "../views/widget-create/index.vue"
      ),
  },

  {
    path: "/widget-view",
    name: "widget-view",
    component: WidgetView,
    props: true,
  },

  { path: "/404", name: "404-page", component: NotFoundComponent }, // Component cho trang 404

  {
    path: "/daily-weather",
    name: "daily-weather-view",
    component: () =>
      // eslint-disable-next-line prettier/prettier
      import(
        /* webpackChunkName: "daily-weather-view" */ "../views/daily-weather/index.vue"
      ),
  },

  {
    path: "/promotional-new",
    name: "promotional-new-view",
    component: () =>
      // eslint-disable-next-line prettier/prettier
      import(
        /* webpackChunkName: "promotional-new-view" */ "../views/promotional-new/index.vue"
      ),
  },

  // v2

  {
    path: "/",
    name: "home-page",
    component: HomePageV2,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Cuộn lên đầu mỗi khi điều hướng đến một route mới
    return { top: 0 };
  },
});
const isSafeURL = (url) => {
  // Kiểm tra URL có chứa mã độc hay không
  const unsafeChars = /<script>|<\/script>|javascript:/i;
  return !unsafeChars.test(url);
};
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  if (isSafeURL(to.fullPath)) {
    next(); // Nếu URL an toàn, tiếp tục điều hướng
  } else {
    next("/404"); // Nếu URL không an toàn, chuyển hướng đến trang 404
  }
});

export default router;
