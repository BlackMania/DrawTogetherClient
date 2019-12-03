<template>
    <v-container>
        <canvas style="background-color: white" width="900" height="600" id="can">
        </canvas>
    </v-container>
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
                this.webSocket
                    .send(`{ "task": "SendCoordinates", "prevX": "${this.prevX}", "prevY": "${this.prevY}", "currX": "${this.currX}", "currY": "${this.currY}", "strokeStyle": "${this.x}", "lineWidth": "${this.y}" }`);
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
        border: 2px #f29333 solid;
    }
</style>