import { createRouter, createWebHistory } from 'vue-router';

export const routes = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面
        path: '/micro-child1/:page*', // vue-router@4.x path的写法为：'/my-page/:page*'
        name: 'MicroChild1',
        component: () => import('@/views/MicroChild1.vue')
      },
      {
        // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面
        path: '/micro-child2/:page*', // vue-router@4.x path的写法为：'/my-page/:page*'
        name: 'MicroChild2',
        component: () => import('@/views/MicroChild2.vue')
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory("/"),
  routes
});
export default router;