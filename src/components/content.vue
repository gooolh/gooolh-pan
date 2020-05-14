<template>
  <div class="content-warp">
    <div class="logo"></div>
    <div
      class="send-warp"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
      @touchstart="touchstart"
      @touchend="touchend"
    >
      <button class="btn send" @click="uploadFile('file')">发送</button>
      <input
        multiple
        type="file"
        ref="file"
        @change="changeFile"
        style="display:none"
      />
      <input
        webkitdirectory
        type="file"
        ref="folder"
        @change="changeFile"
        style="display:none"
      />
      <div class="order-item" v-show="showItem">
        <div>或者</div>
        <router-link to="/text">
          <div class="i">文本</div>
        </router-link>
        <div class="i" @click="uploadFile('folder')">文件夹</div>
      </div>
    </div>
    <router-link to="/receive">
      <button class="btn receive">接收</button>
    </router-link>
    <fly :code="code" ref="fly"></fly>
  </div>
</template>
<script>
import fly from "@/components/fly";
export default {
  components: {
    fly,
  },
  created(){
    const arr=location.href.split('/')
    if(/\d{6}/.test(arr[arr.length-1])){
      this.$router.push({name:'receive',params:{code:arr[arr.length-1]}})
    }
  },
  mounted() {
    this.$bus.$on("fly", (data) => {
      this.code = data;
      this.fly();
    });
  },
  watch: {
    $route(to, from) {
      if (from.name == "uploadOptions") {
        this.$refs.file.value = null;
        this.$refs.folder.value = null;
      }
    },
  },
  data() {
    return {
      files: [],
      code: "",
      receiveContent: "",
      showItem: false,
      loop: "",
    };
  },
  methods: {
    fly() {
      this.$refs.fly.start();
    },
    touchstart() {
      if (this.$common.isMobile()) {
        clearTimeout(this.loop);
        this.loop = setTimeout(() => {
          this.showItem = true;
        }, 1000);
      }
    },
    touchend() {
      if (this.$common.isMobile()) {
        clearTimeout(this.loop);
      }
    },
    mouseenter() {
      if (this.$common.isMobile()) {
        return;
      }
      this.showItem = true;
    },
    mouseleave() {
      this.showItem = false;
    },
    pickup(data) {
      this.$refs.receive.$children[0].hide();
      if (data.type == "txt") {
        this.receiveContent = data.content;
        this.$refs.sendText.$children[0].show();
      }
    },
    uploadFile(type) {
      this.showItem = false;
      this.$refs[type].dispatchEvent(new MouseEvent("click"));
    },
    changeFile(e) {
      const files = e.target.files;
      var fileSize = Math.round(files[0].size / 1024);
      if (fileSize > 1024*50) {
        alert("文件大小不能大于50m");
        return;
      }
      this.$router.push({ name: "uploadOptions", params: { files: files } });
    },
  },
};
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
      right: -120px;
      background-color: #fff;
      border-radius: 30px;
      padding: 0 10px;
      box-shadow: rgba(0, 0, 0, 0.1) 0 5px 35px;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      transition: all 0.25s;
      white-space: nowrap;
      z-index: 7;
      display: flex;
      justify-content: center;
      & > div:first-child {
        color: $theme-color;
      }
      div {
        padding: 10px;
        transition: all 0.25s;
      }
      .i {
        color: rgba(0, 0, 0, 0.6);
        &:hover {
          cursor: pointer;
          background-color: $theme-color;
          color: #fff;
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
    background-color: var(--theme-color);
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

@media screen and (max-width: 500) {
}
</style>
