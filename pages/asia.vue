<template>
  <div class="asia">
    <section class="asia__template">
      <img class="asia__template-background" src="/asia-0.jpg"/>
      <header>
        <div class="logo">
          <svg>
            <use xlink:href="#china-logo"></use>
          </svg>
        </div>
        <ul class="nav">
          <li><a href="#0">Galleries</a></li>
          <li><a href="#0">Photography tours</a></li>
          <li><a href="#0">About</a></li>
        </ul>
        <div class="booking">
          Book a trip
        </div>
      </header>
      <div class="big__heading">
        <div class="big__heading-titles" style="margin-bottom: 2rem">
          <h3>Guided photography tours</h3>
          <h1>GET THE PICTURE</h1>
        </div>
        <div class="go">
          <button @click="updateFrame">Enter</button>
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
    </section>
    <section class="key-benefits">
      <div class="key-benefit">
        <div class="item">Key Benefit 1</div>
      </div>
      <div class="key-benefit">
        <div class="item">Key Benefit 2</div>
      </div>
      <div class="key-benefit">
        <div class="item">Key Benefit 3</div>
      </div>
    </section>
  </div>
</template>

<script>
  import anime from 'animejs';
  import _ from 'lodash';

  export default {
    data() {
      return {
        DOM: {},
        rect: {},
        paths: {},
        isAnimating: false,
        settings: {
          animation: {
            slides: {
              duration: 400,
              easing: 'easeOutQuint'
            },
            shape: {
              duration: 400,
              easing: {in: 'easeOutQuint', out: 'easeInQuad'}
            }
          },
          frameFill: '#000'
        }
      }
    },
    beforeMount() {
      window.addEventListener('scroll', _.throttle(this.scrollHandler, 10));
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.scrollHandler);
    },
    mounted() {
      document.body.style.overflow = 'hidden'
      this.DOM.el = document.querySelector('.asia__template')
      this.DOM.titles = this.DOM.el.querySelector('header');
      this.DOM.bg = this.DOM.el.querySelector('.asia__template-background')
      this.DOM.goButton = this.DOM.el.querySelector('.big__heading > .go')
      this.DOM.downButton = this.DOM.el.querySelector('.big__heading > .down')

      this.DOM.title = this.DOM.el.querySelector('.big__heading')
      this.DOM.description = this.DOM.el.querySelector('.big__heading > .big__heading-description')
      this.rect = this.DOM.el.getBoundingClientRect();
      this.createFrame()
    },
    methods: {
      calculatePath(path = 'initial') {
        const r = Math.sqrt(Math.pow(this.rect.height, 2) + Math.pow(this.rect.width, 2));
        const rInitialOuter = r;
        const rInitialInner = r;
        const rFinalOuter = r;
        const rFinalInner = this.rect.width / 4.5
        const getCenter = () => `${this.rect.width / 2}, ${this.rect.height / 2}`;
        return path === 'initial' ?
          `M ${this.rect.width / 2}, ${this.rect.height / 2} m 0 ${-rInitialOuter} a ${rInitialOuter} ${rInitialOuter} 0 1 0 1 0 z m -1 ${rInitialOuter - rInitialInner} a ${rInitialInner} ${rInitialInner} 0 1 1 -1 0 Z` :
          `M ${getCenter()} m 0 ${-rFinalOuter} a ${rFinalOuter} ${rFinalOuter} 0 1 0 1 0 z m -1 ${rFinalOuter - rFinalInner} a ${rFinalInner} ${rFinalInner} 0 1 1 -1 0 Z`;
      },
      createFrame() {
        this.DOM.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.DOM.svg.setAttribute('class', 'shape');
        this.DOM.svg.setAttribute('width', '100%');
        this.DOM.svg.setAttribute('height', '100%');
        this.DOM.svg.setAttribute('viewbox', `0 0 ${this.rect.width} ${this.rect.height}`);
        this.paths = {
          initial: this.calculatePath('initial'),
          final: this.calculatePath('final')
        };
        this.DOM.svg.innerHTML = `
          <defs>
            <clipPath id="shape__clip">
              <path fill="#FFF" d="${this.paths.final}"></path>
            </clipPath>
          </defs>
          <rect clip-path="url(#shape__clip)" fill="#fff" x="0" y="0" width="100%" height="100%"></rect>
            `;
        this.DOM.el.appendChild(this.DOM.svg);
        this.DOM.shape = this.DOM.svg.querySelector('path');
      },
      slideDown() {
        console.log('so far so good')
      },
      updateFrame() {
        document.body.style.overflow = 'visible'
        if (this.isAnimating) return;
        this.isAnimating = true;
        const animateShapeIn = anime({
          targets: this.DOM.shape,
          duration: this.settings.animation.shape.duration,
          easing: this.settings.animation.shape.easing.in,
          d: this.calculatePath('final'),
        })

        const animateShapeOut = () => {
          const t = anime.timeline()
          t
            .add({
              targets: this.DOM.goButton,
              duration: 700,
              easing: [0.8, 0, 0.2, 1],
              translateY: 10,
              opacity: 0,
              height: 0
            })
            .add({
              targets: this.DOM.shape,
              duration: this.settings.animation.shape.duration,
              easing: this.settings.animation.shape.easing.out,
              d: this.paths.initial,
              offset: '-=700'
            })
            .add({
              targets: this.DOM.bg,
              duration: 700,
              easing: [0.8, 0, 0.2, 1],
              scale: [1, 1.5],
              opacity: 0.2,
              offset: '-=600',
            })
            .add({
              targets: this.DOM.title,
              duration: 700,
              easing: [0.8, 0, 0.2, 1],
              scale: [1, 0.8],
              translateY: [0, -100],
              offset: '-=700',
            })
            .add({
              targets: this.DOM.description,
              duration: 700,
              easing: [0.8, 0, 0.2, 1],
              height: this.DOM.description.querySelector('p').getBoundingClientRect().height,
              translateY: [20, 0],
              opacity: 1,
              offset: '-=600',
            })
            .add({
              targets: this.DOM.downButton,
              duration: 700,
              easing: [0.8, 0, 0.2, 1],
              opacity: 1,
              translateY: [600, 100],
              height: 80,
              begin: () => {
                this.DOM.downButton.style.visibility = 'visible'
              },
              complete: () => this.isAnimating = false,
              offset: '-=600'
            })
        }

        animateShapeIn.finished.then(animateShapeOut)
      },
      scrollHandler(e) {
        let elementHeight = this.DOM.bg.getBoundingClientRect().height
        this.DOM.bg.style.transform = `translateY(${-window.pageYOffset}px) scale(1.5)`
        this.DOM.bg.style.opacity = (-(1 - (elementHeight - window.pageYOffset) / elementHeight) * 2) + 0.2;
      }
    }
  }
</script>

<style lang="scss">
  header {
    display: flex;
    align-self: center;
    padding: 1rem 2rem;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
  }

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
    button {
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

  .asia__template {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  .asia__template-background {
    display: block;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0.5;
  }

  .logo {
    flex: 1;
    svg {
      width: 3rem;
      height: 3rem;
    }
    h1 {
      font-size: 2rem;
      font-weight: lighter;
      span {
        font-weight: bold;
      }
    }
  }

  .nav {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    list-style: none;
    li {
      margin: 0 1rem;
      a {
        text-transform: uppercase;
        color: #000;
        letter-spacing: 2px;
      }
    }
  }

  .booking {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 1rem;
  }

  .shape {
    position: absolute;
    z-index: 0;
    top: 0;
  }

  .key-benefit {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    &:nth-child(odd) {
      background: crimson;
    }
    .item {

    }
  }
</style>
