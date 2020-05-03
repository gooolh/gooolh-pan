<template>
  <div class="content-warp">
    <div class="logo"></div>
    <div class="send-warp">
      <button class="btn send" @click="uploadFile">发送</button>
      <input
        multiple
        type="file"
        ref="file"
        @change="changeFile"
        style="display:none"
      />
      <div class="order-item">
        <div>或者</div>
        <div @click="sendText">文本</div>
      </div>
    </div>
    <button class="btn receive" @click="receive">接收</button>
    <receive @pickup="pickup" ref="receive"></receive>
    <send-text :data="receiveContent" @success="sendSuccess" ref="sendText"></send-text>
    <upload-options
      @success="sendSuccess"
      ref="uploadOptions"
      :fileList="fileList"
    ></upload-options>
    <success-tip ref="successTip" :code="code"></success-tip>
  </div>
</template>
<script>

import receive from '@/components/receive'
import sendText from '@/components/sendText'
import uploadOptions from '@/components/uploadOptions'
import successTip from '@/components/successTip'
export default {
  components: {
    receive,
    sendText,
    uploadOptions,
    successTip,
  },
  data() {
    return {
      fileList: [],
      code: '',
      receiveContent:''
    }
  },
  methods: {
    pickup(data) {
      this.$refs.receive.$children[0].hide()
      if (data.type == "txt") {
        this.receiveContent=data.content
        this.$refs.sendText.$children[0].show()
      }
    },
    sendSuccess(data) {
      this.code = data
      const file = {
        code: this.code,
        typeName: '文本信息内容',
        type:'txt'
      }
      this.$common.addFileList(file)
      this.$bus.$emit('refresh');
      this.$refs.successTip.$children[0].show()
    },
    uploadFile() {
      this.$refs.file.dispatchEvent(new MouseEvent('click'))
    },
    changeFile(e) {
      const fileList = [].slice.call(e.target.files)
      console.log(fileList)
      this.fileList = fileList
      this.$refs.uploadOptions.$children[0].show()
    },
    receive() {
      this.$refs.receive.$children[0].show()
    },
    sendText() {
      this.receiveContent=''
      this.$refs.sendText.$children[0].show()
    }
  }
}
</script>

<style lang="scss">
.content-warp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .logo {
    background-image: url(../assets/images/logo.png);
    background-repeat: no-repeat;
    background-size: cover;
    height: 200px;
    width: 350px;
  }
  .send-warp {
    position: relative;
    .order-item {
      position: absolute;
      top: -20px;
      right: -50px;
      background-color: #fff;
      border-radius: 30px;
      padding: 0 10px;
      box-shadow: rgba(0, 0, 0, 0.1) 0 5px 35px;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      transition: all 0.25s;
      white-space: nowrap;
      z-index: 7;
      display: none;
    }
    &:hover {
      .order-item {
        display: flex;
        justify-content: center;
        div:first-child {
          color: $theme-color;
        }
        div {
          padding: 10px;
          transition: all 0.25s;
          &:hover:not(:first-child) {
            background-color: $theme-color;
            color: #fff;
          }
        }
      }
    }
  }
  .btn {
    border-radius: 30px;
    cursor: pointer;
    outline: none;
    display: block;
    margin: 0 calc(50% - 112px) 20px;
    padding: 15px 10px;
    border: none;
    transition: color 0.25s, background-color 0.25s, opacity 0.25s,
      box-shadow 0.25s;
    width: 224px;
  }
  .send {
    background-color: $theme-color;
    box-shadow: rgba(65, 145, 245, 0.3) 0 5px 20px;
    color: #fff;
    transition: color 0.25s, background-color 0.25s, opacity 0.25s,
      box-shadow 0.25s, background-position 1.5s;
    &:active {
      background-color: #fff;
      box-shadow: rgba(65, 145, 245, 0.3) 0 5px 30px;
      color: $theme-color;
      &:hover {
        box-shadow: rgba(65, 145, 245, 0.5) 0 5px 30px;
      }
    }
  }
  .receive {
    background-color: #fff;
    border: none;
    box-shadow: rgba(65, 145, 245, 0.2) 0 5px 20px;
    color: $theme-color;
    &:hover {
      box-shadow: rgba(65, 145, 245, 0.3) 0 5px 30px;
    }
    &:active {
      background-color: $theme-color;
      box-shadow: rgba(65, 145, 245, 0.5) 0 5px 30px;
      color: #fff;
    }
  }
}
</style>