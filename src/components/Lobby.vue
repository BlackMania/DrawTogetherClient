<template>
    <v-col cols="12">
        {{ lobbyId }}
    </v-col>
</template>

<script>
    export default {
        name: "Lobby",
        props: {
            lobbyId: String
        }
    }
</script>

<style scoped>

</style>