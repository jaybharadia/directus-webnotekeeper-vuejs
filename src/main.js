import { createApp } from "vue";
import App from "./App.vue";
import router from "./plugins/router.js";
import directus from "./plugins/directus.js";
const app = createApp(App);
app.use(router);

app.provide("directus", directus);

app.mount("#app");
