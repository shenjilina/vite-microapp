<template>
  <div class="panel">
    <div class="containerbox rounded box-border">
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
    .containerbox {
      transition: var(--xx-transition-all);
      height: 100%;
    }
  }
</style>
