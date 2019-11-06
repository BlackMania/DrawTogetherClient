<template>
    <v-container>
        <v-overlay
            :value="overlay"
        >
            <v-card tile color="secondbackground">
                <v-card-actions>
                    <v-card-title><v-btn color="primary" @click="overlay = !overlay" width="20vh">Join Game</v-btn></v-card-title>
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
                this.overlay = !this.overlay;
                let input = '{ "task": "CreateGame" }';
                this.websocket.send(input);
            }
        },
        created(){
            this.websocket = new WebSocket("ws://localhost:8090/ws/lobby/" + this.$session.get('jwttoken'));
            this.websocket.onmessage = function(message)
            {
                document.getElementById('testWebsocket').innerText += message.data+ "\n";
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