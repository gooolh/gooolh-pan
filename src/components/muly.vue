<template>
  <modal>
    <div class="f-c">
      <div v-for="item in fileList" :key="item.url">
          <div>{{item.name}}</div>
      </div>
    </div>
  </modal>
</template>

<script>
import modal from './modal'
export default {
  components: {
    modal
  },
  props: {
      fileList:{}
  }
}
</script>

<style lang="scss" scoped>
</style>