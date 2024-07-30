export function attachAutoResize (SetDevice, SetFontSize) {
  const resize = () => {
    const innerWidth = window.innerWidth
    const elem = document.documentElement

    // 画面最小的长或宽，做 fontsize 基础
    const base = (window.innerHeight >= innerWidth) ? innerWidth : window.innerHeight
    const scale = (base / 375) * 100

    // fontsize-基准不超过 max, 网页版固定 16px
    const max = 120
    let fontSize = scale < max ? scale : max
    if (innerWidth >= 768) fontSize = 100 * 16 / 14

    SetFontSize(fontSize)
    elem.style.fontSize = `${fontSize}px`

    // device-宽度基准 768
    const deviceList = ['desktop', 'mobile']
    const isMobile = innerWidth < 768

    SetDevice(deviceList[+isMobile])
    if (elem.classList.contains(deviceList[+!isMobile])) {
      elem.classList.toggle(deviceList[+!isMobile])
    }
    elem.classList.add(deviceList[+isMobile])

    // orientation
    const orientationList = ['landscape', 'portrait']
    const isPortrait = isMobile && (window.orientation === 0 || window.orientation === 180)
    if (elem.classList.contains(orientationList[+!isPortrait])) {
      elem.classList.toggle(orientationList[+!isPortrait])
    }
    elem.classList.add(orientationList[+isPortrait])
  }
  resize()

  window.addEventListener('resize', resize)
  window.addEventListener('pageshow', function (e) {
    if (e.presisted) {
      resize()
    }
  })
}
