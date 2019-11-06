<template>
    <v-container>
        <v-overlay
            :value="overlay"
        >
            <v-card tile color="secondbackground">
                <v-card-actions>
                    <v-card-title><v-btn color="primary" @click="joinMessage" width="20vh">Join Game</v-btn></v-card-title>
                </v-card-actions>
                <v-card-actions>
                    <v-card-title><v-btn color="primary" @click="sendMessage" width="20vh">Create Game</v-btn></v-card-title>
                </v-card-actions>
            </v-card>
        </v-overlay>

        <div id="testWebsocket">
        </div>
    </v-container>
</template>

<script>

    export default {
        name: "Lobby",
        data: () => ({
            overlay: true,
            websocket: null
        }),
        methods: {
            sendMessage: function() {
                this.websocket.send('{"task": "CreateGame"}');
                this.overlay = !this.overlay;
            },
            joinMessage: function() {
                this.websocket.send(`{"gameSessionId":"3434200c-7f2b-41a8-a3c6-9870755dc309","task":"JoinGame", "nickname": "Albert"}`);
                this.overlay = !this.overlay;
            }
        },
        created(){
            this.websocket = new WebSocket("ws://localhost:8090/ws/lobby/" + this.$session.get('jwttoken'));
            this.websocket.onmessage = function(message)
            {
                let json = JSON.parse(message.data);
                let task = json['task'];
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
                        for(let i = 0; i < json['players'].length; i++)
                        {
                            document.getElementById('testWebsocket').innerHTML += json['players'][i];
                        }
                        break;
                    case 'addNewPlayer':
                        // eslint-disable-next-line no-case-declarations
                        let html = `<v-card id="${json['newPlayer']}"><v-card-actions><v-card-title>${json['newPlayer']}</v-card-title></v-card-actions></v-card>`;
                        document.getElementById('testWebsocket').innerHTML += html;
                        break;
                    case 'removePlayer':
                        document.getElementById(json['removedPlayer']).remove();

                }
            }
        },
        beforeRouteLeave(to, from, next) {
            this.websocket.close();
            next();
        }
    }
</script>

<style scoped>

</style>