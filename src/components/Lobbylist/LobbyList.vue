<template>
    <div class="lobby-list">
        <h1 class="lobby-header-text">LOBBY LIST</h1>
        <v-row>
            <LobbyListHeader/>
            <div class="lobby-items">
                <LobbyListItem v-for="lobby in lobbies"
                               v-bind:lobby-name="lobby.lobbyName"
                               v-bind:lobby-id="lobby.lobbyId"
                               v-bind:key="lobby.lobbyId"
                               v-bind:player-count="lobby.playerCount"
                />
            </div>
            <v-col cols="0"/>
            <v-spacer/>
            <v-col cols="4">
                <CreateLobbyButton v-bind:websocket="websocket"/>
            </v-col>
            <v-col cols="4" style="padding-right: 0">
                <JoinLobbyButton v-bind:lobby-id="selectedLobby" v-bind:websocket="websocket"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import LobbyListItem from "@/components/Lobbylist/LobbyListItem";
    import LobbyListHeader from "@/components/Lobbylist/LobbyListHeader";
    import CreateLobbyButton from "@/components/Lobbylist/CreateLobbyButton";
    import JoinLobbyButton from "@/components/Lobbylist/JoinLobbyButton";

    export default {
        name: "Lobbies",
        components: {JoinLobbyButton, CreateLobbyButton, LobbyListHeader, LobbyListItem},
        data() {
            return {
                selectedLobby: null,
                lobbies: [],
                websocket: null
            }
        },
        created() {
            this.websocket= new WebSocket("ws://localhost:8090/ws/lobby/" + this.$session.get('token'));
            let comp = this;

            this.websocket.onmessage = function (message) {
                window.console.log(message.data);
                if (message.data === "You successfully connected") {
                    this.send('{"task": "GetGames"}');
                    return;
                }
                let json = JSON.parse(message.data);
                if (json.hasOwnProperty('error')) {
                    alert(json.error);
                }
                switch (json.task) {
                    case "updateGameList":
                        var lobbies = json.gameLobbys;
                        for (let i = 0; i < lobbies.length; i++) {
                            comp.lobbies.push(JSON.parse(`{"lobbyId": "${lobbies[i].lobbyId}", "lobbyName": "${lobbies[i].lobbyName}", "playerCount": 2}`));
                        }
                        break;
                    case "joinGame":

                        this.send(`{ "task": "JoinGame", "gameSessionId": "${json.gameSessionId}", "nickname": "${comp.$session.get('username')}" }`);
                        comp.$router.push({name: 'lobby', params: {websocket: this}});
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    .lobby-list {
        width: 50%;
        margin: 10% auto auto;
    }

    .lobby-header-text {
        color: white;
    }

    .lobby-items {
        width: 100%;
        max-height: 490px;
        overflow-y: scroll;
    }

    /* width */
    .lobby-items::-webkit-scrollbar {
        width: 10px;
        display: inline-block;
    }

    /* Track */
    .lobby-items::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    .lobby-items::-webkit-scrollbar-thumb {
        background: #49666b;
    }

    /* Handle on hover */
    .lobby-items::-webkit-scrollbar-thumb:hover {
        background: #374e52;
    }
</style>