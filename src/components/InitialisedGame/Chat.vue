<template>
    <v-container>
        <div id="chat">

        </div>
        <input id="messageInput"/>
    </v-container>
</template>

<script>
    export default {
        name: "Chat",
        props: {
            webSocket : WebSocket
        },
        mounted() {
            const comp = this;
            const messageElement = document.getElementById('messageInput');
            messageElement.addEventListener("keyup", function(event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    comp.webSocket.send(`{"task": "GuessDrawing", "message": "${messageElement.value}"}`);
                    messageElement.value = "";
                }
            });
        }
    }
</script>

<style scoped>
#chat {
    width: auto;
    height: 600px;
    background-color: white;
    border: 2px #f29333 solid;
}
    #messageInput {
        background-color: white;
        width: 100%;
        padding: 2px;
        margin-top: 2%;
        border: 2px #f29333 solid;
    }
</style>