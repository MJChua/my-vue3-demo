<template>
  <footer class="site-footer">
    <div class="container site-footer__content">
      <p class="site-footer__slogan">{{ $t('footer.slogan') }}</p>

      <div class="site-footer__social">
        <span>{{ $t('footer.socialTitle') }}</span>
        <a v-for="item in socials" :key="item.key" :href="item.href" target="_blank" rel="noopener noreferrer">
          {{ $t(item.labelKey) }}
        </a>
      </div>

      <p class="site-footer__copyright">{{ $t('footer.copyright') }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterNav',
  setup () {
    const socials = [
      { key: 'ig', labelKey: 'footer.socialIg', href: 'https://www.instagram.com/' },
      { key: 'fb', labelKey: 'footer.socialFb', href: 'https://www.facebook.com/' },
      { key: 'threads', labelKey: 'footer.socialThreads', href: 'https://www.threads.net/' }
    ]

    return {
      socials
    }
  }
}
</script>

<style lang="stylus" scoped>
.site-footer
  margin-top 32px
  border-radius 18px 18px 0 0
  background var(--white-footer)

  &__content
    display grid
    gap 12px
    padding 18px 14px 20px

  &__slogan
    margin 0
    color var(--black-70-percent)
    font-weight 700

  &__social
    display flex
    flex-wrap wrap
    align-items center
    gap 10px
    color var(--black-70-percent)

    a
      text-decoration none
      padding 4px 10px
      border-radius 999px
      border 1px solid var(--black-30-percent)
      color var(--black-70-percent)
      background var(--header-control-bg)

  &__copyright
    margin 0
    color var(--black-70-percent)
    font-size 12px

@media (max-width: 767px)
  .site-footer
    display none
</style>
