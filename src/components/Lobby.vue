<template>
    <v-col cols="12">
        <v-card>
            <v-card-actions>
                <v-row>
                    <v-col cols="10">
                        <v-card-title>
                            {{ lobbyId }}
                        </v-card-title>
                    </v-col>
                    <v-col cols="2">
                        <v-card-title>
                            <v-btn @click="joinGame" width="100%" color="primary">Join</v-btn>
                        </v-card-title>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
    export default {
        name: "Lobby",
        props: {
            lobbyId: String,
            webSocket: WebSocket
        },
        methods: {
            joinGame: function() {
                this.websocket.send(`{"task": "JoinGame", "gameSessionId": "${this.lobbyId}", "nickname": "${this.$session.get("username")}"}`);
            }
        }
    }
</script>

<style scoped>

</style>