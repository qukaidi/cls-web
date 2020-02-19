import axios from "axios";
export function log(data){
    return axios.post("/api/test/log",data)
}