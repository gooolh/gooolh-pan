<template>
  <div>
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
            <div class="t">{{ item.typeName }}</div>
            <span class="del" @click="deleteFile(index)"></span>
          </div>
        </div>
      </div>
    </modal>
    <showText ref="showText" :data="content"></showText>
  </div>
</template>

<script>
import modal from './modal'
import showText from '@/components/sendText'
export default {
  components: {
    modal,
    showText
  },
  data() {
    return {
      fileList: [],
      item: '',
      content: ''
    }
  },
  created() {
    this.getFileList()
    this.$bus.$on('refresh', () => {
      this.getFileList()
    });
  },
  methods: {
    getFileList() {
      this.fileList = JSON.parse(this.$common.getFileList())
    },
    deleteFile(index) {
      this.fileList.splice(index, 1)
      this.$common.removeFileItem(index)
    },
    pickup(item) {
      this.item = item
      if (item.type == 'txt') {
        this.receive()
        this.$refs.showText.$children[0].show()
      }
    },
    receive() {
      this.$api.file.receive({ code: this.item.code }).then(res => {
        console.log(res)
        if (res.status == 'password') {
          this.hasPassword = true
        } else if (res.status == "error") {
          alert(res.data)
        } else {
          this.content = res.data.content
        }
      })

    }
  }
}
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