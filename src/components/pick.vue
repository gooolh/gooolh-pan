<template>
  <modal :autoClose="true">
    <div class="pick-wrap f-c">
      <div class="tip-wrap">
        <p class="tip1">接收到的文件</p>
        <div class="line"></div>
      </div>
      <div style="width:100%">
        <div
          v-for="item in fileList"
          class="item"
          :key="item.url"
          @click="download(item)"
        >
          <div>{{ item.name }}</div>
          <svg-icon icon-class="download" class-name="d-icon"></svg-icon>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import modal from './modal'
export default {
  components: {
    modal,
  },
  props: {
    fileList: {},
  },
  methods: {
    download(item) {
      window.open(item.url)
    },
  },
}
</script>

<style lang="scss">
.s-modal {
  justify-content: space-around;
}
.pick-wrap {
  margin: 0 5%;
  border-radius: 10px;
  padding: 20px;
  .item:nth-child(2n + 1) {
    background-color: rgba(0, 0, 0, 0.03);
  }
  .item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
    width: 90%;
    div {
      flex: 1;
    }
  }
  .d-icon {
    width: 30px;
    height: 30px;
    color: var(--theme-color);
    cursor: pointer;
    &:hover {
      color: var(--theme-hover-color);
    }
  }
}
</style>
