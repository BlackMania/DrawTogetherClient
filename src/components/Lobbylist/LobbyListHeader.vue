<template>
    <v-col cols="12" class="table-header">
        <v-row>
            <v-col cols="10" class="game-name-header">
                GAME
            </v-col>
            <v-col cols="2">
                PLAYERS
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
    export default {
        name: "LobbyListHeader"
    }
</script>

<style scoped>
.table-header {
    background-color: #1c343d;
    color: white;
}

    .game-name-header {
        padding-left: 3%;
    }
</style>