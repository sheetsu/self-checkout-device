import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar } from "quasar";

import "./assets/styles/index.scss";
import "./assets/styles/shared-styles.scss";

import quasarUserOptions from "./quasar-user-options";

import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";

const pinia = createPinia();

const app = createApp(App);

app.use(i18n).use(pinia).use(router).use(Quasar, quasarUserOptions);

router.isReady().then(() => app.mount("#app-self-checkout-device"));
