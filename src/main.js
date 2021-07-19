import Vue from 'vue'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store/index.js';
import vuetify from '@/plugins/vuetify'
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import douziAPI from '@/plugins/douziAPI.js';
import '@/plugins/live2d/js/live2d.js';
Vue.config.productionTip = false
Vue.prototype.$douziAPI = douziAPI;
Vue.use(mavonEditor)

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
if (
    sessionStorage.getItem('user-sessionToken') &&
    /\/admin\//.test(window.location.href)
) {
    store.commit('navView', '管理员');
}
douziAPI.getArticleType().then(r => {
    // console.log(r.data.results)
    store.commit('func_saveArticleType', r.data.results);
})