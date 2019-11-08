<template>
    <v-col cols="4" :id="playerName">
        <v-snackbar
                v-model="snackbar"
                :bottom="y === 'bottom'"
                :color="color"
                :left="x === 'left'"
                :multi-line="mode === 'multi-line'"
                :right="true"
                :timeout="timeout"
                :top="y === 'top'"
                :vertical="mode === 'vertical'"
        >
            {{ text }}
            <v-btn
                    dark
                    text
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
        <v-card>
            <v-card-actions>
                <v-card-title>
                    {{ playerName }}
                </v-card-title>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
    export default {
        name: "LobbyPlayer",
        props: {
            playerName: String
        },
        data () {
            return {
                color: '',
                mode: '',
                snackbar: true,
                text: 'New player joined: ' + this.playerName,
                timeout: 6000,
                x: null,
                y: 'top',
            }
        }
    }
</script>

<style scoped>

</style>