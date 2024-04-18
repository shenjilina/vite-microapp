<!--
 * @Author: shenjilin-home
 * @Date: 2024-04-18 20:01:30
 * @LastEditors: shenjilin-home
 * @LastEditTime: 2024-04-18 21:37:30
 * @Description: 
-->
<template>
  <!-- 无子级 -->
  <template v-if="!menu.children">
    <el-menu-item v-if="menu?.meta?.openInNewWindow" :index="menu.path" @click="handleClickMenuItem(menu)">
      <!-- <i v-if="menu.meta.icon" :class="handleMenuIcon(menu)" class="menu-item"></i> -->
      <el-icon :size="20" v-if="menu.meta.icon">
        <component :is="handleMenuIcon(menu)" />
      </el-icon>
      <template #title>
        <span class="title">{{ menu.meta.title }}</span>
      </template>
    </el-menu-item>
    <el-menu-item v-else :index="menu.path" @click="handleClickMenuItem(menu)">
      <!-- <i v-if="menu.meta.icon" :class="handleMenuIcon(menu)" class="menu-item"></i> -->
      <el-icon :size="20" v-if="menu.meta.icon">
        <component :is="handleMenuIcon(menu)" />
      </el-icon>
      <template #title>
        <span class="title">{{ menu.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
  <!-- 有子级 -->
  <el-sub-menu v-else :index="menu.path" popper-append-to-body>
    <template #title>
      <!-- <i :class="handleMenuIcon(menu)" class="menu-item"></i> -->
      <el-icon :size="20" v-if="menu.meta.icon">
        <component :is="handleMenuIcon(menu)" />
      </el-icon>
      <span class="title">{{ menu.meta.title }}</span>
    </template>
    <SidebarItem v-for="child in menu.children" :key="child.path" :is-nest="true" :menu="child" />
  </el-sub-menu>
</template>
<script setup>
import { useRouter } from 'vue-router'
defineProps({
  menu: {
    type: Object,
    required: true
  },
});
const router = useRouter();
function handleMenuIcon(menu) {
  return menu.meta.icon;
  // const { icon = '' } = menu.meta;
  // if (icon.startsWith('el-icon')) {
  //   return icon;
  // }
  // return icon;
}

function handleClickMenuItem({ name, path, meta }) {
  console.log(name, path, meta, "handleClickMenuItem");
  router.push({
    path
  })
  // if (meta?.openInNewWindow) {
  //   let url = meta.uri ? meta.uri : `${getConfig(meta.ssCode) + meta.menuHref}?oo=1`;
  //   window.open(url, '_blank');
  //   return;
  // }
  // routerPush(path);
}
</script>
<style scoped lang="scss">
.menu-item {
  @apply text-center text-18px w-auto inline-block;
}

.title {
  @apply ml-5px;
}
</style>
