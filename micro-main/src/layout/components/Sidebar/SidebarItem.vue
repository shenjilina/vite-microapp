<!--
 * @Author: shenjilin-home
 * @Date: 2024-04-18 20:01:30
 * @LastEditors: shenjilin
 * @LastEditTime: 2024-04-19 18:39:50
 * @Description: 
-->
<template>
  <!-- 无子级 -->
  <template v-if="!porps.menu.children">
    <el-menu-item v-if="porps.menu?.meta?.openInNewWindow" :index="menu.path" @click="handleClickMenuItem(porps.menu)">
      <el-icon :size="20" v-if="porps.menu?.meta?.icon">
        <component :is="handleMenuIcon(menu)" />
      </el-icon>
      <template #title>
        <span class="title">{{ porps.menu.meta?.title }}</span>
      </template>
    </el-menu-item>
    <el-menu-item v-else :index="porps.menu.path" @click="handleClickMenuItem(porps.menu)">
      <el-icon :size="20" v-if="porps.menu?.meta?.icon">
        <component :is="handleMenuIcon(porps.menu)" />
      </el-icon>
      <template #title>
        <span class="title">{{ porps.menu.meta?.title }}</span>
      </template>
    </el-menu-item>
  </template>
  <!-- 有子级 -->
  <el-sub-menu v-else :index="porps.menu.path" popper-append-to-body>
    <template #title>
      <el-icon :size="20" v-if="porps.menu?.meta?.icon">
        <component :is="handleMenuIcon(porps.menu)" />
      </el-icon>
      <span class="title">{{ porps.menu.meta?.title }}</span>
    </template>
    <SidebarItem v-for="child in porps.menu.children" :key="child.path" :is-nest="true" :menu="child" />
  </el-sub-menu>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { routerPush } from '@/hooks/useMicro'
const porps = defineProps({
  menu: {
    type: Object,
    required: true
  },
});
console.log(porps.menu, porps.menu.children, 'porps.menu')
const router = useRouter();
function handleMenuIcon(menu) {
  return porps.menu?.meta?.icon;
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
