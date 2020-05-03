<template>
  <div id="app">
    <my-menu></my-menu>
    <sham></sham>
    <m-footer></m-footer>
  </div>
</template>

<script>
import myMenu from './components/menu'
import sham from './components/content.vue'
import mFooter from './components/footer.vue'
export default {
  name: 'App',
  components: {
    myMenu,
    sham,
    mFooter
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
  height: 100%;
  width: 100%;
}
body {
  margin: 0;
  padding: 0;
  user-select: none;
  overflow: hidden;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}
</style>
