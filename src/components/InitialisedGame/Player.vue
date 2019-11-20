<template>
    <v-container >
        <div id="game-player">
            <v-row>
                <v-col cols="6">
                    {{ playerName }}
                </v-col>
                <v-col cols="6">
                    {{ playerPoints }}
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
    export default {
        name: "Player",
        props: {
            playerName: String,
            playerPoints: Number
        }
    }
</script>

<style scoped>
#game-player {
    background-color: white;
    border: #f29333 2px solid;
}

    >>>.col {
        padding: 20px;
    }
</style>