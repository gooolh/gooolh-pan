<template>
  <div class="footer">
    <a class="link">服务条款</a>
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  font-size: 12px;
  padding: 15px 20px;
  width: 100%;
  .link {
    cursor: pointer;
    color: var(--theme-color);
  }
}
</style>
