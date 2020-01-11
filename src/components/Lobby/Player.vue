<template>
    <v-col :cols="colSize" :class="checkGameStarted">
        <div class="image">

        </div>
        <div class="text">
            {{userName}}
        </div>
        <div v-if="checkRoomMaster" class="room-master">
            Roommaster
        </div>
        <div v-if="checkGameStartedBool" class="points">
            {{ points }}
        </div>
    </v-col>
</template>

<script>
    export default {
        name: "Player",
        props: {
            userName: String,
            points: Number
        },
        data() {
            return {
                colSize: 4,
            }
        },
        computed: {
            checkRoomMaster: function () {
                return this.$parent.roomMaster === this.userName;
            },
            checkGameStarted: function () {
                if(this.$parent.started)
                {
                    return "containerStarted";
                }
                else return "container";
            },
            checkGameStartedBool: function () {
                return this.$parent.started;
            }
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

    .containerStarted {
        max-width: 16.66666666666667%;
        background-color: rgba(55, 78, 82, 0.8);
        position: relative;
        /* 8:5 Aspect Ratio */
        padding-top: 16.66666666666667%;
        max-height: 20px;
        border-radius: 100px;
        margin: 1%;
        border: 2px solid #374e52;
    }

    .text {
        position: absolute;
        left: 0;
        bottom: 8%;
        right: 0;
        text-align: center;
        font-size: 20px;
        color: white;
    }

    .image {
        position: absolute;
        height: auto;
        top: 10%;
        left: 15%;
        right: 15%;
        bottom: 10%;
        background-image: url("../../assets/user_male2-512.png");
        background-size: contain;
    }

    .room-master {
        position: absolute;
        left: 0;
        bottom: 4%;
        right: 0;
        text-align: center;
        color: white;
        font-size: 15px;
    }

    .points {
        position: relative;
        text-align: center;
        color: white;
        margin-top: 10%;
        background-color: rgba(55, 78, 82, 0.8);
        border-radius: 100px;
        border: 2px solid #374e52;
    }
</style>