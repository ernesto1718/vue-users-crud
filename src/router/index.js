import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '@/views/UsersView.vue'

const routes = [
  { path: '/', redirect: '/users' },
  { path: '/users', name: 'users', component: UsersView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
