import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Register from "../components/Register";
import Main from "../components/Main";
import Dashboard from "@/components/Dashboard";
import GameLobby from "@/components/GameLobby";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/main',
            name: 'main',
            component: Main,
            children: [
                {
                    path: 'dashboard',
                    component: Dashboard
                },

                {
                    path: 'play',
                    component: GameLobby
                }
            ]
        },
    ]
})
