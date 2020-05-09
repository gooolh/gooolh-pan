<template>
  <modal confirmName="修改">
    <div class="user-wrap">
      <div class="tip-wrap">
        <p class="tip1">个人账号</p>
        <div class="line"></div>
      </div>
      <div class="box">
        <span class="label">邮箱 : </span>
        <input type="email" :value="user.email" />
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
};
</script>
<style lang="scss" scoped>
.user-wrap {
  font-size: 15px;
  .box {
    padding: 20px;
    font-size: 14px;
    .label {
      margin: 0 20px;
    }
  }
  input {
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
</style>
