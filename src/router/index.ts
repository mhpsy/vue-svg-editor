import {createRouter, createWebHistory} from 'vue-router'
import home from '../views/home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'home',
            component: home
        },
        {
            path: '/setting',
            name: 'setting',
            component: () => import('../views/setting.vue')
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('../views/test.vue')
        }
    ]
})

export default router
