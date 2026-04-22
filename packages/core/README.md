# @my-vue3/core

Shared framework-agnostic helpers for:
- device and font scaling
- appearance persistence
- appearance class toggling

## API (initial draft)
- `resolveDeviceType(width, breakpoint?)`
- `applyAppearanceClass(mode, target?)`
- `createAppearanceStore(storage?, key?)`
- `attachAutoResize(setDevice, setFontSize, options?)`
