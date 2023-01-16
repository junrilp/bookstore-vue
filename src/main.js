import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

// Router
app.use(router);
app.use(VueAxios, axios);
app.provide("axios", app.config.globalProperties.axios); // provide 'axios'
app.mount("#app");
