
function saveUser(val){
    localStorage.setItem("user",val)
}
function getUser(){
    localStorage.getItem("user")
}
function verEmail(email) {
    const reg = /^[\da-z]+([\\-\\.\\_]?[\da-z]+)*@[\da-z]+([\\-\\.]?[\da-z]+)*(\.[a-z]{2,})+$/i;
    return reg.test(email)
}
function addFileList(file) {
    const key = "fileList"
    let pre = localStorage.getItem(key)
    if (pre) {
        pre = JSON.parse(pre)
        pre.unshift(file)
        localStorage.setItem(key, JSON.stringify(pre))
        return
    }
    localStorage.setItem(key, JSON.stringify([file]))
}
function removeFileItem(index){
    const key = "fileList"
    let pre = localStorage.getItem(key)
    if(!pre){
        return
    }
    pre=JSON.parse(pre)
    pre.splice(index,1)
    localStorage.setItem(key, JSON.stringify(pre))
}
function getFileList() {
    const key = "fileList"
    return localStorage.getItem(key)
}
function setItem(key, obj) {
    localStorage.setItem(key, obj)
}
function removeItem(key, type = 'item') {
    if (type == 'all') {
        localStorage.clear()
    }
    localStorage.removeItem(key)
}
export default {
    verEmail,
    setItem,
    removeItem,
    removeFileItem,
    addFileList,
    getFileList,
    saveUser,
    getUser
}