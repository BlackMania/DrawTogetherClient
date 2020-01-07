<template>
    <v-btn width="100%" tile class="join-lobby-button" color="#1c343d" v-bind:disabled="joinable">
        Join Lobby
    </v-btn>
</template>

<script>
    export default {
        name: "JoinLobbyButton",
        props: {
            lobbyId: String
        },
        data() {
            return {
                joinable: true
            }
        },
        watch: {
            lobbyId: function () {
                if(this.lobbyId != null)
                {
                    this.joinable = false;
                } else {
                    this.joinable = true;
                }
            }
        }
    }
</script>

<style scoped>
.join-lobby-button {

}

    >>>.v-btn__content {
        color: white;
    }
</style>