import request from "@/utils/request.js";
export function fetchUserInfo(){
    return request({
        url:'/user',
        method:'GET'
    })
}