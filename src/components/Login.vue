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
            <v-toolbar-title>Login</v-toolbar-title>
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
                      class="white--text"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions  :style="{background:  this.$vuetify.theme.themes[theme].secondbackground}">
            <v-spacer></v-spacer>

            <v-btn color="secondary" @click="register">Register</v-btn>

            <v-btn color="primary"
                   class="mr-4"
                   @click="validate"
            >Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <div ref="container"></div>
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
import LoginError from "./LoginError";
import Vue from 'vue';

export default {
  name: 'Login',
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
    validate: async function() {
      if (this.$refs.form.validate())
        {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        const response = await fetch('http://localhost:9091/api/secured/login', {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)
          },
        });
        if(response.status === 200)
        {
          const myJson = await response.json();
          this.$session.start();
          this.$session.set('jwttoken', myJson['token']);
          this.$session.set('username', document.getElementById('username').value);
          await this.$router.push('/main');
        }
        else
        {
          let ComponentClass = Vue.extend(LoginError);
          let instance = new ComponentClass();
          instance.$mount();
        }
      }
    },
    register: function() {
      this.$router.push('/register');
    }
  },
  computed:{
    theme(){
      return (this.$vuetify.theme.light) ? 'dark' : 'light'
    }
  },
  created()
  {
    if(this.$session.exists())
    {
      this.$router.push('/main');
    }
  }
}
</script>
