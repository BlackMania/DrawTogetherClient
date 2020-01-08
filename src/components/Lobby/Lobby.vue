<template>
    <div class="lobby">
        <h1 class="lobby-name">Testlobby</h1>
        <v-row>
            <Player v-for="name in players"
                    v-bind:key="name"
                    v-bind:user-name="name"/>
        </v-row>
        <LeaveLobbyButton/>
        <StartGameButton/>
    </div>
</template>

<script>
    import Player from "@/components/Lobby/Player";
    import StartGameButton from "@/components/Lobby/StartGameButton";
    import LeaveLobbyButton from "@/components/Lobby/LeaveLobbyButton";

    export default {
        name: "Lobby",
        components: {LeaveLobbyButton, StartGameButton, Player},
        props: {
            websocket: WebSocket
        },
        data() {
            return {
                players: [],
                roomMaster: null,
            }
        },
        created() {
            let comp = this;

            this.websocket.onmessage = new function (message) {
                let json = JSON.parse(message.data);
                if(json.hasOwnProperty("error")) {
                    alert(json.error);
                }
                switch(json.task) {
                    case "addPlayers":
                        for(let i = 0; json.players; i++)
                        {
                            comp.players.push(json.players[i]);
                        }
                        comp.roomMaster = json.roomMaster;
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    .lobby {
        margin: 2% auto auto;
        width: 50%;
    }

    .lobby-name {
        text-align: center;
        color: white;
    }
</style>