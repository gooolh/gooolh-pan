<template>
  <modal :confirmName="data ? '复制' : '发送'" @confirm="send" :autoClose="!data">
    <div class="text-warp f-c">
      <p class="tip1" v-if="!data">发送文本</p>
      <p class="tip1" v-else>接收的文本</p>
      <div class="line"></div>
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
  watch: {
    data(val) {
      this.text = val
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    send() {
      if(this.data){
        this.$toast.info("已复制到剪贴板")
        return
      }
      this.$api.file.saveText({ text: this.text }).then(res => {
        if (res.status == 'success') {
          this.$emit("success", res.data)
          return
        }
      })
    }
  }
}
</script>

<style lang="scss">
.text-warp {
  .line {
    background-color: rgba(0, 0, 0, 0.1);
    height: 1px;
    margin: -10px auto 10px;
    width: 65%;
  }
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