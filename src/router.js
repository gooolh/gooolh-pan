import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
// import content from "@/components/content.vue";
import receive from "@/components/receive.vue";
import login from "@/components/login.vue";
import sendText from "@/components/sendText.vue";
import uploadOptions from "@/components/uploadOptions.vue";
import successTip from "@/components/successTip.vue";
import myfile from "@/components/myfile.vue";
import pick from "@/components/pick.vue"
import account from "@/components/account.vue"
import setup from '@/components/setup.vue'
Vue.use(VueRouter);

const routes = [
    {
        path: "/receive",
        name: 'receive',
        component: receive
    },
    {
        path: "/login",
        component: login
    },
    {
        path: "/text",
        name: 'text',
        component: sendText,
        props: true,
        meta: {
            animation: "boom"
        }
    },
    {
        path: "/uploadOptions",
        name: 'uploadOptions',
        component: uploadOptions,
        props: true,
    },
    {
        path: "/successTip",
        name: 'successTip',
        component: successTip,
        props: true,
    },
    {
        path: "/myfile",
        component: myfile
    },
    {
        path: "/pick",
        name: "pick",
        component: pick,
        props: true,
    },
    {
        path: "/account",
        name: "account",
        component: account,
        props: true,
    },
    {
        path: "/setup",
        name: "setup",
        component: setup,
    }
]

var router = new VueRouter({
    mode: 'history',
    routes
})
export default router;