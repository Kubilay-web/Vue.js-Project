import { createRouter, createWebHistory } from 'vue-router'
import Login from "../components/LoginForm.vue"
import Register from "../components/RegisterForm.vue"
import IntroPage from "../components/Intro.vue"
import Report from "../components/ReportIssue.vue"
import Ticket from "../components/TicketPage.vue"

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/register',
    name: 'register',
    component: Register
  },

  {
    path: '/',
    name: 'intropage',
    component: IntroPage
  },

  {
    path: '/reportissue',
    name: 'reportissue',
    component: Report
  },

  {
    path: '/tickets',
    name: 'ticket',
    component: Ticket
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'register' && !sessionStorage.getItem('user')) {
    next('/login'); 
  } else {
    next(); 
  }
});

export default router;
