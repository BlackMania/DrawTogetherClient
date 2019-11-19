<template>
    <div>
        <h1> {{ lobbyId }}</h1>
        <v-row>
        <LobbyPlayer
                v-for="player in playerList"
                v-bind:key="player.player"
                v-bind:player-name="player.player"
                v-bind:room-master="player.roomMaster"
        />
        </v-row>
        <v-row>
            <v-col cols="4"></v-col>
            <v-col cols="4"><v-btn color="primary" @click="startGame">Start Game</v-btn></v-col>
            <v-col cols="4"></v-col>
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
        methods: {
            startGame: function() {
                this.webSocket.send(`{ "task": "StartGame" }`);
            }
        },
        created() {
            var component = this;
            this.webSocket.send(`{ "task": "JoinGame", "gameSessionId": "${this.lobbyId}", "nickname": "${this.$session.get('username')}" }`);
            this.webSocket.onmessage = function(message)
            {
                let json = JSON.parse(message.data);
                let task = json['task'];
                let possibleError = json['error'];
                if(possibleError != null)
                {
                    component.$router.push("/main/play");
                }
                switch(task)
                {
                    case 'addPlayers':
                        for(let i = 0; i < json['players'].length; i++)
                        {
                            component.playerList.push({player: json['players'][i], roomMaster: json['roomMaster']});
                        }
                        break;
                    case 'addNewPlayer':
                        component.playerList.push({player: json['newPlayer'], roomMaster: json['newRoomMaster']});
                        break;
                    case 'removePlayer':
                        // eslint-disable-next-line no-case-declarations
                        let int = null;
                        for(let i = 0; i < component.playerList.length; i++)
                        {
                            if(component.playerList[i].player === json['removedPlayer'])
                            {
                                int = i;

                            }
                            if(component.playerList[i].player === json['newRoomMaster'])
                            {
                                for(let j = 0; j < component.playerList.length; j++)
                                {
                                    component.playerList[j].roomMaster = json['newRoomMaster'];
                                }
                            }
                        }
                        component.playerList.splice(int, 1);

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