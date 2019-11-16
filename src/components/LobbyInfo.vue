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
                            <router-link style="width: 100%" v-bind:to="{ name: 'gameLobby', params: { lobbyId: lobbyId, webSocket: websocket } }">
                                <v-btn color="primary" width="100%">
                                    Join
                                </v-btn>
                            </router-link>
                        </v-card-title>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>

    export default {
        name: "LobbyInfo",
        props: {
            lobbyId: String,
            websocket: WebSocket,
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>