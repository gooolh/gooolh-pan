<template>
  <modal :confirmName="needRegister ? '注册' : '登陆'" @confirm="sub">
    <div class="login-warp f-c">
      <div class="logo">
        <svg-icon icon-class="logo"></svg-icon>
        <span>GOOLH SEND</span>
      </div>
      <div @click="toggleRegister">
        <span class="tip" v-show="!needRegister"
          >如果没有账号， <span class="register">注册</span></span
        >
        <span class="tip" v-show="needRegister"
          >已有账号 <span class="register">登陆 | </span>
          <span class="register">忘记密码?</span></span
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
</template>

<script>
import modal from './modal'
export default {
  components: {
    modal,
  },
  data() {
    return {
      needRegister: false,
      email: '',
      password: '',
    }
  },
  methods: {
    sub() {
      if (!this.$common.verEmail(this.email)) {
        this.$toast.error('请输入正确的邮箱')
        this.$refs.email.focus()
        return
      }
      if (this.password.length < 6) {
        this.$refs.password.focus()
        this.$toast.error('账户或密码错误')
        return
      }
      this.needRegister ? this.register() : this.login()
    },
    toggleRegister() {
      this.needRegister = !this.needRegister
    },
    login() {
      const params = {
        email: this.email,
        password: this.password,
      }
      this.$api.user.login(params).then((res) => {
        if (res.status == 'error') {
          this.$toast.error(res.data)
          return
        }
        this.$toast.info('登陆成功')
        const data = res.data
        localStorage.setItem('token', data.token)
        delete data.token
        this.$common.saveUser(data)
        this.$bus.$emit('login', { email: this.email })
        this.$router.push('/')
      })
    },
    register() {
      const params = {
        email: this.email,
        password: this.password,
      }
      this.$api.user.register(params).then((res) => {
        if (res.status == 'error') {
          this.$toast.error(res.data)
          return
        }
        this.needRegister = false
        this.$toast.info(res.data)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.login-warp {
  .logo {
    // background-image: url(../assets/images/loginLogo.png);
    // background-repeat: no-repeat;
    // background-size: cover;

    font-weight: 600;
    font-size: 20px;
    height: 60px;
    left: 50%;
    margin: 0 auto;
    top: 30px;
    width: 250px;
  }
  .register {
    cursor: pointer;
    color: var(--theme-color);
  }
  .tip {
    color: var(theme-text-color);
    font-size: 12px;
  }
  .h-input {
    padding: 4px 11px;
    font-size: 14px;
    width: 56%;
    margin: 7px auto;
    box-sizing: border-box;
    border-radius: 24px;
    text-align: center;
    height: 36px;
    outline: none;
    transition: all 0.5s;
    &:focus {
      box-shadow: 0 0 0 1px var(--theme-color);
    }
    &:active {
      transform: scale(1.1);
    }
  }
  .login-btn {
    background-color: var(--theme-color);
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
