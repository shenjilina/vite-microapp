<!--
 * @Author: shenjilin-home
 * @Date: 2024-04-18 20:01:30
 * @LastEditors: shenjilin-home
 * @LastEditTime: 2024-04-18 21:24:29
 * @Description: 
-->
<template>
  <div class="navbar-wrapper box-border">
    <div class="navbar-wrapper-left">
      <div class="menu-btn" @click="isCollapse = !isCollapse">
        <el-icon :size="20"  v-if="isCollapse">
          <Expand />
        </el-icon>
        <el-icon :size="20"  v-else>
          <Fold />
        </el-icon>
      </div>
    </div>
    <div class="navbar-wrapper-right">
      shenjilin
    </div>
  </div>
</template>

<script setup>
import { useSidebar } from '../../hooks/useSidebar';


const { isCollapse } = useSidebar();
</script>
<style scoped lang="scss">
.navbar-wrapper {
  @apply w-full h-54px flex justify-between items-center py-0 px-5 bg-[#fff];
  transition: var(--xx-transition-all) !important;

  .menu-btn {
    @apply h-full flex items-center mr-4;

    .icon-menu {
      @apply cursor-pointer opacity-90;
    }

    .icon-menu:hover {
      @apply opacity-100;
    }
  }

  .navbar-wrapper-left {
    @apply h-full flex;
  }

  .navbar-wrapper-right {
    @apply h-full flex items-center;
  }
}
</style>
