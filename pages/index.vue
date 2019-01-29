<template>
  <div>
    <section class="welcome">
      <h1 class="welcome-title">::Here is my <span>playground</span>::</h1>
      <ul class="welcome-nav">

        <li>
          <nuxt-link to="/events">Event Animation</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/asia">Asia Hero</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/slice">Slice Appearing</nuxt-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>

</script>

<style lang="scss">
  .welcome {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    flex-direction: column;
    &-title {
      display: block;
    }
    &-nav {
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 2rem;
      li {
        margin-bottom: 1.5rem;
      }
      a {
        font-size: 1.2rem;
        font-family: "Source Code Pro", sans-serif;
        color: #47494e;
      }
    }
  }

  h1 {
    font-size: 4rem;
    font-weight: lighter;
    span {
      font-weight: bold;
    }
  }

</style>
