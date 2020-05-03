<template>
  <div class="menu">
    <svg-icon
      icon-class="menu"
      class-name="icon"
      @click.native="toggleMenu"
    ></svg-icon>
    <transition name="fade">
      <div class="item-warp" v-show="toggle" @click="clickMenu">
        <div class="menu-item" data-ref="login">
          登陆
        </div>
        <div class="menu-item" data-ref="file">
          我的文件
        </div>
        <div class="menu-item">
          设置
        </div>
        <div class="menu-item">
          获取帮助
        </div>
      </div>
    </transition>
    <login-box ref="login"></login-box>
    <my-file ref="file"></my-file>
    <div class="mask" v-show="toggle" @click="toggleMenu"></div>
  </div>
</template>

<script>
import loginBox from '../components/login'
import myFile from '../components/myFile'
export default {
  components: {
    loginBox,
    myFile,
  },
  data() {
    return {
      toggle: false,
    }
  },
  methods: {
    toggleMenu() {
      this.toggle = !this.toggle
    },
    clickMenu(e) {
      console.log(this)
      for (const r in this.$refs) {
        if (this.$refs[r].$children.length > 0 && this.$refs[r].$children[0].hide) {
          this.$refs[r].$children[0].hide()
        }
      }
      this.toggle = false
      const r = e.target.getAttribute('data-ref')
      this.$refs[r].$children[0].show()
    }
  }
}
</script>

<style lang="scss" >
.menu {
  .icon {
    position: absolute;
    width: 2rem;
    height: 2rem;
    top: 25px;
    right: 25px;
    color: $theme-color;
    &:hover {
      color: #1b6ace;
    }
  }
  .s-modal {
    z-index: 10;
  }
  .item-warp {
    position: absolute;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 5px 35px;
    max-height: calc(100% - 50px);
    min-width: 160px;
    padding-bottom: 13px;
    padding-top: 15px;
    transition: all 0.25s;
    z-index: 7;
    right: 10px;
    top: 10px;
    .menu-item {
      color: rgba(0, 0, 0, 0.6);
      cursor: pointer;
      display: block;
      font-size: 12px;
      padding: 12px 40px;
      transition: all 0.25s;
      &:hover {
        background-color: $theme-color;
        color: #fff;
      }
    }
  }

  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>