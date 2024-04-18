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
          class="w-full h-[calc(100%-38px)] overflow-x-hidden overflow-y-auto"
        />
      </div>
    </div>
    <router-view></router-view>
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
  .fixed-header,
  .main-container,
  .sidebar-container,
  .content-container > div {
    transition: var(--xx-transition-all);
  }
}
</style>
