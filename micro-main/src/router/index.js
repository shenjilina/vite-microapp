/*
 * @Author: shenjilin-home
 * @Date: 2024-04-18 20:01:30
 * @LastEditors: shenjilin
 * @LastEditTime: 2024-04-19 11:54:50
 * @Description:
 */
import { createRouter, createWebHistory } from "vue-router";
import { Location, Document, Menu as IconMenu, } from "@element-plus/icons-vue";
export const routes = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "我的菜单",
      keepAlive: true,
      icon: Location,
    },
    children: [
      {
        // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面
        path: '/micro-child1/:page*', // vue-router@4.x path的写法为：'/my-page/:page*'
        name: 'MicroChild1',
        meta: {
          title: "子应用1",
          keepAlive: true,
          icon: Location,
        },
        component: () => import('@/views/MicroChild1.vue')
      },
      // {
      //   // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面
      //   path: '/micro-child2/:page*', // vue-router@4.x path的写法为：'/my-page/:page*'
      //   name: 'MicroChild2',
      //   component: () => import('@/views/MicroChild2.vue')
      // },
      {
        path: "/page",
        name: "page",
        meta: {
          keepAlive: true,
          title: "我的页面1",
          icon: Document,
        },
        component: () => import("@/views/Page.vue"),
      },{
        path: "/page2",
        name: "page2",
        meta: {
          keepAlive: true,
          title: "我的页面2",
          icon: IconMenu,
        },
        component: () => import("@/views/Page2.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});
export default router;
