import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Framework7 from 'framework7/framework7.esm.bundle.js'
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'
import 'framework7/css/framework7.bundle.min.css'
import * as filters from './filters.js'
import {
    Performance,
} from 'web-report'

Performance({
    add: {
        appId: 'EjdGDim1565922397379'
    }
})
Vue.config.errorHandler = function(err, vm, info) {
    let { message, stack } = err;

    // Processing error
    let resourceUrl, col, line;
    let errs = stack.match(/\(.+?\)/)
    if (errs && errs.length) errs = errs[0]
    errs = errs.replace(/\w.+js/g, $1 => { resourceUrl = $1; return ''; })
    errs = errs.split(':')
    if (errs && errs.length > 1) line = parseInt(errs[1] || 0);
    col = parseInt(errs[2] || 0)

    // Fixed parameters
    // Call the Performance.addError method
    Performance.addError({
        msg: message,
        col: col,
        line: line,
        resourceUrl: resourceUrl
    })
}
Framework7.use(Framework7Vue)
Vue.use(VueAxios, axios);
Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')