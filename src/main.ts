import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "virtual:windi.css";

// Lets you change tailwind classes in the browser dev console and them update automatically
import "virtual:windi-devtools";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
