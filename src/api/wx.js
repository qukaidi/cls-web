import request from "@/utils/request.js";
export function getToken(params){
    return request({
        url:'/wx/cp/oauth2/token',
        method:'GET',
        params
    })
}