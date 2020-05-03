<template>
  <div>
    <modal :confirmName="needRegister ? '注册' : '登陆'" @confirm="login">
      <div class="login-warp f-c">
        <div class="logo"></div>
        <div @click="toggleRegister">
          <span class="tip" v-show="!needRegister"
            >如果没有账号， <span class="register">注册</span></span
          >
          <span class="tip" v-show="needRegister"
            >已有账号 <span class="register">登陆 | </span> <span class="register" >忘记密码?</span></span
          >
        </div>
        <input
          class="h-input"
          type="email"
          name="email"
          ref="email"
          v-model="email"
          placeholder="邮箱"
        />
        <input
          class="h-input"
          type="password"
          name="password"
          ref="password"
          v-model="password"
          placeholder="密码"
        />
      </div>
    </modal>
  </div>
</template>

<script>
import modal from './modal'
export default {
  components: {
    modal
  },
  data() {
    return {
      needRegister: false,
      email: '',
      password: ''
    }
  },
  methods: {
    toggleRegister(){
      this.needRegister=!this.needRegister
    },
    login() {
      this.$children[1].show()
      if (!this.$common.verEmail(this.email)) {
        this.$refs.email.focus()
        return
      }
      if (this.password.length < 6) {
        this.$refs.password.focus()
        return
      }
      this.$api.user.login().then(res => {
        console.log(res)
      })
    },
    register() {

    },
  }
}
</script>

<style lang="scss" scoped>
.login-warp {
  .logo {
    background-image: url(../assets/images/loginLogo.png);
    background-repeat: no-repeat;
    background-size: cover;
    height: 60px;
    left: 50%;
    margin: 0 auto;
    top: 30px;
    width: 250px;
  }
  .register {
    cursor: pointer;
    color: $theme-color;
  }
  .tip {
    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
  }
  .h-input {
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    width: 55%;
    line-height: 1.5715;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    margin: 7px auto;
    border-radius: 2px;
    box-sizing: border-box;
    // border-radius: 20px;
    transition: all 0.3s;
    &:active {
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      border-color: #40a9ff;
      outline: 0;
      border-right-width: 1px !important;
    }
  }
  .login-btn {
    background-color: $theme-color;
    border-radius: 20px;
    color: #fff;
    margin: 7px auto;
    transition: all 0.25s;
    padding: 10px 25px;
    font-size: 14px;
    transition: all 0.25s;
    &:hover {
      box-shadow: rgba(65, 145, 245, 0.35) 0 5px 30px;
    }
  }
}
@media screen and (max-width: 500px) {
  .login-warp {
    .h-input {
      width: 70%;
    }
  }
}
</style>