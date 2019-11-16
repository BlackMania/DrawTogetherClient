<template>
    <v-container>
        <v-container id="lobbyList">
            <h1 style="padding: 12px">Lobby list</h1>
        </v-container>
        <!-- Players are loaded in here -->
            <v-row id="container">
            </v-row>
        </v-container>
</template>

<script>
import Vue from 'vue'
import LobbyPlayer from "./LobbyPlayer";
import Lobby from "./Lobby";

    export default {
        name: "Game",
        data: () => ({
            websocket: null
        }),
        methods: {
        },
        created(){
            this.websocket = new WebSocket("ws://localhost:8090/ws/lobby/" + this.$session.get('jwttoken'));
            this.websocket.onmessage = function(message)
            {
                if(message.data === "You successfully connected")
                {
                    this.send('{"task": "GetGames"}');
                    return;
                }
                let json = JSON.parse(message.data);
                let task = json['task'];
                switch(task)
                {
                    case 'joinGame':
                        // eslint-disable-next-line no-case-declarations
                        let gameSessionId = json['gameSessionId'];
                        // eslint-disable-next-line no-case-declarations
                        let data = `{"task": "JoinGame", "nickname": "John", "gameSessionId": "${gameSessionId}"}`;
                        this.send(data);
                        break;
                    case 'addPlayers':
                        for(let i = 0; i < json['players'].length; i++)
                        {
                            // eslint-disable-next-line no-case-declarations
                            let ComponentClass = Vue.extend(LobbyPlayer);
                            let instance = new ComponentClass({
                                propsData: { playerName: json['players'][i] }
                            });
                            instance.$mount();
                            document.getElementById('container').append(instance.$el);
                        }
                        break;
                    case 'addNewPlayer':
                        // eslint-disable-next-line no-case-declarations
                        let ComponentClass = Vue.extend(LobbyPlayer);
                        // eslint-disable-next-line no-case-declarations
                        let instance = new ComponentClass({
                            propsData: { playerName: json['newPlayer'] }
                        });
                        instance.$mount();
                        document.getElementById('container').append(instance.$el);
                        break;
                    case 'removePlayer':
                        document.getElementById(json['removedPlayer']).remove();
                        break;
                    case 'updateGameList':
                        for(let i = 0; i < json['gameLobbys'].length; i++)
                        {
                            // eslint-disable-next-line no-case-declarations
                            let ComponentClass = Vue.extend(Lobby);
                            // eslint-disable-next-line no-case-declarations
                            let instance = new ComponentClass({
                                propsData: { lobbyId: json['gameLobbys'][i], webSocket: this }
                            });
                            instance.$mount();
                            document.getElementById('lobbyList').append(instance.$el);
                        }
                        break;
                }
            };
        },
        beforeRouteLeave(to, from, next) {
            this.websocket.close();
            next();
        }
    }
</script>

<style scoped>

</style>