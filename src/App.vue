<template>
  <div id="app">
    <my-menu></my-menu>
    <main-view></main-view>
    <transition :name="animation">
      <router-view></router-view>
    </transition>

    <!-- <transition name="fade">
      <router-view name="content"></router-view>
    </transition> -->

    <m-footer></m-footer>
  </div>
</template>

<script>
import myMenu from './components/menu'
import mFooter from './components/footer.vue'
import mainView from './components/content'
export default {
  name: 'App',
  components: {
    myMenu,
    mFooter,
    mainView
  },
  data() {
    return {
      animation: "boom"
    }
  },
  watch: {
    $route(to) {
      if (to.meta.animation) {
        this.animation = to.meta.animation
      }
    }
  }
}
</script>

<style lang="scss">
@import url(./assets/styles/common.scss);
#app {
  font-family: PingFangSC-Light, microsoft yahei light, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $theme-bg-color;
  height: 100vh;
  width: 100%;
}
</style>
