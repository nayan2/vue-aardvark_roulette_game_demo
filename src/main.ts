import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Loader from '@/components/loader.vue'
import VueResource from 'vue-resource'
import { interceptor } from '@/utility/configuration/interceptor/HttpInterceptor'

Vue.use(VueResource);
Vue.config.productionTip = false;
Vue.component('app-loader', Loader);
Vue.http.options.root = process.env.VUE_APP_ENDPOINTURL;
Vue.http.interceptors.push(interceptor);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
