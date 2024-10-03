<template>
  <main class="project container">
    <div class="mx-auto text-center">
      <strong class="title p-10 fz-24">Project</strong>

      <div class="content mt-28 p-20">
        <p :class="$isMobile() ? 'fz-30' : 'fz-40'">Show you what us can!</p>
        <p :class="$isMobile() ? 'fz-30' : 'fz-40'">These are our product.</p>
        <p :class="$isMobile() ? '' : 'fz-20'">All those customer pic were build from xxxxxxxxxx</p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ProjectPage'
}
</script>

<style lang="stylus" scoped>
  .project
    margin-top 50px

    .title
      text-decoration underline

    .content
      background var(--white-50-percent)
      border-radius 15px

</style>
