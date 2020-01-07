<template>
    <v-col cols="12" class="lobby-item" v-on:click="setLobby">
        <v-row>
            <v-col cols="10" class="item-text game-name">
                {{lobbyName}}
            </v-col>
            <v-col cols="2" class="item-text player-count">
                {{playerCount}} / 6
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
    export default {
        name: "LobbyListItem",
        props: {
            websocket: WebSocket,
            lobbyName: String,
            playerCount: Number,
            lobbyId: String
        },
        methods: {
            setLobby: function (event) {
                let dom = document.getElementsByClassName("lobby-item");
                for(let i = 0; i < dom.length; i++)
                {
                    dom[i].classList.remove("active");

                }
                if(event.target.classList.contains("col-10"))
                {
                    let dom = event.target.offsetParent;
                    dom.classList.add("active");
                } else {
                    event.target.classList.add("active");
                }
                this.$parent.selectedLobby = "Test";
            }
        }
    }
</script>

<style scoped>
.lobby-item {
    background-color: black;
    color: white;
    background-color: rgba(0,0,0,0.2);
    position: relative;
}

.active {
    background-color: rgba(0,0,0,0.4) !important;
}

.lobby-item:hover {
    background-color: rgba(0,0,0,0.4);
    cursor: pointer;
}

.lobby-item::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 96%;
    left: 2%;
    border-top: 1px solid #374e52;
}

    .item-text {
        z-index: 1;
    }
    .player-count {
        padding-left: 3%;
    }
    .game-name {
        padding-left: 3%;
    }
</style>