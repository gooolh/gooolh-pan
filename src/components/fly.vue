<template>
  <transition name="fly">
    <div class="box" v-show="visible">{{ code }}</div>
  </transition>
</template>

<script>
export default {
  props: {
    code: {},
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    start() {
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, 2000)
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  font-weight: 600;
  padding: 7px 12px;
  letter-spacing: 1px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  z-index: 9;
  opacity: 0;
}

@keyframes bounce-in {
  0% {
    transform: scale(2);
    top: calc(50% - 50px);
    right: calc(50% - 40px);
    opacity: 1;
  }
  30% {
    transform: scale(2);
    top: calc(50% - 50px);
    right: calc(50% - 40px);
  }
  45% {
    transform: scale(1.5);
  }
  80% {
    transform: scale(1);
    top: 18px;
    right: 10px;
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
.fly-enter-active {
  animation: bounce-in 2s;
}
</style>
