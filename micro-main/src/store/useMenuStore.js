import { defineStore } from "pinia";
import { ref } from "vue";

export const useMenuStore = defineStore("menuStore", () => {
  const menuList = ref({
    path: "/",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: '我的菜单',
      keepAlive: true,
    },
    children: [
      {
        path: "/page",
        name: "page",
        meta: {
          keepAlive: true,
          title: "我的页面",
        },
        component: () => import("@/views/Page.vue"),
      },
    ],
  });
  const setMenuList = (list) => {
    menuList.value = list;
  };
  return {
    menuList,
    setMenuList,
  };
});
