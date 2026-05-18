const loadedLocales = new Set()

const localePackLoaders = {
  'zh-TW': () => import(/* webpackChunkName: "locale-zh-tw" */ './messages/zhTw'),
  en: () => import(/* webpackChunkName: "locale-en" */ './messages/en')
}

async function importLocalePack (locale) {
  const loader = localePackLoaders[locale]
  if (!loader) {
    throw new Error(`Unsupported locale pack: ${locale}`)
  }

  const localeModule = await loader()
  return localeModule.default
}

export async function loadLocalePack (i18n, locale) {
  if (loadedLocales.has(locale)) return

  const localeMessages = await importLocalePack(locale)
  i18n.global.setLocaleMessage(locale, localeMessages)
  loadedLocales.add(locale)
}
