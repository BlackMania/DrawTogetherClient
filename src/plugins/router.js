import Vue from 'vue'
import Router from 'vue-router'
import LobbyList from "@/components/Lobbylist/LobbyList";
import Lobby from "@/components/Lobby/Lobby";
import Login from "@/components/Login/Login";
import Menu from "@/components/Menu";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [

        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/",
            name: "",
            component: Menu,
            children: [
                {
                    path: 'lobbylist',
                    name: 'lobbylist',
                    component: LobbyList,
                },
                {
                    path: "lobby",
                    name: "lobby",
                    component: Lobby
                },
            ]
        }
    ]
})
