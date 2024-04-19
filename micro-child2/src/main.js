/*
 * @Author: shenjilin-home
 * @Date: 2024-04-18 22:12:49
 * @LastEditors: shenjilin-home
 * @LastEditTime: 2024-04-18 22:36:13
 * @Description: 
 */
import { createApp } from 'vue'
// import './style.css'
import '@/styles/index.scss';
import App from './App.vue'
import router from './router/index';
import 'virtual:uno.css';
// 引入公共css
import 'element-plus/dist/index.css';

createApp(App).use(router).mount('#app')
