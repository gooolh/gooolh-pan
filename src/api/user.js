import axios from '@/util/http'

const userApi = {
    init(params) {
        return axios.post("/init", params)
    },
    login(params) {
        return axios.post("/login", params)
    },
    register(params) {
        return axios.post("/register", params)
    }
}

export default userApi