<template>
    <div>
        <v-container id="lobby-state">
            <h1> {{ lobbyId }}</h1>
            <v-row>
                <LobbyPlayer
                        v-for="player in playerList"
                        v-bind:key="player.player"
                        v-bind:player-name="player.player"
                        v-bind:room-master="player.roomMaster"
                />
            </v-row>
            <v-row>
                <v-col cols="4"></v-col>
                <v-col cols="4">
                    <v-btn color="primary" @click="startGame">Start Game</v-btn>
                </v-col>
                <v-col cols="4"></v-col>
            </v-row>
        </v-container>
        <v-container id="game-state">
            <v-row>
                <v-col cols="2">
                    <div id="player-list">
                        <Player v-for="p in this.initPlayerList"
                                v-bind:key="p.playerName"
                                v-bind:player-name="p.playerName"
                                v-bind:player-points="p.playerPoints"
                        />
                    </div>
                </v-col>
                <v-col cols="7">
                    <div id="word-count"></div>
                    <div class="timer">
                        <div id="timer">60</div>
                    </div>
                    <DrawCanvas/>
                </v-col>
                <v-col cols="3">
                    <Chat></Chat>
                </v-col>
            </v-row>
        </v-container>
        <div ref="container"></div>
    </div>
</template>

<script>
    import LobbyPlayer from "./LobbyPlayer";
    import DrawCanvas from "../InitialisedGame/DrawCanvas";
    import Player from "../InitialisedGame/Player";
    import Chat from "../InitialisedGame/Chat";
    import Vue from "vue";
    import ChooseWordOverlay from "../InitialisedGame/ChooseWordOverlay";

    export default {
        name: "Lobby",
        components: {Chat, Player, DrawCanvas, LobbyPlayer},
        props: {
            lobbyId: String,
            webSocket: WebSocket
        },
        data: () => ({
            playerList: [],
            initPlayerList: [],
            drawer: null

        }),
        methods: {
            startGame: function () {
                this.webSocket.send(`{ "task": "StartGame" }`);
            },
        },
        created() {
            var component = this;
            this.webSocket.send(`{ "task": "JoinGame", "gameSessionId": "${this.lobbyId}", "nickname": "${this.$session.get('username')}" }`);
            this.webSocket.onmessage = function (message) {
                let json = JSON.parse(message.data);
                let task = json['task'];
                let possibleError = json['error'];
                if (possibleError != null) {
                    component.$router.push("/main/play");
                }
                switch (task) {
                    case 'addPlayers':
                        for (let i = 0; i < json['players'].length; i++) {
                            component.playerList.push({player: json['players'][i], roomMaster: json['roomMaster']});
                        }
                        break;
                    case 'addNewPlayer':
                        component.playerList.push({player: json['newPlayer'], roomMaster: json['newRoomMaster']});
                        break;
                    case 'removePlayer':
                        // eslint-disable-next-line no-case-declarations
                        let int = null;
                        // eslint-disable-next-line no-case-declarations
                        let initPlayer = null;
                        for (let i = 0; i < component.playerList.length; i++) {
                            if (component.playerList[i].player === json['removedPlayer']) {
                                int = i;
                            }
                            if (component.initPlayerList[i].playerName === json['removedPlayer']) {
                                initPlayer = i;
                            }
                            if (component.playerList[i].player === json['newRoomMaster']) {
                                for (let j = 0; j < component.playerList.length; j++) {
                                    component.playerList[j].roomMaster = json['newRoomMaster'];
                                }
                            }
                        }
                        component.playerList.splice(int, 1);
                        component.initPlayerList.splice(initPlayer, 1);
                        break;
                    case 'startGame':
                        if (json['drawer'] === component.$session.get('username')) {
                            this.send('{ "task": "GetDrawWords" }');
                        }
                        component.drawer = json['drawer'];
                        document.getElementById("lobby-state").style.display = 'none';
                        for (let i = 0; i < json['playerData'].length; i++) {
                            component.initPlayerList.push(json['playerData'][i]);
                        }
                        document.getElementById("game-state").style.display = 'inline-block';
                        break;
                    case 'chooseWord':
                        // eslint-disable-next-line no-case-declarations
                        let wordArray = [];
                        wordArray.push(json['word1']);
                        wordArray.push(json['word2']);
                        wordArray.push(json['word3']);
                        // eslint-disable-next-line no-case-declarations
                        let ComponentClass = Vue.extend(ChooseWordOverlay);
                        // eslint-disable-next-line no-case-declarations
                        let instance = new ComponentClass({
                            propsData: { webSocket: this, words: wordArray }
                        });
                        instance.$mount();
                        component.$refs.container.appendChild(instance.$el)
                        break;
                    case 'wordSet':
                        // eslint-disable-next-line no-case-declarations
                        let word = "";
                        for(let i = 0; i < json['wordCount']; i++)
                        {
                            word += '_ ';
                        }
                        document.getElementById("word-count").innerHTML = word;
                        break;
                    case 'updateTimer':
                        document.getElementById('timer').innerHTML = json['currentTime'];
                        break;
                    case 'roundEnded':
                        alert('Round ended');
                        break;
                }
            };
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
    #game-state {
        display: none;
    }

    #word-count {
        text-align: center;
    }

    .timer {
        border-radius: 50px;
        border: 1px black solid;
        width: 60px;
        height: 60px;
        position: relative;
        margin-left: 1%;
    }

    #timer {
        position: absolute;
        left: 20px;
        top: 15px;
    }
</style>