// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/LoginView.vue'),
      },
      {
        path: 'signup',
        name: 'Signup',
        component: () => import('@/views/SignupView.vue'),
      },
      {
        path: 'user',
        name: 'User',
        props: true,
        component: () => import('@/views/UserView.vue'),
      },
      {
        path: 'play',
        name: 'Play',
        component: () => import('@/views/MenuView.vue'),
      },
      {
        path: 'leaderboard',
        name: 'LeaderBoard',
        component: () => import('@/views/LeaderBoardView.vue'),
      },
      {
        path: 'game',
        name: 'Game',
        component: () => import('@/views/GameView.vue'),
      },
      {
        path: 'waitingroom/:id',
        name: 'WaitingRoom',
        component: () => import('@/views/WaitingRoomView.vue'),
        props: true
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
