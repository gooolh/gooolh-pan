import axios from '@/util/http'

const userApi={
    login(params){
        return axios.post("",params)
    }
}

export default userApi