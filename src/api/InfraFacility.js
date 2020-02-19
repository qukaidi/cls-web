import request from "@/utils/request.js";
export function fetchList(params) {
    return request({
        url: '/infra-facility',
        method: 'GET',
        params
    })
}
export function addOne(data) {
    return request({
        url: '/infra-facility',
        method: 'POST',
        data
    })
}

export function fetchOne(id) {
    return request({
        url: `/infra-facility/${id}`,
        method: 'get'
    })
}
export function fetchStatus() {
    return request({
        url: '/infra-facility/status',
        method: 'get'
    })
}