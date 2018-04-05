<template>
  <div class="key-benefit">
    <div class="key-benefit__img" :style="{backgroundImage: `url(${kb.cover})`}"></div>
    <div class="key-benefit__content">
      <h3>{{kb.subTitle}}</h3>
      <h2>{{kb.title}}</h2>
      <a-button class="key-benefit__content-button" title="Enter" :filled="false"></a-button>
      <span class="key-benefit__content-border"></span>
    </div>
  </div>
</template>
<script>
  import AButton from '~/components/Button'
  export default {
    components: {
      AButton
    },
    props: ['kb']
  }
</script>
<style lang="scss">
  .key-benefit {
    height: 100vh;
    margin-top: 5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    text-align: right;
    overflow: hidden;
    &:nth-child(even) {
      justify-content: flex-start;
      text-align: left;
      .key-benefit__content-border {
        left: 0;
      }
      .key-benefit__content-button {
        float: left;
      }
      .key-benefit__img{
        background-position: 20rem;
      }
    }
  }

  .key-benefit__shape {
    position: absolute;
    z-index: 1;
    top: 0;
  }

  .key-benefit__img {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: -20rem;
    top: 0;
    left: 0;
    opacity: 0.5;
  }
  .key-benefit__content {
    position: relative;
    z-index: 2;
    padding: 5rem;
    &-button {
      margin-top: 2rem;
    }
    &-border {
      content: '';
      width: 1rem;
      height: 80%;
      background-color: crimson;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
    h3 {
      font-size: 3.5vw;
      margin-bottom: 2rem;
      opacity: 0.5;
    }
    h2 {
      font-size: 5vw;
      font-family: 'Cormorant', serif;
    }
    button {
      float: right;
    }
  }
</style>