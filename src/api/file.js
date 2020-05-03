import axios from '@/util/http'

const userApi={
    uploadFile(params){
        return axios.post("/upload",params)
    },
    saveText(params){
        return axios.post("/saveText",params)
    },
    receive(params){
        return axios.get("/receive",params)
    }
}

export default userApi