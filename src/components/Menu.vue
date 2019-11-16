<template>
    <v-card
            height="300"
            width="10%"
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
                <router-link style="text-decoration: none !important;"
                        v-for="([icon, text, link], i) in items"
                        :key="i"
                        :to="{ name: link}"
                >
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>{{ icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                </router-link>
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
                ['fas fa-columns', 'Dashboard', 'dashboard'],
                ['fas fa-play', 'Play Game', 'play'],
                ['fas fa-cog', 'Settings', 'dashboard'],
            ],
        }),
        methods: {
            logout: function() {
                this.$session.destroy();
                this.$router.push('/login');
            },
        },
    }
</script>

<style scoped>

</style>