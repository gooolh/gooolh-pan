<template>
  <div>
    <transition name="slide">
      <div
        class="m-toast"
        v-show="visible"
        :class="{ error: status == 'error', info: status == 'info' }"
      >
        {{ msg }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      visible: false,
      status: 'info'
    }
  }
}
</script>

<style lang="scss" scoped>
.m-toast {
  position: fixed;
  background-color: #4191f5;
  height: 30px;
  bottom: 0;
  width: 100%;
  text-align: center;
  line-height: 30px;
  color: #fff;
  font-size: small;
}
.info {
  background-color: #4191f5;
}
.error {
  background-color: red;
}
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(30px);
}
</style>