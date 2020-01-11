<template>
    <v-col cols="12" style="padding: 0 0 0 4%;" class="message">
        {{ getFullMessage }}
    </v-col>
</template>

<script>
    export default {
        name: "Message",
        props: {
            messager: String,
            content: String,
            correct: Boolean
        },
        computed: {
            getFullMessage: function () {
                return this.messager + ": " + this.content;
            }
        }
    }
</script>

<style scoped>
.message {
    color: #1c343d;
    font-size: 20px;
}
</style>