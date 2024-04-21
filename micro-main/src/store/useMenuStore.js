import { defineStore } from "pinia";
import { ref } from "vue";

export const useMenuStore = defineStore("menuStore", () => {
  const menuList = ref([
    {
      path: "/path1",
      meta: {
        title: "子应用1",
        keepAlive: true,
        ssCode: "child1",
        icon: "",
      },
      children: [
        {
          path: "/micro-child1/page1",
          name: "micro-child1/page1",
          meta: {
            keepAlive: true,
            title: "我的页面1",
            ssCode: "child1",
            icon: "",
          },
        },
        {
          path: "/micro-child1/page2",
          name: "micro-child1/page2",
          meta: {
            keepAlive: true,
            title: "我的页面2",
            ssCode: "child1",
            icon: "",
          },
        },
      ],
    },
  ]);
  const setMenuList = (list) => {
    menuList.value = list;
  };

  const defaultActiveRoute = ref("micro-child1/page1");
  return {
    menuList,
    setMenuList,
    defaultActiveRoute,
  };
});
