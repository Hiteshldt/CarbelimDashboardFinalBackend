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

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home'},
        { path: '/home', component: Home},

        { path: '/dashboard', 
          component: DashBoard,
          beforeEnter: (to, from, next) => {
            const devicevalid = Cookies.get('devicevalid');
            if (devicevalid) {
                const deviceData = JSON.parse(decodeURIComponent(devicevalid));

                const deviceIsValid = deviceData.deviceIsValid;
                const deviceId = deviceData.deviceId;

                store.commit('SET_DEVICE_VALIDITY', deviceIsValid);
                store.commit('SET_DEVICE_ID', deviceId);
            }
            next();
        }
        },

        { path: '/graph',
        component: GraphData,
        beforeEnter: (to, from, next) => {
            const devicevalid = Cookies.get('devicevalid');
            if (devicevalid) {
                const deviceData = JSON.parse(decodeURIComponent(devicevalid));

                const deviceIsValid = deviceData.deviceIsValid;
                const deviceId = deviceData.deviceId;

                store.commit('SET_DEVICE_VALIDITY', deviceIsValid);
                store.commit('SET_DEVICE_ID', deviceId);
            }
            next();},
        },
        
        { path: '/profile', component: MyProfile},
        { path: '/about', component: AboutUs},
        { path: '/signup', component: SignUp},
        { path: '/signin', component: SignIn},
        { path: '/:AnyOther(.*)', redirect: '/home'},
    ]

})

export default router;