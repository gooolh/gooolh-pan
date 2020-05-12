import Vue from 'vue'
import App from './App.vue'
import '@/assets/icons'
import mButton from '@/components/mButton.vue'
import common from '@/util/common.js'
import toast from '@/components/toast'
import api from './api'
import router from "./router.js" 
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.prototype.$common=common.fun
Vue.prototype.$api=api
Vue.component('m-button', mButton)
Vue.prototype.$bus = new Vue(); 
Vue.use(toast)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
