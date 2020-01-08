<template>
    <v-col cols="4" class="container">
        <div class="image">

        </div>
        <div class="text">
            {{userName}}
        </div>
        <div class="room-master">
            Roommaster
        </div>
    </v-col>
</template>

<script>
    export default {
        name: "Player",
        props: {
            userName: String,
            roomMaster: Boolean
        }
    }
</script>

<style scoped>
    .container {
        max-width: 31.33333333333333%;
        background-color: rgba(55, 78, 82, 0.8);
        position: relative;
        /* 8:5 Aspect Ratio */
        padding-top: 31.33333333333333%;
        border-radius: 100px;
        margin: 1%;
        border: 2px solid #374e52;
    }

    .text {
        position:  absolute;
        left: 0;
        bottom: 8%;
        right: 0;
        text-align: center;
        font-size: 20px;
        color: white;
    }

    .image {
        position:  absolute;
        margin: auto;
        top: 10%;
        left: 15%;
        right: 15%;
        bottom: 10%;
        text-align: center;
        font-size: 20px;
        color: white;
        background-image: url("../../assets/user_male2-512.png");
        background-size: contain;
    }

    .room-master {
        position:  absolute;
        left: 0;
        bottom: 4%;
        right: 0;
        text-align: center;
        color: white;
        font-size: 15px;
    }
</style>