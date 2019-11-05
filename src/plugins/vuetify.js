import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#7289da',
                secondary: '#97a6de',
                accent: '#8c9eff',
                error: '#7289da',
                background: '#23272a',
                secondbackground: '#2c2f33'
            },
        },
    },
});