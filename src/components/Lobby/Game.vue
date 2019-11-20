<template>
        <v-container id="lobbyList">
            <h1 style="padding: 12px">Lobby list</h1>
            <LobbyInfo
            v-for="lobby in this.lobbyList"
            v-bind:key="lobby"
            v-bind:lobby-id="lobby"
            v-bind:websocket="websocket"
            />
            <v-row>
                <v-col cols="4"></v-col>
                <v-col cols="4">
                    <v-btn color="primary" width="100%" @click="createGame">Create Game</v-btn></v-col>
                <v-col cols="4"></v-col>
            </v-row>
        </v-container>
</template>

<script>
import LobbyInfo from "./LobbyInfo";

    export default {
        name: "Game",
        components: {LobbyInfo},
        data: () => ({
            websocket: null,
            lobbyList: []
        }),
        methods: {
            createGame: function () {
                this.websocket.send('{"task": "CreateGame" }');
            }
        },
        created(){
            this.websocket= new WebSocket("ws://localhost:8090/ws/lobby/" + this.$session.get('jwttoken'));
            var component = this;
            var router = this.$router;
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
                        router.push({ name: 'gameLobby', params: { lobbyId: gameSessionId, webSocket: this } });
                        break;
                    case 'updateGameList':
                        for(let i = 0; i < json['gameLobbys'].length; i++)
                        {
                            component.lobbyList.push(json['gameLobbys'][i]);
                        }
                        break;
                }
            };
        },
        beforeRouteLeave(to, from, next) {
            if(to.path === "/main/lobby")
            {
                next();
            }
            else if(to.path === "/main/play")
            {
                next();
            }
            else
            {
                this.websocket.close();
                next();
            }
        }
    }
</script>

<style scoped>

</style>