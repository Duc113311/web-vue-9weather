import { createRouter, createWebHistory } from "vue-router";
// import HomePage from "../views/home/index.vue";
import HomePageV2 from "../views/home-page/index.vue";

import WidgetView from "../views/widget-create/form-iframe/index.vue";
import NotFoundComponent from "../views/404/index.vue";
import DashPage from "../views/index.vue";
import SearchPage from "../views/search/index.vue";

const routes = [
  {
    path: "/widget-view",
    name: "widget-view",
    component: WidgetView,
    props: true,
  },

  { path: "/404", name: "404-page", component: NotFoundComponent }, // Component cho trang 404

  // v2

  {
    path: "",
    name: "home-page",
    component: DashPage,

    children: [
      {
        path: "",
        name: "home-pages",
        component: HomePageV2,
      },
      {
        path: "/:language/:country/:city/:coordinates/",
        name: "city-page",
        component: SearchPage,
        children: [
          {
            path: `today-weather`, // Add ':language' as a dynamic segment
            name: "today-weather",
            component: () => import("@/views/search/today-page/index.vue"), // Component cho route con
          },
          {
            path: `month-weather`, // Add ':language' as a dynamic segment
            name: "month-weather",
            component: () => import("@/views/search/month-page/index.vue"), // Component cho route con
          },
          {
            path: `hourly-weather`, // Add ':language' as a dynamic segment
            name: "hourly-weather",
            component: () => import("@/views/search/hourly-page/index.vue"), // Component cho route con
          },
        ],
      },
    ],
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
