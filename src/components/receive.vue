<template>
  <modal
    confirmName="确定"
    @confirm="receive"
    :icon="!hasPassword"
  >
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
    modal
  },
  data() {
    return {
      code: '',
      hasPassword: false,
      password: ''
    }
  },
  created(){
    if(this.$route.params.code){
      this.code=this.$route.params.code
      this.hasPassword=true
    }
  },
  methods: {
    toggleInput() {
      this.password=''
      this.hasPassword = !this.hasPassword
    },
    receive() {
      const params = {
        code: this.code,
        password: this.password
      }
      this.$api.file.receive(params).then(res => {
        console.log(res)
        if (res.status == 'password') {
          this.password == "" ? this.hasPassword = true : this.$toast.error("密码不正确")
        } else if (res.status == "error") {
          this.$toast.error(res.data)
        } else {
          if (res.data.type == 'txt') {
            this.$router.push({ name: 'text', params: { data: res.data.content } })
            return
          }
          const content = res.data.content
          if (content.length == 1) {
            window.open(content[0].url);
            this.$router.push("/")
            return
          }
          this.$router.push({ name: "pick", params: { fileList: content } })
        }
      })

    }
  }
}
</script>
<style lang="scss">
.back {
  border-right: 3px solid rgba(0, 0, 0, 0.35);
  border-top: 3px solid rgba(0, 0, 0, 0.35);
  cursor: pointer;
  height: 15px;
  left: 50px;
  position: absolute;
  top: 45px;
  transform: rotate(225deg);
  transition: all 0.25s;
  width: 15px;
}
.receive-warp {
  .tip-box {
    display: flex;
    flex-direction: column;
    height: 60px;
    justify-content: space-around;
  }
  .tip2 {
    color: rgba(0, 0, 0, 0.5);
  }
  .input-code {
    border: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 0;
    color: $theme-color;
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
      border-bottom: 2px solid $theme-color;
    }
  }
}
.left-enter-active,
.left-leave-active {
  transition: all 0.3s ease;
}
.left-leave-to {
  position: absolute;
  opacity: 0;
  transform: translateX(-500px);
}
.left-enter {
  opacity: 0;
  transform: translateX(-500px);
}

.right-enter-active,
.right-leave-active {
  transition: all 0.3s ease;
}

.right-enter,
.right-leave-to {
  position: absolute;
  opacity: 0;
  transform: translateX(500px);
}
</style>
