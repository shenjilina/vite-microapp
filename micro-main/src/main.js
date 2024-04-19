import { createApp } from 'vue'
// import './style.css'
import '@/styles/index.scss';
import App from './App.vue'
import router from './router/index';
import 'virtual:uno.css';
// 引入公共css
import 'element-plus/dist/index.css';

// import microApp from '@micro-zoe/micro-app';

import store from './store/index';

// microApp.start();
createApp(App).use(router).use(store).mount('#app')
