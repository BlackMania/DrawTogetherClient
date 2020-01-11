<template>
    <div class="lobby">
        <h1 class="lobby-name">Testlobby</h1>
        <v-row>
            <Player ref="playerList" v-for="data in players"
                    v-bind:key="data.name"
                    v-bind:user-name="data.name"
                    v-bind:points="data.points"
            />
        </v-row>
        <LeaveLobbyButton v-if="!started" v-bind:websocket="websocket"/>
        <StartGameButton v-if="!started" v-bind:websocket="websocket"/>
        <v-row>
            <v-col cols="9">
                <DrawCanvas v-bind:web-socket="websocket" v-if="started" ref="drawbord"/>
            </v-col>
            <v-col cols="3">
                <Chat v-if="started"/>
            </v-col>
        </v-row>
        <div ref="chooseWordOverlay"></div>
    </div>
</template>

<script>
    import Player from "@/components/Lobby/Player";
    import StartGameButton from "@/components/Lobby/StartGameButton";
    import LeaveLobbyButton from "@/components/Lobby/LeaveLobbyButton";
    import DrawCanvas from "@/components/Lobby/DrawCanvas";
    import ChooseWordOverlay from "@/components/Lobby/ChooseWordOverlay";
    import Vue from "vue";
    import Chat from "@/components/Lobby/Chat";

    export default {
        name: "Lobby",
        components: {Chat, DrawCanvas, LeaveLobbyButton, StartGameButton, Player},
        props: {
            websocket: WebSocket
        },
        data() {
            return {
                players: [],
                roomMaster: null,
                started: false,
                drawer: null,
                time: 60,
                wordCount: null,
                chat: []
            }
        },
        methods: {
            logRef: function () {
                window.console.log(this.$refs.playerList);
            },
            erase: function () {
                let bord = this.$refs.drawbord;
                bord.canvas = document.getElementById('can');
                bord.ctx = bord.canvas.getContext('2d');
                bord.ctx.clearRect(0, 0, 900, 600);
            },
            setDrawer: function (newVal) {
                this.drawer = newVal;
            },
            getDrawWords: function() {
                this.websocket.send('{ "task": "GetDrawWords" }');
            }
        },
        created() {
            let comp = this;
            this.websocket.onmessage = function (message) {
                window.console.log(message.data);
                let json = JSON.parse(message.data);

                if (json.hasOwnProperty("error")) {
                    alert(json.error);
                    return;
                }
                switch (json.task) {
                    case "addPlayers":
                        for (let i = 0; i < json.players.length; i++) {
                            if (!comp.players.filter(e => e.name === json.players[i]).length > 0) {
                                comp.players.push(JSON.parse(`{"name": "${json.players[i]}", "points": 0}`));
                            }
                        }
                        comp.roomMaster = json.roomMaster;
                        break;
                    case "removePlayer":
                        // eslint-disable-next-line no-case-declarations
                        let index = comp.players.map(e => e.name).indexOf(json.removedPlayer);
                        comp.roomMaster = json.newRoomMaster;
                        comp.players.splice(index, 1);
                        break;
                    case "startGame":
                        comp.started = true;
                        comp.drawer = json.drawer;
                        if(comp.$session.get("username") === comp.drawer)
                        {
                            comp.websocket.send('{ "task": "GetDrawWords" }');
                        }
                        for (let i = 0; i < json.playerData; i++) {
                            let index = comp.players.map(e => e.name).indexOf(json.playerData[i].playerName);
                            comp.players[index].points = json.playerData[i].playerPoints;
                        }
                        break;
                    case "chooseWord":
                        // eslint-disable-next-line no-case-declarations
                        let wordArray = [];
                        wordArray.push(json['word1']);
                        wordArray.push(json['word2']);
                        wordArray.push(json['word3']);
                        // eslint-disable-next-line no-case-declarations
                        let ComponentClass = Vue.extend(ChooseWordOverlay);
                        // eslint-disable-next-line no-case-declarations
                        let instance = new ComponentClass({
                            propsData: {webSocket: this, words: wordArray}
                        });
                        instance.$mount();
                        comp.$refs.chooseWordOverlay.appendChild(instance.$el);
                        break;
                    case "wordSet":
                        comp.wordCount = json.wordCount;
                        break;
                    case 'addCoordinate':
                        if (comp.drawer !== comp.$session.get("username")) {
                            // eslint-disable-next-line no-case-declarations
                            let bord = comp.$refs.drawbord;
                            bord.canvas = document.getElementById('can');
                            bord.ctx = bord.canvas.getContext('2d');
                            bord.ctx.beginPath();
                            bord.ctx.moveTo(json['prevX'], json['prevY']);
                            bord.ctx.lineTo(json['currX'], json['currY']);
                            bord.ctx.strokeStyle = json['strokeStyle'];
                            bord.ctx.lineWidth = json['lineWidth'];
                            bord.ctx.stroke();
                            bord.ctx.closePath();
                        }
                        break;
                    case "updateTimer":
                        comp.time = json.time;
                        break;
                    case "endRound":
                        comp.erase();
                        comp.setDrawer(json.newDrawer);
                        // eslint-disable-next-line no-case-declarations
                        let newData = json.data;
                        for(let i = 0; i < newData.length; i++)
                        {
                            let index = comp.players.map(e => e.name).indexOf(newData[i].playerName);
                            comp.players[index].points = newData[i].points;
                        }
                        setTimeout(function () {
                            if(comp.$session.get("username") === comp.drawer)
                            {
                                comp.websocket.send('{ "task": "GetDrawWords" }');
                            }
                        }, 2000);
                        break;
                    case "updateChat":
                        comp.chat.push(JSON.parse(`{"uuid": "${json.uuid}", "content": "${json.message}", "messager": "${json.messager}", "correct": ${json.correct} }`));
                        break;
                    case "endGame":
                        comp.started = false;
                        for(let i = 0; i < comp.players.length; i++)
                        {
                            comp.players[i].points = 0;
                        }
                        comp.chat = [];
                        break;
                }
            };
        },
        beforeRouteLeave(to, from, next) {
            let comp = this;
            setTimeout(function () {
                comp.websocket.close();
            }, 1000);
            next();
        }
    }
</script>

<style scoped>
    .lobby {
        margin: 2% auto auto;
        width: 50%;
    }

    .lobby-name {
        text-align: center;
        color: white;
    }
</style>