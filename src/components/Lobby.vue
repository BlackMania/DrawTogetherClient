<template>
    <div>
        <h1> {{ lobbyId }}</h1>
        <v-row>
        <LobbyPlayer
                v-for="player in playerList"
                v-bind:key="player"
                v-bind:player-name="player"
        />
        </v-row>
    </div>
</template>

<script>
    import LobbyPlayer from "@/components/LobbyPlayer";
    export default {
        name: "Lobby",
        components: {LobbyPlayer},
        props: {
            lobbyId: String,
            webSocket: WebSocket
        },
        data: () => ({
            playerList: []
        }),
        created() {
            var component = this;
            this.webSocket.send(`{ "task": "JoinGame", "gameSessionId": "${this.lobbyId}", "nickname": "${this.$session.get('username')}" }`);
            this.webSocket.onmessage = function(message)
            {
                let json = JSON.parse(message.data);
                let task = json['task'];
                switch(task)
                {
                    case 'addPlayers':
                        for(let i = 0; i < json['players'].length; i++)
                        {
                            component.playerList.push(json['players'][i]);
                        }
                        break;
                    case 'addNewPlayer':
                        component.playerList.push(json['newPlayer']);
                        break;
                    case 'removePlayer':
                        // eslint-disable-next-line no-case-declarations
                        let int = component.playerList.indexOf(json['removedPlayer']);
                        component.playerList.splice(int, 1);
                        break;
                }
            };
        },
        beforeRouteLeave(to, from, next) {
            this.webSocket.close();
            next();
        }
    }
</script>

<style scoped>

</style>