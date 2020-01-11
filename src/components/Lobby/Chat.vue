<template>
    <div class="container topBar">
        <v-row style="padding: 0">
            <v-col cols="12" class="chat">
                Chat
            </v-col>
            <v-col cols="12" class="content" id="chat">
                <v-row>
                    <Message v-for="message in this.$parent.chat"
                             v-bind:key="message.uuid"
                             v-bind:messager="message.messager"
                             v-bind:content="message.content"
                             v-bind:correct="message.correct"
                    />
                </v-row>
            </v-col>
            <v-col cols="12" class="input">
                <v-text-field id="text-input"
                              height="60px"
                              v-on:keydown="onEnter"
                              v-model="text"
                              autocomplete="off"></v-text-field>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import Message from "@/components/Lobby/Message";

    export default {
        name: "Chat",
        components: {Message},
        data() {
            return {
                text: ""
            }
        },
        methods: {
            sendMessage: function () {
                let comp = this;
                if (this.text !== "") {
                    comp.$parent.websocket.send(`{"task": "GuessDrawing", "message": "${comp.text}", "uuid": "${comp.generateUUID()}", "time": ${comp.$parent.time} }`);
                    comp.text = "";
                    setTimeout(function () {
                        document.getElementById('chat').scrollTop = 99999999;
                    }, 50);
                }
            },
            onEnter: function (e) {
                if (e.keyCode === 13) {
                    this.sendMessage();
                }
            },
            generateUUID: function () {
                var d = new Date().getTime();
                var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16;
                    if (d > 0) {
                        r = (d + r) % 16 | 0;
                        d = Math.floor(d / 16);
                    } else {
                        r = (d2 + r) % 16 | 0;
                        d2 = Math.floor(d2 / 16);
                    }
                    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
            }
        }
    }
</script>

<style scoped>
    .topBar {
        width: auto;
        padding: 0%;
        color: white;
        margin-top: 9%;
    }

    .container {
        position: relative;
        width: 100%;
        padding: 0%;
        margin-right: auto;
        margin-left: auto;
    }

    .chat {
        padding-left: 20px;
        background-color: #1c343d;
    }

    .content {
        background-color: rgba(255, 255, 255, 0.4);
        height: 500px;
        overflow-y: scroll;
        border: 2px #1c343d solid;
    }

    .input {
        background-color: rgba(255, 255, 255, 0.4);
        margin-top: 40px;
        height: 60px;
        overflow-y: scroll;
        border: 2px #1c343d solid;
    }

    .content::-webkit-scrollbar {
        width: 10px;
        display: inline-block;
    }

    /* Track */
    .content::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    .content::-webkit-scrollbar-thumb {
        background: #49666b;
    }

    /* Handle on hover */
    .content::-webkit-scrollbar-thumb:hover {
        background: #374e52;
    }
</style>