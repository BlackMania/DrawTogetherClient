<template>
    <v-overlay :value="overlay">
        <v-row>
            <v-col cols="4">
                <button @click="sendWord" :value="words[0]" >
                    {{ words[0] }}
                </button>
            </v-col>
            <v-col cols="4">
                <button @click="sendWord" :value="words[1]" >
                    {{ words[1] }}
                </button>
            </v-col>
            <v-col cols="4">
                <button @click="sendWord" :value="words[2]" >
                    {{ words[2] }}
                </button>
            </v-col>
        </v-row>
    </v-overlay>
</template>

<script>
    export default {
        name: "ChooseWordOverlay",
        props: {
            webSocket: WebSocket,
            words: Array
        },
        methods: {
            sendWord: function (event) {
                let innerHtml = event.target.value;
                this.overlay = !this.overlay;
                this.webSocket.send(`{"task": "SetWord", "word": "${innerHtml}"}`);
            }

        },
        data() {
            return {
                overlay: true
            }
        },
        beforeRouteLeave(to, from, next) {
            if(to.path === "/main/lobby")
            {
                next();
            }
            else if(to.path === "/main/play")
            {
                next();
            }
            else
            {
                this.webSocket.close();
                next();
            }
        }
    }
</script>

<style scoped>
 button {
     background-color: #f29333;
     width: 100%;
     padding: 20px;
 }
</style>