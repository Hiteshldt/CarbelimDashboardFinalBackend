import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/index';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);

app.use(router);
app.use(store);

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Default Title';
  next();
});

app.mount('#app');
