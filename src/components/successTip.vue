<template>
  <modal @confirm="finsh">
    <span class="back" v-show="showQRcode" @click="hideQRcode"></span>
    <transition name="left">
      <div class="tip-warp f-c" v-show="!showQRcode">
        <p class="tip1">文件已成功发送</p>
        <p class="tip2">你的取货码</p>
        <p class="code">{{ code }}</p>
        <p class="tip2">接收文件时，请输入该6位数取件码</p>
        <div class="tip2">
          <span>你也可以 或 </span>
          <a class="primary copy" @click="copy" v-clipboard:copy="preUrl + code"
            >复制下载链接</a
          >
          <span> 或 </span>
          <a class="primary copy" @click="createQRcode">直接扫描二维码下载</a>
        </div>
      </div>
    </transition>
    <transition name="right">
      <div style="margin:auto" v-show="showQRcode" ref="qrCodeUrl"></div>
    </transition>
  </modal>
</template>

<script>
import modal from './modal'
import QRCode from 'qrcodejs2'
export default {
  components: {
    modal,
  },
  props: {
    code: {},
  },
  data() {
    return {
      preUrl: 'http://47.96.152.87/',
      showQRcode: false,
    }
  },
  methods: {
    finsh() {
      this.$router.push('/')
      this.$bus.$emit('fly', this.code)
    },
    copy() {
      this.$toast.info('复制成功')
    },
    createQRcode() {
      this.showQRcode = true
      if (this.$refs.qrCodeUrl.children.length > 0) {
        return
      }

      const qrurl = 'http://47.96.152.87/' + this.code
      new QRCode(this.$refs.qrCodeUrl, {
        text: qrurl,
        width: 100,
        height: 100,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
      })
    },
    hideQRcode() {
      this.showQRcode = false
    },
  },
}
</script>

<style lang="scss">
.tip-warp {
  .copy {
    cursor: pointer;
    text-decoration: none;
    &:hover {
      border-bottom: 1px solid var(--theme-color);
    }
  }
  .code {
    cursor: text;
    font-size: 35px;
    font-weight: 700;
    letter-spacing: 10px;
    line-height: 30px;
    -webkit-user-select: text;
    user-select: text;
  }
}
.boom-leave-active {
  animation: none;
  opacity: 0;
}
</style>
