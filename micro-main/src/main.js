import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index';
import 'virtual:uno.css';
// 引入公共css
import 'element-plus/dist/index.css';

import microApp from '@micro-zoe/micro-app';

microApp.start();
createApp(App).use(router).mount('#app')
