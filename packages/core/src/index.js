const DEFAULT_BREAKPOINT = 768
const DEFAULT_APPEARANCE_KEY = 'current-appearance'

export function resolveDeviceType (width, breakpoint = DEFAULT_BREAKPOINT) {
  return width < breakpoint ? 'mobile' : 'desktop'
}

export function applyAppearanceClass (mode, target = document.body) {
  if (!target || !target.classList) return

  const classMap = ['light-mode', 'dark-mode']
  classMap.forEach((item) => target.classList.remove(item))

  if (mode === 'light') target.classList.add('light-mode')
  if (mode === 'dark') target.classList.add('dark-mode')
}

export function createAppearanceStore (storage = localStorage, key = DEFAULT_APPEARANCE_KEY) {
  return {
    get (defaultValue = 'dark') {
      return storage.getItem(key) || defaultValue
    },
    set (value) {
      storage.setItem(key, value)
      return value
    }
  }
}

export function attachAutoResize (setDevice, setFontSize, options = {}) {
  const breakpoint = options.breakpoint || DEFAULT_BREAKPOINT
  const maxScale = options.maxScale || 120

  const resize = () => {
    const innerWidth = window.innerWidth
    const base = window.innerHeight >= innerWidth ? innerWidth : window.innerHeight
    const scale = (base / 375) * 100
    let fontSize = scale < maxScale ? scale : maxScale

    if (innerWidth >= breakpoint) {
      fontSize = (100 * 16) / 14
    }

    setFontSize(fontSize)
    const elem = document.documentElement
    elem.style.fontSize = `${fontSize}px`

    const deviceList = ['desktop', 'mobile']
    const isMobile = innerWidth < breakpoint
    setDevice(deviceList[+isMobile])

    if (elem.classList.contains(deviceList[+!isMobile])) {
      elem.classList.toggle(deviceList[+!isMobile])
    }
    elem.classList.add(deviceList[+isMobile])

    const orientationList = ['landscape', 'portrait']
    const isPortrait =
      isMobile && (window.orientation === 0 || window.orientation === 180)
    if (elem.classList.contains(orientationList[+!isPortrait])) {
      elem.classList.toggle(orientationList[+!isPortrait])
    }
    elem.classList.add(orientationList[+isPortrait])
  }

  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      resize()
    }
  })

  return () => {
    window.removeEventListener('resize', resize)
  }
}
