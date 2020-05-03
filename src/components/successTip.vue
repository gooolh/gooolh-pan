<template>
  <div>
    <modal @confirm=finsh>
      <div class="tip-warp f-c">
        <p class="tip1">文件已成功发送</p>
        <p class="tip2">你的取货码</p>
        <p class="code">{{ code }}</p>
        <p class="tip2">接收文件时，请输入该6位数取件码</p>
        <div class="tip2">
          <span>你也可以 或 </span>
          <a class="primary copy" @click="copy">复制下载链接</a>
          <span> 或 </span>
          <a class="primary copy">直接扫描二维码下载</a>
        </div>
      </div>
    </modal>
    <fly :code="code" ref="fly"></fly>
  </div>
</template>

<script>
import modal from './modal'
import fly from '@/components/fly'
export default {
  props: {
    code: {}
  },
  components: {
    modal,
    fly
  },
  methods: {
    finsh() {
      const arr = this.$parent.$refs
      for (const r in arr) {
        if (arr[r].$children  && arr[r].$children[0].hide) {
          console.log(r)
          arr[r].$children[0].hide()
        }
      }
      this.$refs.fly.start()
    },
    copy() {
      this.$toast.info("复制成功")
    }
  }
}
</script>

<style lang="scss">
.tip-warp {
  .copy {
    cursor: pointer;
    text-decoration: none;
    &:hover {
      border-bottom: 1px solid $theme-color;
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
</style>