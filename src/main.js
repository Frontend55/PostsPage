import { createApp } from 'vue';
import './style.css';
import 'vue3-ui-preloader/dist/loader.css';
import App from './App.vue';
import loader from 'vue3-ui-preloader';

import { router } from './routes';

import { createPinia } from 'pinia';
const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);

app.component('loader', loader);

app.mount('#app');
