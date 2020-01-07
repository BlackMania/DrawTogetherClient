<template>
    <div class="lobby">
        <h1 class="lobby-name">Testlobby</h1>
        <v-row>
            <Player/>
            <Player/>
            <Player/>
            <Player/>
            <Player/>
            <Player/>
        </v-row>
        <LeaveLobbyButton/>
        <StartGameButton/>
    </div>
</template>

<script>
    import Player from "@/components/Lobby/Player";
    import StartGameButton from "@/components/Lobby/StartGameButton";
    import LeaveLobbyButton from "@/components/Lobby/LeaveLobbyButton";

    export default {
        name: "Lobby",
        components: {LeaveLobbyButton, StartGameButton, Player}
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