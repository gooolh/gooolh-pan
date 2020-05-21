<template>
  <div class="s-modal" v-if="toggle">
    <svg-icon
      v-if="icon"
      icon-class="close"
      class-name="close-icon"
      @click.native="hide"
    ></svg-icon>

    <slot></slot>
    <m-button
      v-if="confirmName"
      class="c-btn"
      :text="confirmName"
      @click.native="confirm"
    ></m-button>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      default: true,
    },
    confirmName: {
      default: '完成',
    },
    autoClose: {
      default: false,
    },
  },
  data() {
    return {
      toggle: true,
    }
  },
  methods: {
    show() {
      this.toggle = true
    },
    hide() {
      this.$router.push('/')
      this.toggle = false
    },
    confirm() {
      if (this.autoClose) {
        this.hide()
      }
      this.$emit('confirm')
    },
  },
}
</script>

<style lang="scss">
.f-c {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // height: 100%;
}
.s-modal {
  .primary {
    color: var(--theme-color);
  }
  .tip1 {
    font-size: 18px;
  }
  .tip2 {
    margin-top: 0;
    font-size: 12px;
  }
  .c-btn {
    align-self: center;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: calc(50% - 250px);
  top: calc(50% - 200px);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.05) 0 10px 20px;
  box-sizing: border-box;
  transition: all 0.25s;
  padding: 30px 0 20px;
  z-index: 7;
  width: 500px;
  height: 390px;
  text-align: center;
  background-color: var(--theme-modal-color);
  color: var(--theme-text-color);
  .close-icon {
    width: 30px;
    height: 30px;
    color: #b4b4b4;
    position: absolute;
    right: 25px;
    top: 25px;
    &:hover {
      color: var(--theme-color);
    }
  }
}
@media screen and (max-width: 500px) {
  .s-modal {
    width: 80%;
    height: 320px;
    left: 10%;
    top: calc(50% - 160px);
    .close-icon {
      right: 15px;
      top: 15px;
    }
  }
}
.tip-wrap {
  width: 100%;
  .line {
    background-color: var(--theme-border-bg);
    height: 1px;
    margin: -10px auto 10px;
    width: 65%;
  }
}
.back {
  border-right: 3px solid rgba(0, 0, 0, 0.35);
  border-top: 3px solid rgba(0, 0, 0, 0.35);
  cursor: pointer;
  height: 15px;
  left: 50px;
  position: absolute;
  top: 45px;
  transform: rotate(225deg);
  transition: all 0.25s;
  width: 15px;
}
.left-enter-active,
.left-leave-active {
  transition: all 0.3s ease;
}
.left-leave-to {
  position: absolute;
  opacity: 0;
  transform: translateX(-500px);
}
.left-enter {
  opacity: 0;
  transform: translateX(-500px);
}

.right-enter-active,
.right-leave-active {
  transition: all 0.3s ease;
}

.right-enter,
.right-leave-to {
  position: absolute;
  opacity: 0;
  transform: translateX(500px);
}
</style>
