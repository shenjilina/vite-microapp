<!--
 * @Author: shenjilin-home
 * @Date: 2024-04-18 20:01:30
 * @LastEditors: shenjilin-home
 * @LastEditTime: 2024-04-18 21:43:25
 * @Description: 
-->
<template>
  <div class="panel">
    <div class="containerbox">
      <div class="w-full h-full">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup></script>
<style scoped lang="scss">
  .panel {
    @apply p-5;
    .containerbox {
      @apply p-5 bg-[#fff] h-full rounded box-border;
    }
  }
</style>
