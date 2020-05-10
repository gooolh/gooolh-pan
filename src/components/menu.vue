<template>
  <div class="menu">
    <svg-icon
      icon-class="menu"
      class-name="icon"
      @click.native="toggleMenu"
    ></svg-icon>
    <transition name="fade">
      <div class="item-warp" v-show="toggle" @click="clickMenu">
        <router-link to="login" v-show="!user">
          <div class="menu-item">
            登陆
          </div>
        </router-link>
        <div class="menu-item" v-show="user" @click="account">
          我的账号
        </div>
        <div class="menu-item" v-show="user" @click="logout">
          退出登陆
        </div>
        <router-link to="myfile">
          <div class="menu-item">
            我的文件
          </div>
        </router-link>
        <div class="menu-item">
          设置
        </div>
        <div class="menu-item">
          获取帮助
        </div>
        <div class="menu-item serve">
          选择服务器
          <svg-icon icon-class="arrow" class-name="arrow"></svg-icon>
          <div class="child">
            <div
              v-for="item in serve"
              :key="item.id"
              class="ci"
              :class="{ tick: currentServer == item.id }"
              @click="changeServe(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="mask" v-show="toggle" @click="toggleMenu"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      toggle: false,
      currentServer: "south",
      user: "",
      serve: [
        {
          id: "south",
          name: "华南服务器",
        },
        {
          id: "none",
          name: "美国服务器",
        },
      ],
    };
  },
  created() {
    this.$bus.$on("login", (data) => {
      this.user = data;
    });
    console.log(this.$common.getEndPoint())
    this.currentServer=this.$common.getEndPoint()
    this.user = this.$common.getUser();
    this.$api.user.init().then(
      (res) => {
        if (res == "error") {
          this.logout();
        }
      },
      () => {
        this.logout();
      }
    );
  },
  methods: {
    logout() {
      this.$toast.info("退出成功");
      this.$common.removeUser();
      this.user = "";
    },
    account() {
      this.$router.push({ name: "account", params: { user: this.user } });
    },
    changeServe(item) {
      console.log(item)
      this.currentServer = item.id;
      this.$common.saveEndPoint(this.currentServer)
    },
    toggleMenu() {
      this.toggle = !this.toggle;
    },
    clickMenu() {
      this.toggle = false;
    },
  },
};
</script>

<style lang="scss">
.menu {
  .icon {
    position: absolute;
    width: 2rem;
    height: 2rem;
    top: 25px;
    right: 25px;
    color: $theme-color;
    transition: all 0.3s;
    &:hover {
      transform: scale(1.1);
      color: $theme-hover-color;
    }
  }
  .s-modal {
    z-index: 10;
  }
  .item-warp {
    position: absolute;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 5px 35px;
    max-height: calc(100% - 50px);
    min-width: 160px;
    padding-bottom: 13px;
    padding-top: 15px;
    transition: all 0.25s;
    z-index: 10;
    right: 10px;
    top: 10px;
    .menu-item {
      position: relative;
      color: rgba(0, 0, 0, 0.6);
      cursor: pointer;
      display: block;
      font-size: 12px;
      padding: 12px 40px;
      transition: all 0.25s;
      &:hover {
        background-color: $theme-color;
        color: #fff;
      }
    }
    .serve {
      &:hover {
        .child {
          display: block;
          color: rgba(0, 0, 0, 0.6);
        }
        .arrow {
          color: #fff;
        }
      }
    }
    .arrow {
      width: 25px;
      height: 25px;
      color: rgba(0, 0, 0, 0.3);
      position: absolute;
      right: 20px;
      top: 8px;
    }
    .line {
      border-bottom: 1px solid rgba(0, 0, 0, 0.07);
    }
    .child {
      display: none;
      position: absolute;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.1) 0 5px 35px;
      padding-bottom: 13px;
      padding-top: 15px;
      transition: all 0.25s;
      left: -141px;
      top: 0;
      .tick:hover::before {
        color: #fff;
      }
      .tick::before {
        content: "";
        border-bottom: 2px solid;
        border-right: 2px solid;
        color: $theme-color;
        height: 16px;
        left: 20px;
        position: absolute;
        transform: translate(-50%, -30%) rotate(45deg);
        transform-origin: center;
        transition: all 0.25s;
        width: 8px;
      }
      .ci {
        padding: 12px 40px;
        position: relative;
        &:hover {
          background-color: $theme-color;
          color: #fff;
        }
      }
    }
  }

  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
