<!-- 用户设置 -->
<template>
  <modal :autoClose="true">
    <div class="tip-wrap">
      <p class="tip1">设置</p>
      <div class="line"></div>
    </div>
    <div class="wrap">
      <div class="flex">深色模式</div>
      <input type="checkbox" @change="changeDark" v-model="dark" />
    </div>
  </modal>
</template>

<script>
import modal from './modal'

export default {
  data() {
    return {
      dark: false,
    }
  },
  components: {
    modal,
  },
  created() {
    const theme = localStorage.getItem('theme')
    this.dark = theme && theme == 'dark' ? true : false
  },
  methods: {
    changeDark() {
      if (this.dark) {
        localStorage.setItem('theme', 'dark')
        document.getElementsByTagName('body')[0].className = 'dark'
      } else {
        localStorage.setItem('theme', 'light')
        document.getElementsByTagName('body')[0].className = 'light'
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  padding: 20px 15%;
  flex: 1;

  .flex {
    flex: 1;
  }
}
</style>
