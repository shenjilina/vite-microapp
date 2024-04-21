<template>
  <div>
    <!-- name：应用名称, url：应用地址 -->
    <micro-app
      name="micro-child1"
      :url="url"
      :data="microAppData"
      baseroute="/micro-child1"
      router-mode="native-scope"
      iframe
    ></micro-app>
  </div>
</template>
<script setup>
import { ref } from "vue";
import useMicro from '@/hooks/useMicro.js';

const { microAppData } = useMicro();
const url = ref("http://localhost:8091/")
;
</script>
<style lang="scss" scoped></style>
