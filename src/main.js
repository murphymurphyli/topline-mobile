import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import { Button } from 'vant'
// import 'amfe-flexible'
// Vue
//   .use(Button)
import Vant from 'vant'
import 'vant/lib/index.css'
// import { promised } from 'q'

import './styles/index.less'

Vue.use(Vant)

Vue.config.productionTip = false

Vue.prototype.$sleep = time => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve()
    }, time)
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
