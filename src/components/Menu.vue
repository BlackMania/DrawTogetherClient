<template>
    <v-card
            height="300"
            width="300"
            min-height="100vh"
            tile
    >
        <v-navigation-drawer
                dark
                src="../assets/background-1.jpg"
                width="100%"
                permanent
                floating
        >
            <v-list>
                <v-list-item
                        v-for="([icon, text, link], i) in items"
                        :key="i"
                        link
                        @click="navigate(link)"
                >
                    <v-list-item-icon>
                        <v-icon>{{ icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-divider></v-divider>
                <v-divider></v-divider>
                <v-list-item link @click="logout">
                    <v-list-item-icon>
                        <v-icon>fas fa-sign-out-alt</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-card>
</template>

<script>
    export default {
        name: "Menu",
        data: () => ({
            items: [
                ['fas fa-columns', 'Dashboard', '/main/dashboard'],
                ['fas fa-play', 'Play Game', '/main/play'],
                ['fas fa-cog', 'Settings', '/main/dashboard'],
            ],
        }),
        methods: {
            logout: function() {
                this.$session.destroy();
                this.$router.push('/login');
            },
            navigate: function(route) {
                this.$router.push(route);
            }
        },
    }
</script>

<style scoped>

</style>