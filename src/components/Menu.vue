<template>
        <div class="main">
                <v-navigation-drawer
                        v-model="drawer"
                        :color="color"
                        :expand-on-hover="true"
                        absolute
                        dark
                >
                    <v-list
                            dense
                            nav
                            class="py-0"
                    >
                        <v-list-item two-line>
                            <v-list-item-avatar>
                                <img src="https://randomuser.me/api/portraits/men/81.jpg">
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>{{ this.$session.get("username") }}</v-list-item-title>
                                <v-list-item-subtitle>Subtext</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-divider></v-divider>

                        <v-list-item
                                v-for="item in items"
                                :key="item.title"
                                link
                                v-on:click="navigateTo(item.link)"
                        >
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>
            <v-row
                    align="center"
                    justify="center"
            >
                <router-view/>
            </v-row>


        </div>
</template>

<script>
    export default {
        name: "Home",
        data () {
            return {
                drawer: true,
                items: [
                    { title: 'Dashboard', icon: 'mdi-view-dashboard', link: 'dashboard' },
                    { title: 'Start game', icon: 'mdi-help-box', link: 'lobbylist' },
                ],
                color: 'primary',
            }
        },
        methods: {
            navigateTo: function (link) {
                this.$router.push({name: link});
            }
        },
        created() {
            if(!this.$session.exists())
            {
                this.$router.push({name: 'login'});
            }
        }
    }
</script>

<style scoped>
.main {
    background-image: url("../../src/assets/background.jpg");
    background-size: cover;
    width: 100%;
}

    >>>.v-list-item__title {
        font-size: 15px !important;
    }
>>>.v-icon.v-icon {
    font-size: 35px;
}
</style>