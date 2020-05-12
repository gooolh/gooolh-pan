const userKey = "user"
const endPoint = "endPoint"
const fun = {
    isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
        return flag;
    },
    getEndPoint() {
        return localStorage.getItem(endPoint)
    },
    saveEndPoint(val) {
        localStorage.setItem(endPoint, val)
    },
    saveUser(val) {
        localStorage.setItem(userKey, JSON.stringify(val))
    },
    getUser() {
        return JSON.parse(localStorage.getItem(userKey));
    },
    removeUser() {
        localStorage.removeItem("token")
        localStorage.removeItem(userKey)
    },
    verEmail(email) {
        const reg = /^[\da-z]+([\\-\\.\\_]?[\da-z]+)*@[\da-z]+([\\-\\.]?[\da-z]+)*(\.[a-z]{2,})+$/i;
        return reg.test(email)
    },
    addFileList(file) {
        const key = "fileList"
        let pre = localStorage.getItem(key)
        if (pre) {
            pre = JSON.parse(pre)
            pre.unshift(file)
            localStorage.setItem(key, JSON.stringify(pre))
            return
        }
        localStorage.setItem(key, JSON.stringify([file]))
    },
    removeFileItem(index) {
        const key = "fileList"
        let pre = localStorage.getItem(key)
        if (!pre) {
            return
        }
        pre = JSON.parse(pre)
        pre.splice(index, 1)
        localStorage.setItem(key, JSON.stringify(pre))
    },
    getFileList() {
        const key = "fileList"
        return localStorage.getItem(key)
    },
    setItem(key, obj) {
        localStorage.setItem(key, obj)
    },
    removeItem(key, type = 'item') {
        if (type == 'all') {
            localStorage.clear()
        }
        localStorage.removeItem(key)
    }
}

export default {
    fun
}