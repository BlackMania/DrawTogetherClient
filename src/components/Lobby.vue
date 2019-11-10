<template>

    <v-card-actions>
        <v-row>
            <v-col cols="6">
                <v-card-title class="lobby-title">
                    {{lobbyId}}
                </v-card-title>
            </v-col>
            <v-col cols="6">
                <v-btn @click="joinGame" class="join-button" color="primary">
                    Join
                    <v-icon  right>fas fa-chevron-right</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-card-actions>
</template>

<script>
    export default {
        name: "Lobby",
        props: {
            lobbyId: String,
            websocket: WebSocket
        },
        methods: {
            joinGame: function() {
                this.websocket.send(`{"task": "JoinGame", "gameSessionId": "${this.lobbyId}", "nickname": "${this.$session.get('username')}" }`)
            }
        }
    }
</script>

<style scoped>
.join-button {
    margin-left: 80%;
    width: 20%;
}

    .lobby-title {
        text-align: center;
    }
</style>