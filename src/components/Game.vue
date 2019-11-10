<template>
    <v-container>
        <v-container id="lobbyListContainer">
            <v-card id="lobbyList">
            </v-card>
            <v-btn color="primary" id="btn-create-game">Create Game</v-btn>
        </v-container>
        <v-container id="playerContainer" style="display: none">
            <v-row id="playerList">

            </v-row>
            <v-row>
                <v-col cols="4"></v-col>
                <v-col cols="4">
                </v-col>
                <v-col cols="4">
                    <v-btn style="float: right; margin-left: 2%" color="primary">Start Game</v-btn>
                    <v-btn style="float: right" color="primary" @click="leaveGame">Leave Lobby</v-btn>
                </v-col>
            </v-row>
        </v-container>

        <v-container id="drawPhase">

        </v-container>

        </v-container>
</template>

<script>
import Vue from 'vue'
import LobbyPlayer from "./LobbyPlayer";
import Lobby from "./Lobby";

    export default {
        name: "Game",
        data () {
            return {
                overlay: true,
                websocket: null
            }
        },
        methods: {
            leaveGame: function() {
                this.websocket.send('{"task": "LeaveGame" }');
                this.$router.push("/main/dashboard");
            }
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
                if(json['status'] != null)
                {
                    switch(json['taskerror'])
                    {
                        case 'JoinGame':
                            alert("You are already in a game or the game doesnt exist anymore");
                            break;
                    }
                }
                switch(task)
                {
                    case 'JoinGame':
                        // eslint-disable-next-line no-case-declarations
                        let gameSessionId = json['gameSessionId'];
                        // eslint-disable-next-line no-case-declarations
                        let data = `{"task": "JoinGame", "nickname": "John", "gameSessionId": "${gameSessionId}"}`;
                        this.send(data);
                        break;
                    case 'addPlayers':
                        document.getElementById('lobbyListContainer').remove();
                        document.getElementById('playerContainer').style.display = "inline-block";

                        for(let i = 0; i < json['players'].length; i++)
                        {
                            // eslint-disable-next-line no-case-declarations
                            let ComponentClass = Vue.extend(LobbyPlayer);
                            let instance = new ComponentClass({
                                propsData: { playerName: json['players'][i] }
                            });
                            instance.$mount();
                            document.getElementById('playerList').append(instance.$el);
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
                        document.getElementById('playerList').append(instance.$el);
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
                                propsData: { lobbyId: json['gameLobbys'][i], websocket: this }
                            });
                            instance.$mount();
                            document.getElementById('lobbyList').appendChild(instance.$el);
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
#btn-create-game {
    margin-top: 2%;
    margin-left: 80%;
    width: 20%;
}
</style>