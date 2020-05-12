<template>
  <modal confirmName="关闭">
    <div class="file-warp f-c">
      <div class="tip">我的文件</div>
      <div class="file-list">
        <div
          class="item"
          v-for="(item, index) in fileList"
          :key="item.code"
          @click="pickup(item)"
        >
          <a>{{ item.code }}</a>
          <div class="t">{{ item.fileName }}</div>
          <span class="del" @click.stop="deleteFile(index)"></span>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import modal from "./modal";
export default {
  components: {
    modal,
  },
  data() {
    return {
      fileList: [],
      item: "",
      user: "",
    };
  },
  created() {
    this.user = this.$common.getUser();
    this.getFileList();
  },
  methods: {
    getFileList() {
      if (this.user) {
        this.$api.file.myFile().then((res) => {
          this.fileList = res.data;
        });
        return;
      }
      this.fileList = JSON.parse(this.$common.getFileList());
    },
    deleteFile(index) {
      this.fileList.splice(index, 1);
      this.$common.removeFileItem(index);
    },
    pickup(item) {
      this.item = item;
      this.receive();
    },
    receive() {
      this.$api.file.receive({ code: this.item.code }).then((res) => {
        if (res.status == "password") {
          this.$router.push({
            name: "receive",
            params: { code: this.item.code,needPassword:true },
          });
        } else if (res.status == "error") {
          alert(res.data);
        } else {
          if (res.data.type == "txt") {
            this.$router.push({
              name: "text",
              params: { data: res.data.content },
            });
            return;
          }
          const content = res.data.content;
          if (content.length == 1) {
            window.open(content[0].url);
            return;
          }
          this.$router.push({ name: "pick", params: { fileList: content } });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.file-warp {
  .tip {
    margin-bottom: 20px;
  }
  .file-list {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    height: 210px;
    overflow: auto;
    width: 65%;
    font-size: small;
    margin: auto;
    .item {
      border-bottom: solid 1px rgba(0, 0, 0, 0.1);
      font-weight: 700;
      padding: 10px 0;
      position: relative;
      text-align: left;
      a {
        color: #000;
        cursor: pointer;
        display: inline-block;
        line-height: 18px;
      }
      .t {
        color: rgba(0, 0, 0, 0.5);
        font-size: 10px;
        font-weight: 400;
        line-height: 17px;
        margin: 0 30px 0 0;
        word-break: break-all;
      }
      .del {
        height: 12px;
        position: absolute;
        right: 12px;
        top: calc(50% - 5px);
        width: 12px;
        cursor: pointer;
        &::after {
          background-color: #c8c8c8;
          content: "";
          height: 1px;
          left: 0;
          position: absolute;
          top: calc(50% - 1px);
          transition: all 0.25s;
          width: 100%;
          transform: rotate(-45deg);
        }
        &::before {
          background-color: #c8c8c8;
          content: "";
          height: 1px;
          left: 0;
          position: absolute;
          top: calc(50% - 1px);
          transition: all 0.25s;
          width: 100%;
          transform: rotate(45deg);
        }
      }
    }
  }
}
@media screen and (max-width: 500px) {
  .file-warp {
    .file-list {
      height: 150px;
    }
  }
}
</style>
