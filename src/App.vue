<template>
  <div id="App">
    <header>
      <h1>Unicorn Message</h1>
      <nav>
        <router-link to="/user">User</router-link> |
        <router-link to="/">Home</router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<style lang="scss">
#App {
  // * {
  //   border: 1px solid #0000ff;
  // }

  display: flex;
  flex-direction: column;
  height: 100%;

  header {
    padding: 16px;
    background: url("assets/images/header-background.gif");
    background-color: #880f48;
    color: #ffffff;
    text-align: center;
    box-shadow: 0 2px 8px #000000;

    h1 {
      font-size: 2.5rem;
      text-shadow: 0 4px 2px #000000, 0 0 32px #000000;
      transform: scaleY(1.1);
    }

    nav {
      padding-top: 8px;

      a {
        color: #ffffff;
        font-size: 1.25rem;
        font-weight: bold;
        text-shadow: 0 2px 2px #000000;
      }
    }
  }

  .view {
    flex: 1;
    padding: 16px;
  }
}
</style>
