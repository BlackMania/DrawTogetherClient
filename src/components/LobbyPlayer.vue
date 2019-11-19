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
                <div id="roomMaster">
                </div>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
    export default {
        name: "LobbyPlayer",
        props: {
            playerName: String,
            roomMaster: String
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
        },
        watch: {
            roomMaster: function() {
                if(this.playerName === this.roomMaster)
                {
                    let element = document.getElementById('roomMaster');
                    element.innerHTML = "Roommaster";
                }
            }
        },
        mounted() {
            if(this.playerName === this.roomMaster)
            {
                let element = document.getElementById('roomMaster');
                element.innerHTML = "Roommaster";
            }
        }
    }
</script>

<style scoped>

</style>