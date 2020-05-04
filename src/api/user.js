import axios from '@/util/http'

const userApi={
    login(params){
        return axios.post("/login",params)
    },
    register(params){
        return axios.post("register",params)
    }
}

export default userApi