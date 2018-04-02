<template>
  <div>
    <section class="home">
      <div class="sections">
        <div v-for="slide in slides" :key="slide.id" class="section">
          <div class="section__heading">
            <span class="week">w-2</span>
            <div class="section__heading-title">
              <span class="details">Details</span>
              <h1>{{slide.title}}</h1>
            </div>
            <div class="section__heading-description">
              <span>Wire</span>
              <p>I never tell you to get down -- It's all about coming up</p>
              <p>So you better duck away and hide out</p>
            </div>
          </div>
          <div class="section__cover" :data-source="slide.cover"></div>
          <div class="section__news">
            <div class="section__news-media">
              <div class="section__news-media-inner"
                   :style="{backgroundImage: `url('${slide.subCover}')`}"></div>
            </div>
            <div class="section__news-description">
              <span class="news__type">News</span>
              <h2 class="news__title">{{slide.newsTitle}}</h2>
              <a href="#0" class="news__more">Read more</a>
            </div>
          </div>
        </div>
        <div class="sections__controls">
          <button class="sections__controls-item--prev">
            <svg>
              <use xlink:href="#arrow-prev"></use>
            </svg>
          </button>
          <button class="sections__controls-item--next">
            <svg>
              <use xlink:href="#arrow-next"></use>
            </svg>
          </button>
        </div>
      </div>
      <div class="home__events">
        <h2 class="home__events-title">
          <svg>
            <use xlink:href="#sun"></use>
          </svg>
          <span>Events</span>
        </h2>
        <ul class="home__events-carousel">
          <li v-for="(event, i) in events" :key="i">
            <h3>{{event.title}}</h3>
            <p>{{event.description}}</p>
          </li>
        </ul>
      </div>
      <div class="home__nav">
        <ul>
          <li><a href="#0">Home</a></li>
          <li><a href="#0">Stories</a></li>
          <li><a href="#0">Contact</a></li>
          <li><a href="#0">
            <svg>
              <use xlink:href="#gallery"></use>
            </svg>
          </a></li>
          <li><a href="#0">
            <svg>
              <use xlink:href="#search"></use>
            </svg>
          </a></li>
        </ul>
      </div>
      <div class="home__social">
        <ul>
          <li><a href="#0">Facebook</a></li>
          <li><a href="#0">Twitter</a></li>
          <li><a href="#0">Instagram</a></li>
        </ul>
      </div>
    </section>
    <!--<section style="height: 300vh"></section>-->
  </div>
</template>

<script>
  import Slideshow from '~/assets/js/Slideshow.js'
  import slides from '~/static/slides.json'

  export default {
    data() {
      return {
        slides,
        events: [
          {
            title: '029c',
            description: '28 May, Hall of Fame',
          },
          {
            title: 'Cateline',
            description: '26 May, Hall of Fame',
          },
          {
            title: 'Zarya',
            description: '12 Aug., Hall of Fame',
          }
        ]
      }
    },
    mounted () {
      const slider = document.querySelector('.sections');
      slider.querySelectorAll('.section')[0].classList.add('section--current');
      new Slideshow(slider)
    }
  }
</script>

<style lang="scss">
  $brown: #716c6e;
  $light: #fff;
  $yellow: #fac000;
  $dark: #252525;
  .home {
    display: grid;
    grid-template-columns: 5% 45% 20% 25% 5%;
    grid-template-rows: 10vh 10vh 44vh 8vh 28vh;
    background: $dark;
    &__nav {
      grid-column: 4 / 5;
      grid-row: 2/ 2;
      z-index: 9;
      ul {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        list-style: none;
      }
      li {
        margin-right: 2rem;
        flex: 1;
        display: flex;
        a {
          display: block;
          font-size: 1rem;
          color: $light;
          text-decoration: none;
          svg {
            width: 0.8rem;
            height: 0.8rem;
            fill: $light;
            stroke: $light;
          }
        }
      }
    }
    &__events {
      grid-column: 1/ span 2;
      grid-row: 5 / span 5;
      background: $light;
      overflow: hidden;
      z-index: 9;
      padding: 3rem 5rem;
      &-title {
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        svg {
          fill: $dark;
          stroke: $dark;
          width: 1rem;
          height: 1rem;
          margin-right: 0.5rem;
        }
        span {
          font-size: 1rem;
          opacity: 0.6;
          font-weight: lighter;
        }
      }
      &-carousel {
        display: flex;
        padding: 0;
        list-style: none;
        > li {
          flex: 1;
          h3 {
            font-size: 2rem;
          }
          p {
            font-size: 0.8rem;
            opacity: 0.5;
          }
        }
      }
    }
    &__social {
      position: absolute;
      top: 30%;
      right: 2rem;
      display: flex;
      writing-mode: vertical-rl;
      ul {
        padding: 0;
        list-style: none;
        display: flex;
        li {
          margin-bottom: 2rem;
        }
        a {
          font-size: 0.8rem;
          color: $light;
          text-decoration: none;
        }
      }
    }
  }

  .sections {
    height: 100vh;
    overflow: hidden;
    display: grid;
    grid-area: 1/1/6/6;
    grid-template-columns: 50% 25% 25%;
    grid-template-rows: 64vh 8vh 28vh;
    &__controls {
      background: $dark;
      grid-column: 3/ 4;
      grid-row: 2/ 3;
      display: flex;
      width: 50%;
      position: relative;
      z-index: 1;
      button {
        background: transparent;
        border: none;
        flex: 1;
        outline: $light;
        cursor: pointer;
        display: flex;
        align-items: center;
        &:first-child {
          justify-content: flex-end;
        }
        justify-content: flex-start;
        svg {
          fill: $light;
          stroke: $light;
          width: 2rem;
          height: 1rem;
        }
      }
    }
  }

  .section {
    grid-area: 1 / 1 / 4 / 4;
    display: grid;
    grid-template-columns: 5% 45% 25% 25%;
    grid-template-rows: 10vh 10vh 44vh 8vh 28vh;
    pointer-events: none;
    &.section--current {
      pointer-events: auto;
    }
    &:not(.section--current) {
      .section__heading h1 span,
      .section__heading .details,
      .section__cover,
      .section__cover-cell,
      .section__heading-description,
      .section__news-media-inner,
      .section__news-description,
      .section__heading-controls {
        opacity: 0;
      }
    }
    &__heading {
      grid-column: 2/3;
      grid-row: 2/4;
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      .week {
        font-size: 1rem;
        color: $light;
      }
      &-title {
        flex: 0.7;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        h1 {
          overflow: hidden;
        }
        span, h1 {
          color: $light;
        }
        span {
          font-size: 1.2rem;
        }
        h1 span {
          margin: 0;
          display: inline-block;
          font-size: 6.5rem;
          font-weight: bold;
        }
      }
      &-controls {
        position: absolute;
        top: 0;
      }
      &-description {
        display: flex;
        flex-wrap: wrap;
        color: $light;
        span {
          font-weight: bold;
          opacity: 0.8;
          font-size: 1.2rem;
          width: 100%;
        }
        p {
          flex: 1;
          max-width: 15rem;
          width: 100%;
          display: block;
          font-size: 1.2rem;
          margin-right: 2rem;
        }
      }
    }
    .section__cover {
      background: $dark;
      grid-column: 1/ span 4;
      grid-row: 1/ span 4;
      overflow: hidden;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: $dark;
        opacity: 0.3;
        z-index: 1;
      }
      &-cell {
        width: 100%;
        display: block;
      }
    }
    .section__news {
      position: relative;
      z-index: 1;
      grid-column: 3/ span 5;
      grid-row: 4 / span 5;
      display: grid;
      grid-template-columns: 50% 20% 30%;
      grid-template-rows: 8vh auto;
      &-media {
        grid-column: 1/ 2;
        grid-row: 1/ 3;
        overflow: hidden;
        &-inner {
          width: 100%;
          height: 100%;
          background: no-repeat top center;
          background-size: cover;
        }
      }
      &-description {
        background: $dark;
        grid-column: 2/ 4;
        grid-row: 2/ 3;
        padding: 2rem;
        .news__type {
          color: $light;
          font-weight: bold;
          font-size: 1rem;
          opacity: 0.5;
          display: block;
          margin-bottom: 1.5rem;
        }
        .news__title {
          font-size: 1.6rem;
          font-weight: bold;
          color: $light;
          margin-bottom: 2rem;
        }
        .news__more {
          font-size: 0.8rem;
          color: $light;
          font-weight: bold;
          opacity: 0.5;
        }
      }
    }
  }

</style>
