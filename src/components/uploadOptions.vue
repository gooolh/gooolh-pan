<template>
  <modal confirmName="上传" @confirm="getCode">
    <div class="upload-options f-c">
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
  </modal>
</template>
<script>
import modal from "./modal";
import axios from "axios";
export default {
  components: {
    modal,
  },
  props: {
    files: {},
  },
  created() {
    this.fileList = [].slice.call(this.files);
    this.user = this.$common.getUser();
  },
  watch: {
    num(val) {
      if (!this.user.member && val > 10) {
        this.$toast.error("需要更多的次数需要开通高级功能");
        this.num = 10;
      }
    },
    hour(val) {
      if (!this.user.member && val > 24) {
        this.$toast.error("需要更久的保存需要开通高级功能");
        this.hour = 24;
      }
    },
  },
  data() {
    return {
      num: 2,
      hour: 24,
      password: "",
      user: "",
      uploadParams: "",
    };
  },
  methods: {
    upload(index) {
      let formData = new FormData();
      Object.keys(this.uploadParams).forEach((key) => {
        if (key == "key") {
          formData.append(key, this.uploadParams[key] + this.fileList[0].name);
          return;
        }
        formData.append(key, this.uploadParams[key]);
      });
      console.log(this.fileList[0]);
      formData.append("file", this.fileList[index]);
      const instance = axios.create({ timeout: 1000 * 12 });
      instance.post(this.uploadParams.host, formData).then((res) => {
        console.log(res);
      });
    },
    getCode() {
      if (this.fileList.length > 1 && !this.user.member) {
        alert("批量上传文件需要开通高级账号");
        if (!this.user) {
          this.$router.push("login");
        }
        return;
      }
      const endPoint = this.$common.getEndPoint();
      let filename=[]
      this.fileList.forEach(item=>{
        filename.push(item.name.replace(",","#"))
      })
      const params = {
        password: this.password,
        maxDownloadNum: this.num,
        hour: this.hour,
        point: endPoint != "" && endPoint != null ? endPoint : "south",
        filename:filename
      };
      this.$api.file.getCode(params).then((res) => {
        if (res.status === "success") {
          this.uploadParams = res.data;
          for (let index = 0; index < this.fileList.length; index++) {
              this.upload(index)
          }
          const file = {
            code: res.data,
            fileName: filename.join(","),
          };
          this.$common.addFileList(file);
          this.$router.push({ name: "successTip", params: { code: res.data.code } });
          return;
        }
        this.$toast.error(res.data);
      });
    },
  },
};
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
