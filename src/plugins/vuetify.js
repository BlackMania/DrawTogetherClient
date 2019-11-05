import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#f29333',
                secondary: '#b3b3b3',
                accent: '#8c9eff',
                error: '#b51209',
                background: '#a3a3a3',
                secondbackground: '#f5f5f5'
            },
        },
    },
});