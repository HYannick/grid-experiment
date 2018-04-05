<template>
  <div class="asia__template">
    <a-header></a-header>
    <section class="hero">
      <img class="hero__background" src="/asia-0.jpg"/>
      <a-hero-heading @onGo="updateFrame" @onPressedDown="slideDown"></a-hero-heading>
    </section>
    <section id="key-benefits" class="key-benefits">
      <a-key-benefit :kb="kb" v-for="(kb, index) in keyBenefits" :key="index"></a-key-benefit>
    </section>
  </div>
</template>

<script>
  import anime from 'animejs';
  import _ from 'lodash';
  import AHeader from '~/components/Header'
  import AHeroHeading from '~/components/HeroHeading'
  import AKeyBenefit from '~/components/KeyBenefit'

  export default {
    components: {
      AHeader,
      AHeroHeading,
      AKeyBenefit
    },
    data() {
      return {
        keyBenefits: [
          {
            cover: '/kb-5.jpg',
            subTitle: '風景',
            title: 'Landscapes',
            url: '#nono',
          },
          {
            cover: '/kb-2.jpg',
            subTitle: '自然',
            title: 'Nature',
            url: '#nono',
          },
          {
            cover: '/kb-0.jpg',
            subTitle: '人',
            title: 'People',
            url: '#nono',
          }
        ],
        DOM: {},
        rect: {},
        paths: {},
        isAnimating: false,
        settings: {
          animation: {
            shape: {
              duration: 400,
              easing: {in: 'easeOutQuint', out: 'easeInQuad'}
            },
            mainSettings: {
              duration: 700,
              easing: [0.8, 0, 0.2, 1],
            }
          },
          frameFill: '#000'
        },
        scrollToSettings: {
          container: 'body',
          easing: [0.8, 0, 0.2, 1],
          cancelable: true,
          offset: -70,
          x: false,
          y: true
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
      this.DOM.el = document.querySelector('.hero')
      this.DOM.titles = this.DOM.el.querySelector('header');
      this.DOM.bg = this.DOM.el.querySelector('.hero__background')
      this.DOM.goButton = this.DOM.el.querySelector('.big__heading > .go')
      this.DOM.downButton = this.DOM.el.querySelector('.big__heading > .down')

      this.DOM.title = this.DOM.el.querySelector('.big__heading')
      this.DOM.description = this.DOM.el.querySelector('.big__heading > .big__heading-description')

      this.rect = this.DOM.el.getBoundingClientRect();

      this.DOM.kb = Array.from(document.querySelectorAll('.key-benefit'))
      const observer = new IntersectionObserver((entries) => {
        const animateShape = (target, state) => {
          const t = anime.timeline().add({
            targets: target.cover,
            duration: 1000,
            easing: 'linear',
            opacity: {
              value: state === 'kb-final' ? [1, 0] : [0, 1]
            }
          })
            .add({
              targets: target.path,
              duration: 2000,
              elasticity: 100,
              d: this.calculatePath(state, target.rtl),
              offset: '-=900'
            })
            .add({
              targets: target.content,
              duration: 2000,
              translateY: state === 'kb-final' ?  [0, '50%'] : ['50%', 0],
              elasticity: 200,
              opacity: state === 'kb-final' ?  [1, 0] : [0, 1],
              offset: '-=1900'
            })
            .add({
              targets: target.border,
              duration: 2000,
              translateY: state === 'kb-final' ?  ['-50%', 0] : [0, '-50%'],
              offset: '-=2000'
            })
          return t.play()

        }
        entries.forEach(entry => {
          const el = {
            path: entry.target.querySelector('.key-benefit__shape path'),
            cover: entry.target.querySelector('.key-benefit > .key-benefit__img'),
            content: entry.target.querySelector('.key-benefit > .key-benefit__content'),
            border: entry.target.querySelector('.key-benefit > .key-benefit__content > .key-benefit__content-border'),
            rtl: entry.target.rtl
          }
          if (entry.intersectionRatio > 0) {
            animateShape(el, 'kb-initial')
          } else {
            animateShape(el, 'kb-final')
          }
        });
      });

      this.DOM.kb.forEach((kb, i) => {
        const rtl = i % 2 === 0 ? 'left' : 'right';
        this.kbFrame(kb, i, rtl)
        kb.rtl = rtl
        observer.observe(kb);
      });

      this.createFrame()
    },
    methods: {
      calculatePath(path = 'initial', rtl) {
        let r = Math.sqrt(Math.pow(this.rect.height, 2) + Math.pow(this.rect.width, 2));
        const rInitialOuter = r;
        const rInitialInner = r;
        const rFinalOuter = r;
        const rFinalInner = this.rect.width / 4.5
        const getCenter = () => `${this.rect.width / 2}, ${this.rect.height / 2}`;
        const getPos = (distance, rtl) =>
          rtl === 'left' ? `${distance}, ${this.rect.height / 2}` : `${this.rect.width-distance}, ${this.rect.height / 2}`;
        if (path === 'initial') {
          return `M ${getCenter()} m 0 ${-rInitialOuter} a ${rInitialOuter} ${rInitialOuter} 0 1 0 1 0 z m -1 ${rInitialOuter - rInitialInner} a ${rInitialInner} ${rInitialInner} 0 1 1 -1 0 Z`
        } else if (path === 'kb-initial') {
          const rFinalInner = this.rect.width / 3.5;
          return `M ${getPos(this.rect.width / 4, rtl)} m 0 ${-rFinalOuter} a ${rFinalOuter} ${rFinalOuter} 0 1 0 1 0 z m -1 ${rFinalOuter - rFinalInner} a ${rFinalInner} ${rFinalInner} 0 1 1 -1 0 Z`;
        } else if (path === 'kb-final') {
          const rFinalInner = this.rect.width / 5;
          return `M ${getPos(rFinalInner, rtl)} m 0 ${-rFinalOuter} a ${rFinalOuter} ${rFinalOuter} 0 1 0 1 0 z m -1 ${rFinalOuter - rFinalInner} a ${rFinalInner} ${rFinalInner} 0 1 1 -1 0 Z`;
        } else {
          return `M ${getCenter()} m 0 ${-rFinalOuter} a ${rFinalOuter} ${rFinalOuter} 0 1 0 1 0 z m -1 ${rFinalOuter - rFinalInner} a ${rFinalInner} ${rFinalInner} 0 1 1 -1 0 Z`;
        }

      },
      kbFrame(el, i, rtl) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        const kbDims = el.getBoundingClientRect();
        svg.setAttribute('class', 'key-benefit__shape');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewbox', `0 0 ${kbDims.width} ${kbDims.height}`);
        this.kbPaths = {
          initial: this.calculatePath('kb-initial', rtl),
          final: this.calculatePath('kb-final', rtl)
        };
        svg.innerHTML = `
          <defs>
            <clipPath id="kb-shape__clip-${i}">
              <path fill="#FFF" d="${this.kbPaths.initial}"></path>
            </clipPath>
          </defs>
          <rect clip-path="url(#kb-shape__clip-${i})" fill="#fff" x="0" y="0" width="100%" height="100%"></rect>
            `;
        el.appendChild(svg);
        this.DOM.kbShape = svg.querySelector('path');
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
        this.$scrollTo('.key-benefits', 1000, this.scrollToSettings)
      },
      updateFrame() {
        document.body.style.overflow = 'visible'
        if (this.isAnimating) return;
        this.isAnimating = true;
        const animateShapeIn = anime({
          targets: this.DOM.shape,
          duration: this.settings.animation.shape.duration,
          easing: this.settings.animation.shape.easing.in,
          d: this.calculatePath('final')
        })

        const animateShapeOut = () => {
          const t = anime.timeline()
          t
            .add({
              targets: this.DOM.goButton,
              duration: this.settings.animation.mainSettings.duration,
              easing: this.settings.animation.mainSettings.easing,
              translateY: 10,
              opacity: 0,
              height: 0
            })
            .add({
              targets: this.DOM.shape,
              duration: this.settings.animation.shape.duration,
              easing: this.settings.animation.shape.easing.out,
              d: this.paths.initial,
              offset: '-=300'
            })
            .add({
              targets: this.DOM.bg,
              duration: this.settings.animation.mainSettings.duration,
              easing: this.settings.animation.mainSettings.easing,
              scale: [1, 1.5],
              opacity: 0.2,
              offset: '-=600',
            })
            .add({
              targets: this.DOM.title,
              duration: this.settings.animation.mainSettings.duration,
              easing: this.settings.animation.mainSettings.easing,
              scale: [1, 0.8],
              translateY: [0, -100],
              offset: '-=700',
            })
            .add({
              targets: this.DOM.description,
              duration: this.settings.animation.mainSettings.duration,
              easing: this.settings.animation.mainSettings.easing,
              height: this.DOM.description.querySelector('p').getBoundingClientRect().height,
              translateY: [20, 0],
              opacity: 1,
              offset: '-=600',
            })
            .add({
              targets: this.DOM.downButton,
              duration: this.settings.animation.mainSettings.duration,
              easing: this.settings.animation.mainSettings.easing,
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
        this.DOM.bg.style.transform = `translateY(${-window.pageYOffset / 2}px) scale(1.5)`
        this.DOM.bg.style.opacity = (-(1 - (elementHeight - window.pageYOffset) / elementHeight) * 2) + 0.2;
      }
    }
  }
</script>

<style lang="scss">

  .hero {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 10rem;
      background: -moz-linear-gradient(bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
      background: -webkit-linear-gradient(bottom, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
      background: linear-gradient(to top, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#00ffffff',GradientType=0 );

    }
  }

  .hero__background {
    display: block;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0.5;
  }

  .shape {
    position: absolute;
    z-index: 0;
    top: 0;
  }

</style>
