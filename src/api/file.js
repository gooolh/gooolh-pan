import axios from '@/util/http'

const userApi = {
    uploadFile(params) {
        return axios.post("/uploadFile", params, { "Content-Type": "multipart/form-data" })
    },
    saveText(params) {
        return axios.post("/saveText", params)
    },
    receive(params) {
        return axios.get("/receive", params)
    },
    myFile(params) {
        return axios.get("/myFile", params)
    },
    getCode(params){
        return axios.post("/getCode", params)
    }
}

export default userApi