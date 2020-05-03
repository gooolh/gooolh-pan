import toastCompoent from './toast'
const toast = {}
toast.install = Vue => {
    const ToastCon = Vue.extend(toastCompoent)
    const ins = new ToastCon()
    ins.$mount(document.createElement('div'))
    document.body.appendChild(ins.$el)
    const msg = {
        info(msg, duration = 3000) {
            ins.msg = msg
            ins.visible = true
            ins.status = "info"
            setTimeout(() => {
                ins.visible = false
            }, duration)
        },
        error(msg, duration = 3000) {
            ins.msg = msg
            ins.visible = true
            ins.status = "error"
            setTimeout(() => {
                ins.visible = false
            }, duration)
        }
    }
    Vue.prototype.$toast = msg
}

export default toast