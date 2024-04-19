import { createApp } from 'vue'
// 引入公共css
import '@/styles/index.scss';
import App from './App.vue'
import router from './router/index.js';
import 'virtual:uno.css';
import 'element-plus/dist/index.css';

import microApp from '@micro-zoe/micro-app';

import store from './store/index';

microApp.start();
const app = createApp(App);

app.use(router)
app.use(store)
app.mount('#app')
