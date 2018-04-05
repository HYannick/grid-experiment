<template>
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
</template>
<style lang="scss">
  header {
    display: flex;
    align-self: center;
    padding: 1rem 2rem;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
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