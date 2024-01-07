import { createRouter, createWebHashHistory } from "vue-router"
import LoginForm from "../views/LoginForm.vue"
import RegisterForm from "../views/RegisterForm.vue"
import UserList from '../views/User/UserList.vue'

const routes = [
    {path: "/", component: LoginForm},
    {path: "/register", component: RegisterForm},
   {path: "/DashBoard", component: UserList},
    { path: "/:catchAll(.*)", component: Error },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
