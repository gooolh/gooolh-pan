<template>
  <modal confirmName="修改">
    <div class="user-wrap">
      <div class="tip-wrap">
        <p class="tip1">个人账号</p>
        <div class="line"></div>
      </div>
      <div class="box">
        <div class="wrap">
          <span class="label">邮箱 : </span>
          <input type="email" :value="user.email" />
        </div>
        <div class="wrap" v-if="!user.member">
          <span class="label">序列码 : </span>
          <input type="text" v-model="code" placeholder="激活高级功能" />
          <m-button
            style="margin: 0 10px;"
            @click.native="verification"
            text="验证"
          ></m-button>
        </div>
        <div v-else>
          <p class="g">已激活高级功能</p>
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
  props: {
    user: {},
  },
  data() {
    return {
      code: "",
    };
  },
  methods: {
    verification() {
      this.$api.user.verification({ code: this.code }).then((res) => {
        if (res.status == "success") {
          this.user.member = true;
          this.$common.saveUser(this.user);
          this.$toast.info(res.data);
          return;
        }
        this.$toast.error(res.data);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.user-wrap {
  font-size: 15px;
  .box {
    height: 150px;
    font-size: 14px;
    .wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 7px 10%;
      .label {
        width: 100px;
      }
    }
  }
  input {
    flex: 1;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.65);
    width: 56%;
    margin: 7px auto;
    box-sizing: border-box;
    border-radius: 5px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.25);
    height: 36px;
    outline: none;
    transition: all 0.5s;
    &:focus {
      box-shadow: 0 0 0 1px $theme-color;

      background-color: #fff;
    }
    &:active {
      transform: scale(1.1);
    }
  }
}
.g{
  font-size: 13px;
  color: $theme-color;
}
</style>
