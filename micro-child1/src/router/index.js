/*
 * @Author: shenjilin-home
 * @Date: 2024-04-18 22:19:32
 * @LastEditors: shenjilin-home
 * @LastEditTime: 2024-04-18 22:35:59
 * @Description: 
 */
import { createRouter, createWebHistory } from "vue-router";
import { Document, Menu as IconMenu, } from "@element-plus/icons-vue";
export const routes = [
  {
    path: "/page1",
    name: "page",
    meta: {
      keepAlive: true,
      title: "我的页面1",
      icon: Document,
    },
    component: () => import("@/views/Page.vue"),
  },
  {
    path: "/page2",
    name: "page2",
    meta: {
      keepAlive: true,
      title: "我的页面2",
      icon: IconMenu,
    },
    component: () => import("@/views/Page2.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});
export default router;
