<template>
  <modal :confirmName="confirmName" @confirm="getCode">
    <div class="upload-options f-c" v-if="!showProgress">
      <div class="tip1">你选择了这些文件</div>
      <!-- <div class="tip2">未登录</div> -->
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
    <div style="margin-bottom:30px" v-else>
      <p>正在上传</p>
      <div
        class="progress"
        v-for="(item, index) in uploadProgress"
        :key="index"
      >
        <div class="progress-bar" :style="{ width: item + 'px' }">
          {{ names[index] }}
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import modal from './modal'
import axios from 'axios'
export default {
  components: {
    modal,
  },
  props: {
    files: {},
  },
  created() {
    this.fileList = [].slice.call(this.files)
    this.user = this.$common.getUser()
  },
  watch: {
    num(val) {
      if (!this.user.member && val > 10) {
        this.$toast.error('需要更多的次数需要开通高级功能')
        this.num = 10
      }
    },
    hour(val) {
      if (!this.user.member && val > 24) {
        this.$toast.error('需要更久的保存需要开通高级功能')
        this.hour = 24
      }
    },
  },
  data() {
    return {
      num: 2,
      hour: 24,
      password: '',
      user: '',
      uploadParams: '',
      showProgress: false,
      uploadProgress: [],
      confirmName: '上传',
      names: [],
      code: '',
    }
  },
  methods: {
    upload(index) {
      const filename = this.names[index]
      let formData = new FormData()
      Object.keys(this.uploadParams).forEach((key) => {
        if (key == 'key') {
          formData.append(
            key,
            this.uploadParams[key] + filename.replace(',', '#')
          )
          return
        }
        formData.append(key, this.uploadParams[key])
      })
      formData.append('file', this.fileList[index])
      const _this = this
      var config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: function(e) {
          console.log(index)
          //  _this.uploadProgress.$set(index, ((e.loaded / e.total) * 200).toFixed(2) )
          _this.uploadProgress[index] = ((e.loaded / e.total) * 200).toFixed(2)
          _this.$forceUpdate()
          console.log('上传 ' + _this.uploadProgress[index])
        },
      }
      axios.post(this.uploadParams.host, formData, config).then((res) => {
        console.log(res)
        const file = {
          code: this.code,
          fileName: this.names.join(','),
        }
        this.$common.addFileList(file)
        let success = true
        for (let index = 0; index < this.uploadProgress.length; index++) {
          const element = this.uploadProgress[index]
          if (element != 200) {
            success = false
            break
          }
        }
        if (success) {
          this.$router.push({
            name: 'successTip',
            params: { code: this.code },
          })
        }
      })
    },
    getCode() {
      if (this.fileList.length > 1 && !this.user.member) {
        alert('批量上传文件需要开通高级账号')
        if (!this.user) {
          this.$router.push('login')
        }
        return
      }
      const endPoint = this.$common.getEndPoint()
      let filename = []
      this.fileList.forEach((item) => {
        filename.push(item.name.replace(',', '#'))
      })
      this.names = filename
      const params = {
        password: this.password,
        maxDownloadNum: this.num,
        hour: this.hour,
        point: endPoint != '' && endPoint != null ? endPoint : 'south',
        filename: filename.join(','),
      }
      this.$api.file.getCode(params).then((res) => {
        if (res.status === 'success') {
          this.code = res.data.code
          this.uploadParams = res.data
          this.confirmName = ''
          for (let index = 0; index < this.fileList.length; index++) {
            this.uploadProgress.push(0)
            this.upload(index)
          }

          this.showProgress = true
          return
        }
        this.$toast.error(res.data)
      })
    },
  },
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
      border-radius: 5px;
      display: block;
      font-size: small;
      padding: 5px 10px;
      transition: all 0.25s;
      width: calc(100% - 20px);
      outline: none;
      &:focus {
        border: 1px solid var(--theme-color);
      }
    }
  }
}
.progress {
  margin-top: 2px;
  width: 200px;
  height: 28px;
  margin-bottom: 10px;
  overflow: hidden;
  background-color: #f5f5f5;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  .progress-bar {
    background-color: var(--theme-color);
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.14902) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.14902) 50%,
      rgba(255, 255, 255, 0.14902) 75%,
      transparent 75%,
      transparent
    );
    background-size: 40px 40px;
    box-shadow: rgba(0, 0, 0, 0.14902) 0px -1px 0px 0px inset;
    box-sizing: border-box;
    color: rgb(255, 255, 255);
    display: block;
    float: left;
    font-size: 12px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    transition-delay: 0s;
    transition-duration: 0.6s;
    transition-property: width;
    transition-timing-function: ease;
  }
}
</style>
