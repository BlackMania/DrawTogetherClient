<template>
    <div>
        <v-btn width="33.3333333%" tile class="create-lobby-button" color="#1c343d" id="leave-button">
            Leave Game
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "LeaveLobbyButton"
    }
</script>

<style scoped>
    >>> .v-btn__content {
        color: white;
    }

    #leave-button {
        width: 33.333333%;
        margin-left: 33.333333%;
    }
</style>