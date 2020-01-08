<template>
    <v-btn width="100%" tile  class="create-lobby-button" color="#1c343d" v-on:click="createGame">
        Create Lobby
    </v-btn>
</template>

<script>
    export default {
        name: "CreateLobbyButton",
        props: {
            websocket: WebSocket
        },
        methods: {
            createGame: function () {
                this.websocket.send('{"task": "CreateGame", "lobbyName": "Testerino" }');
            }
        },
    }
</script>

<style scoped>
.create-lobby-button {
    padding-left: 0px;
}
>>>.v-btn__content {
    color: white;
}
</style>