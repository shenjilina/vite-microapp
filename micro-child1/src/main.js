/*
 * @Author: shenjilin-home
 * @Date: 2024-04-18 22:12:49
 * @LastEditors: shenjilin
 * @LastEditTime: 2024-04-19 15:10:49
 * @Description: 
 */
import { createApp } from 'vue'
import '@/styles/index.scss';
import App from './App.vue'
import router from './router/index';
import 'virtual:uno.css';
import 'element-plus/dist/index.css';
// 微应用入口
// import { microAppInit } from './microApp';

const app = createApp(App);
app.use(router)
app.mount('#child-app1')
// microAppInit(app);