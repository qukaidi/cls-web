import request from "@/utils/request.js";
//机房api
export function fetchCheckList(params) {
    return request({
        url: '/computer-check',
        method: 'GET',
        params
    })
}
export function addCheckList(data) {
    return request({
        url: '/computer-check',
        method: 'POST',
        data
    })
}
export function fetchComputerRoom(id) {
    return request({
        url: `/computer-room/${id}`,
        method: 'get'
    })
}
export function fetchComputerCheck(id) {
    return request({
        url: `/computer-check/${id}`,
        method: 'get'
    })
}
export function fetchRoomStatus() {
    return request({
        url: `/computer-room/status`,
        method: 'get'
    })
}

// 设备api
export function fetchShopfloorList(params) {
    return request({
        url: '/shopfloor/check',
        method: 'GET',
        params
    })
}
export function addShopfloorList(data) {
    return request({
        url: '/shopfloor/check',
        method: 'POST',
        data
    })
}
export function fetchShopfloorRoom(id) {
    return request({
        url: `/shopfloor/facility/do/${id}`,
        method: 'get'
    })
}
export function fetchShopfloorCheck(id) {
    return request({
        url: `/shopfloor/check/${id}`,
        method: 'get'
    })
}
export function fetchShopfloorStatus() {
    return request({
        url: `/shopfloor/facility/status`,
        method: 'get'
    })
}