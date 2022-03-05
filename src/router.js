import { createRouter, createWebHistory } from 'vue-router'

import Home from "./views/Home"
import About from "./views/About"
import ErrorPage from "./views/Error"
import CoinDetail from "./views/CoinDetail"

const routes = [
    {path: '/', name:'Home', component: Home },
    {path: '/about', name:'About', component: About },
    {path: '/coin/:id', name:'CoinDetail', component: CoinDetail },
    {path: '/:catchAll(.*)', name:'Error', component: ErrorPage } 
]

const router = createRouter({
    history: createWebHistory(),
    routes
}
)

export default router;
