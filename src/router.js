import { createRouter, createWebHistory } from 'vue-router'

import Home from "./views/Home"
import About from "./views/About"
import ErrorPage from "./views/Error"

const routes = [
    {path: '/', name:'Home', component: Home },
    {path: '/about', name:'About', component: About },
    {path: '/:catchAll(.*)', name:'Error', component: ErrorPage } 
]

const router = createRouter({
    history: createWebHistory(),
    routes
}
)

export default router;
