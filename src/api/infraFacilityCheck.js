import request from "@/utils/request.js";
export function fetchList(params) {
    return request({
        url: '/infra-facility-check',
        method: 'GET',
        params
    })
}
export function addOne(data) {
    return request({
        url: '/infra-facility-check',
        method: 'POST',
        data
    })
}

export function fetchOne(id) {
    return request({
        url: `/infra-facility-check/${id}`,
        method: 'get'
    })
}