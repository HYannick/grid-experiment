<template>
  <div>
    <section class="asia__template" style="background: url('/asia-3.jpg') center center no-repeat / cover">
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
    </section>
  </div>
</template>

<script>
  import anime from 'animejs';

  export default {
    data() {
      return {
        DOM: {}
      }
    },
    mounted() {
      this.DOM.el = document.querySelector('.asia__template')
      this.createFrame()
      console.log(this.DOM)
    },
    methods: {
      calculatePath(path = 'initial') {
        const r = Math.sqrt(Math.pow(this.rect.height,2) + Math.pow(this.rect.width,2));
        const rInitialOuter = r;
        const rInitialInner = r;
        const rFinalOuter = r;
        const rFinalInner = this.rect.width/3
        return path === 'initial' ?
          `M ${this.rect.width/2}, ${this.rect.height/2} m 0 ${-rInitialOuter} a ${rInitialOuter} ${rInitialOuter} 0 1 0 1 0 z m -1 ${rInitialOuter-rInitialInner} a ${rInitialInner} ${rInitialInner} 0 1 1 -1 0 Z` :
          `M ${getCenter()} m 0 ${-rFinalOuter} a ${rFinalOuter} ${rFinalOuter} 0 1 0 1 0 z m -1 ${rFinalOuter-rFinalInner} a ${rFinalInner} ${rFinalInner} 0 1 1 -1 0 Z`;
      },
      createFrame() {
        this.rect = this.DOM.el.getBoundingClientRect();
        this.DOM.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.DOM.svg.setAttribute('class', 'shape');
        this.DOM.svg.setAttribute('width', '100%');
        this.DOM.svg.setAttribute('height', '100%');
        this.DOM.svg.setAttribute('viewbox', `0 0 ${this.rect.width} ${this.rect.height}`);

        this.DOM.innerHTML = `
          <defs>
            <clipPath id="shape__clip">
              <path fill="#FFF" d="${this.path.initial}"></path>
            </clipPath>
          </defs>
          <rect clip-path="url(#shape__clip)" x="0" y="0" width="500px" height="500px"/>
            `;
      }
    }
  }
</script>

<style lang="scss">
  header {
    display: flex;
    align-self: center;
    padding: 1rem 2rem;
  }

  .asia__template {
    height: 100vh;
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
</style>
