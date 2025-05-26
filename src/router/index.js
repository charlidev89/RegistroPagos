import { createRouter, createWebHistory } from 'vue-router'
import PagosView from '../views/PagosView.vue'
import ResultadosView from '../views/ResultadosView.vue'

const routes = [
  {
    path: '/',
    name: 'pagos',
    component: PagosView
  },
  {
    path: '/resultados',
    name: 'resultados',
    component: ResultadosView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router