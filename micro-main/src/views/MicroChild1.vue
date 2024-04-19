<template>
  <div>
    <!-- name：应用名称, url：应用地址 -->
    <micro-app
      name="micro-child1"
      :url="url"
      baseroute="/micro-child1"
      router-mode="native-scope"
      iframe
    ></micro-app>
  </div>
</template>
<script setup>
import { ref } from "vue";
const url = ref("http://192.168.202.114:8091/");
</script>
<style lang="scss" scoped></style>
