<template>
  <div class="body loading frame">
    <div class="main">
      <svg class="vector vector--lines" width="100%" height="100%" viewBox="0 0 1441 790" preserveAspectRatio="none"
           aria-hidden="true">
        <path vector-effect="non-scaling-stroke"
              d="M1035.5 790V0m-315 790V0m-317 790V0M.5 490h1440M.5 725h1440M.5 490l403 235m633 .5 403-235"/>
      </svg>
      <svg class="vector vector--circle" width="100%" height="100%" viewBox="0 0 634 634"
           preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <circle vector-effect="non-scaling-stroke" cx="316" cy="316" r="316"></circle>
      </svg>
      <h1 class="title">Panoramic Diaries</h1>
      <nav class="menu">
        <a :href="menuItem.link" class="menu__item" v-for="menuItem in menu" :key='menuItem.label'>{{
            menuItem.label
          }}</a>
      </nav>
      <div class="slideshow">
        <div class="meta">
          <span class="meta__heading">Now seeing</span>
          <div class="meta__content">
            <span class="meta__content-title" v-for="slide in slides" :key="slide.metaLabel">{{
                slide.metaLabel
              }}</span>
          </div>
        </div>
        <nav class="nav nav--prev" @click="onNavigate('prev')">
          <div class="nav__imgwrap slides">
            <div class="nav__img slides__img" v-for="slide in slides" :key="slide.metaLabel">
              <div class="nav__img-inner slides__img-inner"
                   :style="{backgroundImage: `url('${slide.thumbnail}')`}"></div>
            </div>
          </div>
          <button class="unbutton nav__text no-select">Previous</button>
        </nav>
        <nav class="nav nav--next" @click="onNavigate('next')">
          <div class="nav__imgwrap slides">
            <div class="nav__img slides__img" v-for="slide in slides" :key="slide.metaLabel">
              <div class="nav__img-inner slides__img-inner"
                   :style="{backgroundImage: `url('${slide.thumbnail}')`}"></div>
            </div>
          </div>
          <button class="unbutton nav__text no-select">Next</button>
        </nav>
        <div class="gallery slides">
          <div class="gallery__img slides__img" v-for="slide in slides" :key="slide.metaLabel">
            <div class="gallery__img-inner slides__img-inner"
                 :style="{backgroundImage: `url('${slide.thumbnail}')`}"></div>
          </div>
        </div>
      </div>
      <div class="intro">
        <h2 class="intro__title">Sarif Industries</h2>
        <p class="intro__description">
          Mr Reis is a multi-disciplinary juggler who wrote an <a
          href="https://tympanus.net/codrops/?p=57421">article</a> on creative stuff and prayed for the <a
          href="https://tympanus.net/Development/Theodore/">previous demo</a> to wake him from oblivion. Sparkling water
          led him to realize that the only cozy place is <a
          href="https://github.com/codrops/ParanoiaSlideshow">GitHub</a> rather than the urban jungle.
        </p>
        <a class="intro__link" href="https://tympanus.net/codrops/category/playground/">View more</a>
      </div>
      <div class="author">by <a href="https://twitter.com/codrops">Codrops</a></div>
      <a class="showreel" href="#" aria-label="Play the showreel video">Showreel</a>
    </div>
  </div>
</template>

<script>
import slides from '~/static/panoramic/panoramic.json';
import {ParanoiaSlideshow} from "assets/js/ParanoiaSlideshow";

export default {
  data() {
    return {
      slides,
      menu: [
        {
          label: 'Contact',
          link: '#'
        },
        {
          label: 'Project',
          link: '#'
        },
        {
          label: 'About me',
          link: '#'
        },
        {
          label: 'Gaming',
          link: '#'
        },
        {
          label: 'Books',
          link: '#'
        },
      ],
      slideshowMain: null,
      slideshowNavNext: null,
      slideshowNavPrev: null
    }
  },
  mounted() {
    const bodyEl = document.querySelector('.body');
    const bodyColor = getComputedStyle(bodyEl).getPropertyValue('--color-bg');
    this.slideshowMain = new ParanoiaSlideshow(document.querySelector('.slideshow > div.slides'));
    this.slideshowNavNext = new ParanoiaSlideshow(document.querySelector('.slideshow nav.nav--next .slides'), {
      duration: 1,
      filtersAnimation: false
    });
    this.slideshowNavPrev = new ParanoiaSlideshow(document.querySelector('.slideshow nav.nav--prev .slides'), {
      duration: 1,
      filtersAnimation: false
    });

    const titleElems = [...document.querySelectorAll('.meta__content > .meta__content-title')];


    this.slideshowMain.setCurrentSlide();
    this.slideshowNavPrev.setCurrentSlide(this.slideshowMain.current ? this.slideshowMain.current - 1 : this.slideshowMain.slidesTotal - 1)
    this.slideshowNavNext.setCurrentSlide(this.slideshowMain.current < this.slideshowMain.slidesTotal - 1 ? this.slideshowMain.current + 1 : 0)
  },

  methods: {
    onNavigate(dir) {
      if (this.slideshowMain.isAnimating) return;

      this.slideshowMain[dir]();
      this.slideshowNavPrev[dir]();
      this.slideshowNavNext[dir]();
    }
  }
}
</script>

<style scoped lang="scss">
:root {
  font-size: 16px;
}

.body {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  margin: 0;
  --color-text: #000;
  --color-text-alt: #1D0460;
  --color-text-slide: #53dbf1;
  --color-bg: #4000EA;
  --color-link: #000;
  --color-link-hover: #f33ba5;
  --page-padding: 25px;
  color: var(--color-text);
  background-color: var(--color-bg);
  font-family: termina, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  will-change: background-color;

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
}

a {
  text-decoration: underline;
  color: var(--color-link);
  outline: none;
  cursor: pointer;
}

a:hover {
  text-decoration: none;
  color: var(--color-link-hover);
  outline: none;
}

/* Better focus styles from https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible */
a:focus {
  /* Provide a fallback style for browsers
   that don't support :focus-visible */
  outline: none;
  background: lightgrey;
}

a:focus:not(:focus-visible) {
  /* Remove the focus indicator on mouse-focus for browsers
   that do support :focus-visible */
  background: transparent;
}

a:focus-visible {
  /* Draw a very noticeable focus style for
   keyboard-focus on browsers that do support
   :focus-visible */
  outline: 2px solid red;
  background: transparent;
}

.unbutton {
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  font: inherit;
}

.unbutton:focus {
  outline: none;
}

.no-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.vector {
  position: fixed;
  pointer-events: none;
  fill: none;
  stroke: #000;
  stroke-width: 0.5px;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: none;
}

.vector--circle {
  width: 44%;
  left: 28%;
  top: -50%;
}

.intro {
  padding: var(--page-padding);

  &__title {
    margin: 0 0 2rem;
    font-size: 1rem;
    font-weight: 600;
  }

  &__description {
    line-height: 1.2;
    color: var(--color-text-alt);
  }
}


.menu {
  display: flex;
  flex-direction: column;
  padding: var(--page-padding);
  justify-self: end;
  line-height: 1.3;

  &__item {
    text-decoration: none;
  }
}

.author {
  grid-area: 2 / 1 / 4 / 2;
  align-self: center;
  padding-left: var(--page-padding);
}

.title {
  line-height: 1;
  font-size: clamp(1.75rem, 3vw, 15rem);
  white-space: nowrap;
  margin: 0;
  padding: var(--page-padding);
  justify-self: center;
}

.showreel {
  display: flex;
  align-items: center;
  grid-area: 4 / 3 / 5 / 4;
  align-self: center;
  justify-self: end;
  padding: var(--page-padding);
  text-decoration: none;
  color: var(--color-link-hover);

  &:before {
    content: '\00B7';
    font-size: 5rem;
    line-height: 0;
    margin: 0 0.25rem 0.25rem 0;
  }

  &:hover::before {
    animation: pulse 0.8s infinite alternate linear;
  }
}

.slideshow {
  height: 100vw;
  position: relative;
  display: grid;
  grid-template-columns: 60px minmax(200px, 70%) 60px;
  grid-template-areas: '... img ...'
						'nav-prev img nav-next'
						'... img ...'
						'title title title';
  justify-content: center;
}

.meta {
  grid-area: title;
  width: max-content;
  text-align: center;
  justify-self: center;
  margin: 1rem 0 0 0;

  &__heading {
    font-weight: 600;
    font-size: 0.75rem;
    display: block;
    margin: 0 0 0 0;
  }

  &__content {
    color: var(--color-text-slide);
    display: grid;

    &-title {
      opacity: 0;
      grid-area: 1 / 1 / 2 / 2;
      will-change: opacity, transform;
    }
  }
}


.gallery {
  grid-area: img;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  margin-top: auto;
  border-radius: 35vw 35vw 0 0;
  justify-self: center;

  &__img {
    overflow: hidden;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: 100%;
    height: 100%;
    will-change: opacity, transform;

    &-inner {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: 50% 50%;
      will-change: filter, transform;
    }
  }
}

.nav {
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-self: center;

  &:hover {
    .nav__text {
      color: var(--color-link-hover);
    }
  }

  &--prev {
    grid-area: nav-prev;
    align-items: flex-end;
    padding-right: 15px;
  }

  &--next {
    grid-area: nav-next;
    align-items: flex-start;
    padding-left: 15px;
  }

  &__imgwrap {
    background: #000;
    width: 35px;
    height: 55px;
    border-radius: 17px;
    overflow: hidden;
    position: relative;
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 100% 100%;
  }

  &__img {
    grid-area: 1 / 1 / 2 / 2;
    position: relative;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
    will-change: opacity, transform;

    &-inner {
      width: 35px;
      height: 55px;
      background-size: cover;
      will-change: filter, transform;
    }
  }

  &__text {
    text-transform: uppercase;
    cursor: pointer;
    display: none;
    margin-top: 3.5vh;
    color: var(--color-text-alt);
  }
}

.slides__img--current {
  pointer-events: auto;
  opacity: 1;
  z-index: 1000;
}

.no-js {
  .gallery__img:first-child {
    opacity: 1;
  }

  .meta {
    display: none;
  }

  .nav {
    display: none;
  }
}

@keyframes pulse {
  to {
    transform: scale3d(1.5, 1.5, 1);
  }
}

@media screen and (min-width: 53em) {

  .vector {
    display: block;
  }
  .main {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 28.05% 43.9% 28.05%;
    grid-template-rows: 25% 1fr 29.5% 8.5%;
    position: relative;
  }

  .title {
    grid-area: 1 / 2 / 2 / 3;
  }
  .menu {
    grid-area: 1 / 3 / 2 / 4;
  }
  .intro {
    grid-area: 1 / 1 / 3 / 2;
  }
  .intro__description {
    max-width: 20ch;
  }
  .gallery {
    border-radius: 25vw 25vw 0 0;
    width: 100%;
  }
  .slideshow {
    height: auto;
    grid-area: 2 / 2 / 5 / 3;
    grid-template-columns:  4rem 43.8vw 4rem;
    grid-template-rows: 38% 20% 42%;
    margin-left: -4rem;
    grid-template-areas: '... img title'
						'nav-prev img nav-next'
						'... img ...';
    justify-content: start;
  }

  .meta {
    margin: 3rem 0 0 1rem;
    text-align: left;
    justify-self: start;
  }
  .nav {
    align-self: start;
  }
  .nav__text {
    display: block;
  }
  .nav--prev {
    padding-right: 1.5rem;
  }

  .nav--next {
    padding-left: 1.5rem;
  }
}
</style>
