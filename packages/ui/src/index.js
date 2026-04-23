export const UiComponents = []

export function install (app) {
  UiComponents.forEach((component) => {
    if (component && component.name) {
      app.component(component.name, component)
    }
  })
}

export default {
  install
}
