import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from "js-cookie"
import {
    getToken as getWxToken
} from "@/api/wx"
Vue.use(Vuex)
const TOKEN = 'token';
const PROJECTID = 'projectId'
const cookieTime = 7
export default new Vuex.Store({
    state: {
        token: Cookies.get(TOKEN),
        key: Cookies.get(PROJECTID),
        loading: false
    },
    getters: {
        getToken: state => {
            return state.token
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
            Cookies.set(TOKEN, token, {
                expires: cookieTime
            })
        },
        SET_PROJECTID(state, projectId) {
            state.key = projectId
            Cookies.set(PROJECTID, projectId, {
                expires: cookieTime
            })
        },
        REMOVE_TOKEN(state) {
            Cookies.remove(TOKEN)
        }
    },
    actions: {
        setProjectId({
            commit
        }, key) {
            commit("SET_PROJECTID", key)
        },
        getTokenByCode({
            commit
        }, param) {
            return new Promise((resolve, reject) => {
                getWxToken({
                        code: param.code,
                        key: param.projectId
                    }).then(res => {
                        if (res.status == 200 && res.data) {
                            commit("SET_TOKEN", res.data)
                            commit("SET_PROJECTID", param.projectId)
                            resolve()
                        } else {
                            reject()
                        }
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    }
})