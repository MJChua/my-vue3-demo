import { createI18n } from 'vue-i18n'
import { loadLocalePack } from './localePackDb'

const LOCALE_STORAGE_KEY = 'current-locale'
const SUPPORTED_LOCALES = ['zh-TW', 'en']
const FALLBACK_LOCALE = 'en'
const DEFAULT_LOCALE = 'zh-TW'

function isLocaleSupported (locale) {
  return SUPPORTED_LOCALES.includes(locale)
}

function detectDefaultLocale () {
  if (typeof window === 'undefined') return DEFAULT_LOCALE

  const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (savedLocale && isLocaleSupported(savedLocale)) {
    return savedLocale
  }

  return navigator.language.toLowerCase().startsWith('zh') ? 'zh-TW' : 'en'
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: DEFAULT_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  messages: {}
})

export async function setupI18n () {
  const locale = detectDefaultLocale()

  await loadLocalePack(i18n, FALLBACK_LOCALE)
  await loadLocalePack(i18n, locale)

  i18n.global.locale.value = locale
  return locale
}

export function getLocale () {
  return i18n.global.locale.value
}

export async function setLocale (locale) {
  if (!isLocaleSupported(locale)) return getLocale()

  await loadLocalePack(i18n, locale)
  i18n.global.locale.value = locale

  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  }

  return locale
}

export async function toggleLocale () {
  const nextLocale = getLocale() === 'zh-TW' ? 'en' : 'zh-TW'
  return setLocale(nextLocale)
}
