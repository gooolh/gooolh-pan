<template>
  <modal confirmName="确定" @confirm="receive" :icon="!hasPassword">
    <span class="back" v-show="hasPassword" @click="toggleInput"></span>
    <transition name="left">
      <div class="receive-warp" v-show="!hasPassword">
        <div class="tip-box">
          <div class="tip1">请输入取件码</div>
          <div class="tip2">发送文件后就会获得取件码</div>
        </div>
        <input
          class="input-code"
          type="text"
          autocomplete="off"
          maxlength="6"
          v-model="code"
        />
      </div>
    </transition>
    <transition name="right">
      <div class="receive-warp" v-show="hasPassword" style="z-index=999">
        <div class="tip-box">
          <div class="tip1">请输入密码</div>
        </div>
        <input
          class="input-code"
          type="text"
          autocomplete="off"
          maxlength="6"
          v-model="password"
        />
      </div>
    </transition>
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
      code: '',
      hasPassword: false,
      password: '',
    }
  },
  watch: {
    $route(pre) {
      console.log(pre)
    },
  },
  created() {
    this.code = this.$route.params.code ? this.$route.params.code : ''
    this.hasPassword = this.$route.params.needPassword
      ? this.$route.params.needPassword
      : false
    if (this.code) {
      this.receive()
    }
  },
  methods: {
    toggleInput() {
      this.password = ''
      this.hasPassword = !this.hasPassword
    },
    receive() {
      const params = {
        code: this.code,
        password: this.password,
      }
      this.$api.file.receive(params).then((res) => {
        console.log(res)
        if (res.status == 'password') {
          this.password == ''
            ? (this.hasPassword = true)
            : this.$toast.error('密码不正确')
        } else if (res.status == 'error') {
          this.$toast.error(res.data)
        } else {
          if (res.data.type == 'txt') {
            this.$router.push({
              name: 'text',
              params: { data: res.data.content },
            })
            return
          }
          const content = res.data.content
          if (content.length == 1) {
            window.open(content[0].url)
            this.$router.push('/')
            return
          }
          this.$router.push({ name: 'pick', params: { fileList: content } })
        }
      })
    },
  },
}
</script>
<style lang="scss">
.receive-warp {
  .tip-box {
    display: flex;
    flex-direction: column;
    height: 60px;
    justify-content: space-around;
  }
  .input-code {
    border: none;
    border-bottom: 2px solid var(--theme-border-bg);
    border-radius: 0;
    color: var(--theme-color);
    font-size: 35px;
    letter-spacing: 10px;
    margin-bottom: 20px;
    outline: none;
    padding: 15px 15px 15px 25px;
    position: relative;
    text-align: center;
    transition: all 0.25s;
    width: 200px;
    &:hover {
      border-bottom: 2px solid var(--theme-color);
    }
    &:focus {
      border-bottom: 2px solid var(--theme-color);
    }
  }
}
</style>
