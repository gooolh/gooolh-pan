<template>
  <modal confirmName="上传" @confirm="upload">
    <div class="upload-options f-c">
      <div class="tip1">你选择了这些文件</div>
      <div class="tip2">未登录</div>
      <div class="file-list">
        <div class="item" v-for="(item, index) in files" :key="index">
          {{ item.name }}
        </div>
      </div>
      <div class="box">
        <span>密码</span>
        <input
          type="text"
          name="password"
          v-model="password"
          placeholder="可留空"
          autocomplete="off"
        />
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
  props: {
    files: {}
  },
  created() {
    this.fileList = [].slice.call(this.files)
  },
  data() {
    return {
      num: 2,
      hour: 24,
      password: '',
      user: ''
    }
  },
  methods: {
    upload() {
      if (this.fileList.length > 1 && !this.user.member) {
        alert("批量上传文件需要开通高级账号")
        this.uesr?'':this.$router.push("login")
        return
      }
      let formData = new FormData()
      formData.append("password", this.password)
      formData.append('maxDownloadNum', this.num)
      formData.append("hour", this.hour)
      formData.append('point', "south")
      this.fileList.forEach(item => {
        formData.append('files', item);
      })
      // formData.append('files', this.fileList[0])
      this.$api.file.uploadFile(formData).then(res => {
        if (res.status === 'success') {
          let fileName = []
          this.fileList.forEach(item => {
            fileName.push(item.name)
          })
          const file = {
            code: res.data,
            fileName: fileName.join(",")
          }
          this.$common.addFileList(file)
          this.$router.push({ name: 'successTip', params: { code: res.data } })
          return
        }
        this.$toast.error(res.data)
      })
    }
  }
}
</script>

<style lang="scss">
.upload-options {
  min-height: 250px;
  .file-list {
    height: 50%;
    width: 80%;
    margin-top: 10px;
    overflow: auto;
    margin: 0 auto;
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