import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg",
  },
  theme: {
    light: true,
    themes: {
      light: {
        primary: "#00b0e4",
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
    },
  },
});
