<template>
  <button :class="{filled}">
    <span>{{title}}</span>
  </button>
</template>
<script>
  export default {
    props: ['title', 'filled']
  }
</script>
<style lang="scss" scoped>
  button {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: crimson;
    background: transparent;
    text-transform: uppercase;
    cursor: pointer;
    outline: crimson;
    position: relative;
    width: 5rem;
    height: 5rem;
    span{
      transition: color 0.3s;
    }
    &.filled {
      color: white;
      &:after {
        background: crimson;
      }
    }
    &:after {
      content: '';
      width: 5rem;
      height: 5rem;
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      box-shadow: 0 0 0 1px crimson;
      z-index: -1;
      transform: translate(-50%, -50%) scale(1);
      transition: 0.3s cubic-bezier(0.8, 0, 0.2, 1);
    }
    &:active:after {
        transform: translate(-50%, -50%) scale(1) !important;
    }
    &:hover {
      span {
        color: white;
      }
      &:after {
        background: crimson;
        transform: translate(-50%, -50%) scale(1.2);
      }
    }
  }
</style>