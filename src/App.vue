<template>
    <v-app id="app">
       <router-view>
       </router-view>
    </v-app>
</template>

<script>

    export default {
        name: 'App',

    };
</script>

<style scoped>
    #app {
        background-image: url("../src/assets/background.jpg");
        background-size: cover;
    }
</style>
