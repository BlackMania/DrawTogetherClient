<template>
    <div style="margin-top: 3%">
        <div class="topBar">
            <v-row>
                <v-col cols="4" class="timer">
                    {{ getTime }}
                </v-col>
                <v-col cols="4" class="word-count">
                    {{getWordString}}
                </v-col>
                <v-spacer/>
            </v-row>

            </div>
        <canvas style="background-color: rgba(255,255,255, 0.4)" width="900" height="600" id="can">
        </canvas>
    </div>
</template>

<script>
    export default {
        name: "DrawCanvas",
        data: () => ({
            playerList: [],
            canvas: null,
            ctx: null,
            flag: null,
            prevX: 0,
            currX: 0,
            prevY: 0,
            currY: 0,
            dot_flag: false,
            x: "black",
            y: 2,
        }),
        props: {
            webSocket: WebSocket
        },
        computed: {
            getTime: function () {
                return this.$parent.time;
            },
            getWordString() {
                let count = this.$parent.wordCount;
                let string = "";
                for(let i = 0; i < count; i++)
                {
                    string += "_ ";
                }
                return string;
            }
        },
        methods: {
            initGame: function() {
                let comp = this;
                this.canvas = document.getElementById('can');
                this.ctx = this.canvas.getContext('2d');
                this.canvas.addEventListener("mousemove", function (e) {
                    comp.findXY('move', e)
                }, false);
                this.canvas.addEventListener("mousedown", function (e) {
                    comp.findXY('down', e)
                }, false);
                this.canvas.addEventListener("mouseup", function (e) {
                    comp.findXY('up', e)
                }, false);
                this.canvas.addEventListener("mouseout", function (e) {
                    comp.findXY('out', e)
                }, false);
                this.canvas.addEventListener("touchstart", function (e) {
                    comp.findXYTouch('down', e)
                }, false);
                this.canvas.addEventListener("touchend", function (e) {
                    comp.findXYTouch('up', e)
                }, false);
                this.canvas.addEventListener("touchmove", function (e) {
                    comp.findXYTouch('move', e)
                }, false);
                this.canvas.addEventListener("touchcancel", function (e) {
                    comp.findXYTouch('out', e)
                }, false);
            },
            findXY: function (res, e) {
                if(this.$parent.drawer !== this.$session.get('username')) return;
                if (res === 'down') {
                    this.prevX = this.currX;
                    this.prevY = this.currY;
                    this.currX = e.clientX - this.canvas.offsetLeft;
                    this.currY = e.clientY - this.canvas.offsetTop;
                    this.flag = true;
                    this.dot_flag = true;
                    if (this.dot_flag) {
                        this.ctx.beginPath();
                        this.ctx.fillStyle = this.x;
                        this.ctx.fillRect(this.currX, this.currY, 2, 2);
                        this.ctx.closePath();
                        this.dot_flag = false;
                    }
                }
                if (res === 'up' || res === "out") {
                    this.flag = false;
                }
                if (res === 'move') {
                    if (this.flag) {
                        this.prevX = this.currX;
                        this.prevY = this.currY;
                        this.currX = e.clientX - this.canvas.offsetLeft;
                        this.currY = e.clientY - this.canvas.offsetTop;
                        this.draw();
                    }
                }
            },
            findXYTouch: function (res, e) {
                if(this.$parent.drawer !== this.$session.get('username')) return;
                let touch = e.touches[0];
                if (res === 'down') {
                    this.prevX = this.currX;
                    this.prevY = this.currY;
                    this.currX = Math.round(touch.clientX) - this.canvas.offsetLeft;
                    this.currY = Math.round(touch.clientY) - this.canvas.offsetTop;
                    this.flag = true;
                    this.dot_flag = true;
                    if (this.dot_flag) {
                        this.ctx.beginPath();
                        this.ctx.fillStyle = this.x;
                        this.ctx.fillRect(this.currX, this.currY, 2, 2);
                        this.ctx.closePath();
                        this.dot_flag = false;
                    }
                }
                if (res === 'up' || res === "out") {
                    this.flag = false;
                }
                if (res === 'move') {
                    if (this.flag) {
                        this.prevX = this.currX;
                        this.prevY = this.currY;
                        this.currX = Math.round(touch.clientX) - this.canvas.offsetLeft;
                        this.currY = Math.round(touch.clientY) - this.canvas.offsetTop;
                        this.draw();
                    }
                }
            },
            draw: function() {
                this.webSocket.send(`{ "task": "SendCoordinates", "prevX": ${this.prevX}, "prevY": ${this.prevY}, "currX": ${this.currX}, "currY": ${this.currY}, "strokeStyle": "${this.x}", "lineWidth": ${this.y} }`);
                this.ctx.beginPath();
                this.ctx.moveTo(this.prevX, this.prevY);
                this.ctx.lineTo(this.currX, this.currY);
                this.ctx.strokeStyle = this.x;
                this.ctx.lineWidth = this.y;
                this.ctx.stroke();
                this.ctx.closePath();
            }
        },
        mounted() {
            window.onload = this.initGame();
        },
    }
</script>

<style scoped>
    #can {
        float: left;
        border: 2px #1c343d solid;
    }
    .topBar {
        background-color: #1c343d;
        width: 904px;
        padding: 1%;
        color: white;
    }

    .word-count {
        padding: 0px;
        text-align: center;
    }

    .timer {
        padding: 0px 0px 0px 2%;
    }
</style>