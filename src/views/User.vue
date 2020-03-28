<template>
  <div id="view-User" class="view">
    <div class="background"></div>

    <h2 class="view-title">User</h2>
  </div>
</template>

<style lang="scss">
#view-User {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url("../assets/images/home-background.jpeg") no-repeat center /
      cover;
    opacity: 0.25;
  }

  $backgroundColor: rgba(255, 255, 255, 0.75);
  $boxShadow: 0 2px 8px rgba(0, 0, 0, 0.25);

  .view-title {
    text-shadow: $boxShadow;
  }
}
</style>

<script>
export default {
  name: "view-User",
  data: () => ({})
};
</script>