import axios from 'axios'
import Framework7 from 'framework7/framework7.esm.bundle.js'
import store from '@/store'

function errorCreate(msg) {
    const error = new Error(msg)
    errorLog(error)
    throw error
}

function errorLog(error) {
    var app = new Framework7();
    var $$ = Dom7;
    var notificationFull = app.notification.create({
        icon: '<i class="icon demo-icon">7</i>',
        title: 'Framework7',
        titleRightText: 'now',
        subtitle: 'This is a subtitle',
        text: 'This is a simple notification message',
        closeTimeout: 3000,
    });
    $$('.open-full').on('click', function () {
        notificationFull.open();
    });
}

const service = axios.create({
    baseURL: '/api',
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers['Accountlocale'] = "WXUSER";
            config.headers['Authorization'] = store.state.token;
            config.headers['ProjectKey'] = store.state.key;
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const dataAxios = response.data
        const {
            code
        } = dataAxios
        if (code === undefined) {
            return dataAxios
        } else {
            switch (code) {
                case 200:
                    return dataAxios.data
                default:
                    errorCreate(`${dataAxios.message}: ${response.config.url}`)
                    break
            }
        }
    },
    error => {
        if (error && error.response) {

            switch (error.response.status) {

                case 400:
                    error.message = '请求错误';
                    break
                case 401:
                    error.message = '未授权，请登录';
                    break
                case 403:
                    error.message = '拒绝访问';
                    store.commit("REMOVE_TOKEN")
                    window.location.href = "/api/wx/cp/oauth2?url=" + window.location.href;
                    break
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`;
                    break
                case 408:
                    error.message = '请求超时';
                    break
                case 500:
                    error.message = '服务器内部错误';
                    break
                case 501:
                    error.message = '服务未实现';
                    break
                case 502:
                    error.message = '网关错误';
                    break
                case 503:
                    error.message = '服务不可用';
                    break
                case 504:
                    error.message = '网关超时';
                    break
                case 505:
                    error.message = 'HTTP版本不受支持';
                    break
                default:
                    break
            }
        }
        return Promise.reject(error)
    }
)

export default service