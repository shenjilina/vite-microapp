<template>
  <div class="sidebar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        class="sidebar-el-menu-vertical"
        :collapse="isCollapse"
        :router="false"
        :collapse-transition="true"
        text-color="#CFDDFC"
        active-text-color="#fff"
        background-color="#162C5B"
      >
        <SidebarItem
          v-for="menu in porps.menuList"
          :key="menu.path"
          :menu="menu"
          :base-path="menu.path"
        ></SidebarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import SidebarItem from "./SidebarItem.vue";
import { useSidebar } from '../../hooks/useSidebar';
// import { useMenuStore } from "@/store/useMenuStore";

const porps = defineProps({
  menuList: {
    type: Array,
    default: () => [],
  },
});
console.log(porps.menuList);

const route = useRoute();
// const { menuList } = useMenuStore();
const activeMenu = ref(route.path);

const { isCollapse } = useSidebar();
</script>
<style lang="scss" scoped>
.sidebar {
  @apply bg-[var(--el-menu-bg-color)];

  .sidebar-el-menu-vertical {
    @apply border-none;
  }
}
</style>
