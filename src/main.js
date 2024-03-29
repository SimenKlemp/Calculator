import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VuexFlash from 'vuex-flash';

createApp(App).use(store).use(router).use(VuexFlash).mount("#app");
