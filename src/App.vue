<template>
    <v-app :style="{background: this.$vuetify.theme.themes[theme].background}">
        <router-view></router-view>
    </v-app>
</template>

<script>

    export default {
        name: 'App',

        data: () => ({}),
        created() {
            // ToDo
            // Fix when refreshing in main/play that it route to main/dashboard but to main/play instead
            if (!this.$session.exists()) {
                this.$router.push('/login');
            }
            else this.$router.push('/main/dashboard')
        },
        computed: {
            theme() {
                return (this.$vuetify.theme.light) ? 'dark' : 'light'
            }
        }
    };
</script>
