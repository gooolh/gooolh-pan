<template>
  <button class="m-btn" :style="{width:width?width:'auto'}">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    },
    width:{
        
    }
  }
}
</script>

<style lang="scss">
.m-btn {
  background-color: var(--theme-color);
  border: none;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
  font-size: small;
  // margin-top: 15px;
  padding: 10px 35px;
  transition: all 0.25s;
  outline: none;
  &:hover {
    box-shadow: rgba(65, 145, 245, 0.35) 0 5px 30px;
  }
  &:active {
    background-color: #fff;
    color: var(--theme-color);
  }
}
</style>