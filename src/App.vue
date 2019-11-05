<template>
  <v-app :style="{background: this.$vuetify.theme.themes[theme].background}">
      <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
  }),
  created() {
    this.$router.push('/login');
  },
  computed:{
    theme(){
      return (this.$vuetify.theme.light) ? 'dark' : 'light'
    }
  }
};
</script>
