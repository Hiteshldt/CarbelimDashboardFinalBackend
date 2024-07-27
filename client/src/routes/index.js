import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/HomePage.vue';
import DashBoard from '../pages/DashBoardPage.vue';
import GraphData from '../pages/GraphData.vue';
import MyProfile from '../pages/MyProfile.vue';
import AboutUs from '../pages/AboutUs.vue';
import SignIn from '../pages/SignIn.vue';
import SignUp from '../pages/SignUp.vue';
import Cookies from 'js-cookie';
import store from '../store/index.js';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home, meta: { title: 'Carbelim Dashboard' } },
  { path: '/dashboard', component: DashBoard, beforeEnter: authGuard, meta: { title: 'Dashboard' } },
  { path: '/graph', component: GraphData, beforeEnter: authGuard, meta: { title: 'Graph' } },
  { path: '/profile', component: MyProfile, meta: { title: 'My Profile' } },
  { path: '/about', component: AboutUs, meta: { title: 'About' } },
  { path: '/signup', component: SignUp, meta: { title: 'Sign' } },
  { path: '/signin', component: SignIn, meta: { title: 'Sign' } },
  { path: '/:AnyOther(.*)', redirect: '/home' },
];

async function authGuard(to, from, next) {
  store.dispatch('setLoading', true);
  const devicevalid = Cookies.get('devicevalid');
  if (devicevalid) {
    console.log('Received cookie:', devicevalid); // Console log the cookie value
    const deviceData = JSON.parse(decodeURIComponent(devicevalid));
    const deviceIsValid = deviceData.deviceIsValid;
    const deviceId = deviceData.deviceId;
    store.commit('SET_DEVICE_VALIDITY', deviceIsValid);
    store.commit('SET_DEVICE_ID', deviceId);
    console.log('authGuard retrieved data:', deviceData);
  }
  next();
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch('setLoading', true);
  // Set document title using route meta title or a default value
  document.title = to.meta.title || 'Default Title';
  next();
});

router.afterEach(() => {
  setTimeout(() => {
    store.dispatch('setLoading', false);
  }, 300);
});

export default router;