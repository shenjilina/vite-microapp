<!--
 * @Author: shenjilin-home
 * @Date: 2024-04-18 20:01:30
 * @LastEditors: shenjilin-home
 * @LastEditTime: 2024-04-18 21:41:34
 * @Description: 
-->
<template>
  <div class="app-wrapper w-full min-h-screen h-full relative flex">
    <div
      class="fixed-header h-[100vh] relative z-0 flex-none bg-[var(--xx-menu-bg-color)]"
    >
      <Sidebar
        class="sidebar-container bg-[var(--xx-bg-color)]"
        :menu-list="menuList"
      />
    </div>
    <div class="main-container w-full h-full flex-auto z-0">
      <Navbar />
      <div
        class="content-container w-full h-[calc(100vh-54px)] overflow-hidden"
      >
        <Panel
          class="w-full h-full overflow-x-hidden overflow-y-auto"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Sidebar from "./components/Sidebar/index.vue";
import Navbar from "./components/Navbar/index.vue";
import Panel from "./components/Panel/index.vue";
import { routes } from "@/router/index.js";

const menuList = ref(routes);
</script>
<style lang="scss" scoped>
.app-wrapper {
  @apply bg-[#f2f2f2];
  .fixed-header,
  .main-container,
  .sidebar-container,
  .content-container > div {
    transition: var(--xx-transition-all);
  }
}
</style>
