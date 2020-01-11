<template>
    <div>
        <v-btn width="33.3333333%" tile class="create-lobby-button" color="#1c343d" id="start-button" v-on:click="startGame">
            Start Game
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "StartGameButton",
        props: {
            websocket: WebSocket
        },
        methods: {
            startGame: function () {
                this.websocket.send('{"task": "StartGame" }');
            }
        }
    }
</script>

<style scoped>
    >>> .v-btn__content {
        color: white;
    }

    #start-button {
        width: 33.333333%;
        margin-top: 1%;
        margin-left: 33.333333%;
    }
</style>