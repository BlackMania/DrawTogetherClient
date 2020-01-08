<template>
    <v-layout
            align-center
            justify-center
    >
        <v-flex
                xs12
                sm8
                md4
        >
            <v-card class="elevation-12" tile color="rgba(255, 255, 255, 0.9)">
                <v-toolbar
                        color="#1c343d"
                        dark
                >
                    <v-toolbar-title>Login</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
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
                                class="white--text"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="#1c343d" tile>Register</v-btn>

                    <v-btn color="#1c343d" class="mr-4" tile v-on:click="login">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "Login",
        data () {
            return {
                password: 'Password',
                username: 'Username',
                rules: {
                    required: value => !!value || 'Required',
                },
            }
        },
        methods: {
            login: async function () {
                if (this.$refs.form.validate()) {
                    let username = document.getElementById('username').value;
                    let password = document.getElementById('password').value;

                    let json = JSON.parse(`{"username": "${username}", "password": "${password}" }`);
                    const response = await fetch('http://localhost:9091/api/auth/login', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify(json)
                    });

                    let jsonResponse = await response.json();

                    if(jsonResponse.hasOwnProperty('token'))
                    {
                        this.$session.start();
                        this.$session.set("token", jsonResponse.token);
                        this.$session.set("username", username);
                        this.$router.push({name: 'menu'});
                    } else {
                        alert("Wrong username or password");
                    }
                }
            }
        }
    }
</script>

<style scoped>
    >>>.v-card__text, .v-card__title {
        padding: 30px;
    }
    >>>.v-card__actions {
        padding-right: 20px;
        padding-bottom: 25px;
    }
    >>>.v-input {
        max-width: 80%;
        margin-left: 10%;
        margin-right: 10%;
    }

    >>>.v-btn__content{
        color: white;
    }
</style>