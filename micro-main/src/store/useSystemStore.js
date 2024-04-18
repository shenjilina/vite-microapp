import { defineStore } from "pinia";
import { ref } from "vue";
export const useSystemStore = defineStore('systemStore', () =>{
  const isCollapse = ref(false)

  const toggleSidebar = () => {
    isCollapse.value = !isCollapse.value
  }

  return {
    isCollapse,
    toggleSidebar
  }
})