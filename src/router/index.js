import { createRouter, createWebHistory } from 'vue-router/auto';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path:'/',
      name:'/main',
      component: ()=>import ('../views/main.vue')
    },
    {
      path:'/book',
      name:'/book',
      component: ()=>import ('../components/BookList.vue')
    },
  ] 
});

export default router;