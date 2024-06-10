import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { db, storage } from './firebase';

const app = createApp(App);

app.provide('db', db);
app.provide('storage', storage);

app.use(router);
app.mount('#app');
