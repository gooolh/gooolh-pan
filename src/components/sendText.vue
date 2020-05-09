<template>
  <modal :confirmName="data ? '复制' : '发送'" @confirm="send">
    <div class="text-warp f-c">
      <div class="tip-wrap">
        <p class="tip1" v-if="!data">发送文本</p>
        <p class="tip1" v-else>接收的文本</p>
        <div class="line"></div>
      </div>
      <textarea
        v-model="text"
        class="tx"
        placeholder="在这里输入纯文本"
      ></textarea>
    </div>
  </modal>
</template>

<script>
import modal from './modal'
export default {
  components: {
    modal
  },
  props: {
    data: {
      type: String,
      default: ''
    }
  },
  created() {
    if (this.data) {
      this.text = this.data
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    send() {
      if (this.data) {
        this.$toast.info("已复制到剪贴板")
        return
      }
      this.$api.file.saveText({ text: this.text }).then(res => {
        if (res.status == 'success') {
          const file = {
            code: res.data,
            fileName: "文本信息内容"
          }
          this.$common.addFileList(file)
          this.$router.push({ name: 'successTip', params: { code: res.data } })
          return
        }
      })
    }
  }
}
</script>

<style lang="scss">
.text-warp {
  .tx {
    background-color: rgba(0, 0, 0, 0.05);
    border: 1px solid transparent;
    border-radius: 10px;
    color: rgba(0, 0, 0, 0.8);
    display: block;
    font-family: inherit;
    font-size: small;
    height: 150px;
    margin: 10px auto 0;
    padding: 10px 2.5%;
    resize: none;
    text-align: center;
    transition: all 0.5s;
    outline: none;
    width: 80%;
    &:focus {
      background-color: #fff;
      border-color: $theme-color;
    }
  }
}
</style>