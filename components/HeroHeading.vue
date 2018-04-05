<template>
  <div class="big__heading">
    <div class="big__heading-titles" style="margin-bottom: 2rem">
      <h3>Guided photography tours</h3>
      <h1>GET THE PICTURE</h1>
    </div>
    <div class="go" @click="updateFrame">
      <a-button title="Enter" :filled="true"></a-button>
    </div>
    <div class="big__heading-description">
      <p>Join InsideAsia Tours for a photographic journey to remember.
        We open doors to once-in-a-lifetime encounters and in-depth cultural experiences; all you need is your camera at the ready</p>
    </div>
    <button @click="slideDown" class="down">
      <svg>
        <use xlink:href="#arrow-down"></use>
      </svg>
    </button>
  </div>
</template>
<script>
  import AButton from '~/components/Button'
  export default {
    components: {
      AButton
    },
    methods: {
      updateFrame() {
        this.$emit('onGo')
      },
      slideDown() {
        this.$emit('onPressedDown')
      }
    }
  }
</script>
<style lang="scss">
  .big__heading {
    position: relative;
    z-index: 2;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h3 {
      color: #47494e;
      font-size: 2vw;
      letter-spacing: 2px;
      font-weight: normal;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 6vw;
      color: crimson;
      font-family: 'Cormorant', serif;
      font-weight: bold;
    }
    .down {
      border: none;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background: transparent;
      text-transform: uppercase;
      cursor: pointer;
      outline: crimson;
      position: relative;
      width: 5rem;
      height: 5rem;
      &:before {
        content: '';
        width: 5rem;
        height: 5rem;
        background: crimson;
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        z-index: -1;
        transform: translate(-50%, -50%) scale(1);
        transition: 0.3s cubic-bezier(0.8, 0, 0.2, 1);
      }
      &:active:before {
        transform: translate(-50%, -50%) scale(1) !important;
      }
      &:hover:before {
        transform: translate(-50%, -50%) scale(1.2);
      }
    }
    .down {
      opacity: 0;
      visibility: hidden;
      height: 0;
      &:before {
        border: 2px solid crimson;
        background: transparent;
      }
      &:hover {
        svg {
          transform: scale(1.1)
        }
      }
      svg {
        width: 2rem;
        height: 2rem;
        fill: #333;
        transition: 0.3s;
      }
    }
    &-description {
      opacity: 0;
      height: 0;
      font-size: 2vw;
      max-width: 800px;
      p {
        display: block;
        margin-bottom: 4rem;
        line-height: 1.5;
        font-family: "Droid Sans", sans-serif;
      }
    }
  }
</style>