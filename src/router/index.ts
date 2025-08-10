import { createRouter, createWebHistory } from 'vue-router'
import search from '@/components/MySearch.vue'
import music from '@/components/MyMusic.vue'

const routes = [
  { path: '/', component: search }, // 添加根路径路由
  { path: '/searc1h', redirect: '/home' },
  { path: '/search', component: search },
  { path: '/player', component: music },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
