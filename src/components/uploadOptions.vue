<template>
  <modal confirmName="上传" @confirm="upload">
    <div class="upload-options f-c">
      <div class="tip1">你选择了这些文件</div>
      <div class="tip2">未登录</div>
      <div class="file-list">
        <div class="item" v-for="(item, index) in fileList" :key="index">
          {{ item.name }}
        </div>
      </div>
      <div class="box">
        <span>密码</span>
        <input type="text" name="password" placeholder="可留空" autocomplete="off" />
      </div>
      <div class="box">
        <span>下载次数</span>
        <input type="number" name="num" v-model="num" />
        <span>保存小时数</span>
        <input type="number" name="hour" v-model="hour" />
      </div>
    </div>
  </modal>
</template>
<script>
import modal from './modal'
export default {
  components: {
    modal
  },
  props:{
      fileList:{
          type:Array
      }
  },
  data() {
    return {
      num: 2,
      hour: 24
    }
  },
  methods:{
      upload(){
          console.log("upload")
          this.$emit("success",'123123')
      }
  }
}
</script>

<style lang="scss">
.upload-options {
  min-height: 250px;
  .file-list {
    height: 37%;
    width: 80%;
    margin-top: 10px;
    overflow: auto;
    .item:nth-child(2n + 1) {
      background-color: rgba(0, 0, 0, 0.03);
    }
    .item {
      background-color: #fff;
      color: #000;
      border-radius: 5px;
      font-size: 14px;
      display: block;
      padding: 10px 15px;
      transition: all 0.25s;
      word-break: break-all;
    }
  }
  .box {
    display: flex;
    align-items: center;
    padding: 0 5%;
    width: 100%;
    box-sizing: border-box;
    margin-top: 10px;
    span {
      font-size: 12px;
      margin: 0 5px;
      width: 63px;
      flex-shrink: 0;
    }
    input {
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      display: block;
      font-size: small;
      padding: 5px 10px;
      transition: all 0.25s;
      width: calc(100% - 20px);
      outline: none;
      &:focus {
        border: 1px solid $theme-color;
      }
    }
  }
}
</style>