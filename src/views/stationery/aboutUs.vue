<template>
  <main class="about-us container">
    <div class="mx-auto text-center">
      <strong class="title p-10 fz-24">About Us</strong>

      <div class="content mt-28 p-10">
        <p :class="$isMobile() ? 'fz-30' : 'fz-40'">The world’s destination</p>
        <p :class="$isMobile() ? 'fz-30' : 'fz-40'">for design</p>
        <p :class="$isMobile() ? '' : 'fz-20'">We’re on a mission to build the world’s best community for creatives to share, grow, and get hired.</p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style lang="stylus" scoped>
  .about-us
    margin-top 50px

    .title
      text-decoration underline

    .content
      background var(--white-50-percent)
      border-radius 15px

</style>
