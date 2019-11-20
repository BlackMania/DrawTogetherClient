<template>
    <v-container>
        <canvas style="background-color: white" id="can" width="800" height="800">
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
            y: 2
        }),
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
            draw: function() {
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