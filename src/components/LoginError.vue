<template>
        <v-dialog
                v-model="dialog"
                max-width="290"
        >
            <v-card>
                <v-card-title class="headline">Your credentials didnt match</v-card-title>

                <v-card-text>
                    Did you make a typo?
                </v-card-text>
            </v-card>
        </v-dialog>
</template>

<script>
    export default {
        name: "LoginError",
        created()
        {
            let vm = this;
            vm.dialog = true;
        }
    }
</script>

<style scoped>

</style>