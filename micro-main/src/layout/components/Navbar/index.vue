<template>
  <div class="navbar-wrapper">
    <div class="navbar-wrapper-left">
      <div class="menu-btn" @click="isCollapse = !isCollapse">
        <!-- <IconEpExpand v-if="isCollapse" class="icon-menu text-[var(--xx-navbar-text-color)] text-[1rem]" />
        <IconEpFold v-else class="icon-menu text-[var(--xx-navbar-text-color)] text-[1rem]" /> -->
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
    @apply w-full h-54px flex justify-between items-center py-0 pl-5 pr-0;
    background: var(--xx-navbar-bg-color);
    // box-shadow: var(--xx-box-shadow-light);
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
      @apply h-full flex;
    }
  }
</style>
