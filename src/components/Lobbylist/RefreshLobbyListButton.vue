<template>
    <v-btn width="100%" tile  class="create-lobby-button" color="#1c343d" v-on:click="refreshLobbyList">
        Refresh Lobby List
    </v-btn>
</template>

<script>
    export default {
        name: "RefreshLobbyListButton",
        props: {
            websocket: WebSocket
        },
        methods: {
            refreshLobbyList: function () {
                this.websocket.send('{"task": "GetGames"}');
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