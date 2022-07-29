import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import ('../views/Tarefa-Lista.vue')
  },
  {
    path: '/ativo',
    name: 'ativo',
    props: { filtro: 'ativo'},
    component: () => import ('../views/Tarefa-Lista.vue')
  },
  {
    path: '/completa',
    name: 'completa',
    props: { filtro: 'completa'},
    component: () => import ('../views/Tarefa-Lista.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;