/*
 * @LastEditors: shenjilin
 * @Description: sidebar hooks
 * @Date: 2022-03-06 19:54:20
 * @LastEditTime: 2024-04-18 18:48:17
 * @Author: isboyjc
 */
import { useSystemStore } from '@/store/useSystemStore.js';
import { computed } from 'vue';
export function useSidebar() {

  const systemStore = useSystemStore();
  
  const isCollapse = computed({
    get() {
      return systemStore.isCollapse;
    },
    set() {
      systemStore.toggleSidebar();
    },
  });

  return {
    isCollapse
  };
}
