<template>
    <v-container
            fluid
            fill-height
    >
        <v-layout
                align-center
                justify-center
        >
            <v-flex
                    xs12
                    sm8
                    md4
            >
                <v-card class="elevation-12">
                    <v-toolbar
                            color="primary"
                            dark
                            flat
                    >
                        <v-toolbar-title>Register</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text :style="{background:  this.$vuetify.theme.themes[theme].secondbackground}">
                        <v-form ref="form">
                            <v-text-field
                                    id="username"
                                    label="Username"
                                    name="username"
                                    prepend-icon="fas fa-user"
                                    type="text"
                                    clearable
                                    :rules="[rules.required]"
                            ></v-text-field>

                            <v-text-field
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    prepend-icon="fas fa-lock"
                                    clearable
                                    :rules="[rules.required]"
                            ></v-text-field>
                            <v-text-field
                                    id="email"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    prepend-icon="fas fa-envelope"
                                    clearable
                                    :rules="[rules.required, rules.emailRules]"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions :style="{background:  this.$vuetify.theme.themes[theme].secondbackground}">
                        <v-spacer></v-spacer>
                        <v-btn color="secondary" @click="cancel">cancel</v-btn>
                        <v-btn color="primary" @click="validate">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<style scoped>
    >>>.v-card__text, .v-card__title {
        padding: 30px !important;
    }

    >>>.v-card__actions {
        padding-right: 20px !important;
        padding-bottom: 25px !important;
    }

    >>>.v-input {
        max-width: 80% !important;
        margin-left: 10% !important;
        margin-right: 10% !important;
    }
</style>

<script>
    export default {
        name: "Register",
        data () {
            return {
                password: 'Password',
                username: 'Username',
                email: 'Email',
                rules: {
                    required: value => !!value || 'Required',
                    emailRules: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                },

            }
        },
        methods: {
            validate: function() {
                if (this.$refs.form.validate())
                {
                    alert('Still needs implementing, the developer is lazy :)');
                }
            },
            cancel: function(){
                this.$router.push('/login');
            }
        },
        computed:{
            theme(){
                return (this.$vuetify.theme.light) ? 'dark' : 'light'
            }
        }
    }
</script>

<style scoped>

</style>