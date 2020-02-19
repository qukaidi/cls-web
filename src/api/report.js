import request from "@/utils/request.js";
export function list(params) {
    return request({
        url: '/report',
        method: 'GET',
        params
    })
}

export function pushMail(params) {
    return request({
        url: '/report/push/mail',
        method: 'GET',
        params
    })
}

export function list2(params) {
    return request({
        url: '/shopfloor/report',
        method: 'GET',
        params
    })
}

export function pushMail2(params) {
    return request({
        url: '/shopfloor/report/push/mail',
        method: 'GET',
        params
    })
}

export function listError(params) {
    return request({
        url: '/shopfloor/check/query/error',
        method: 'GET',
        params
    })
}