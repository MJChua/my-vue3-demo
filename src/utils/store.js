import { computed } from 'vue'
import { useStore } from 'vuex'

const mapState = namespace => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store.state[namespace]).map(
      key => {
        return [key, computed(() => store.state[namespace][key])]
      }
    )
  )
}
const mapGetters = namespace => {
  const store = useStore()
  // namespace不存在
  if (!namespace) {
    return Object.fromEntries(
      Object.keys(store.getters).map(
        getter => [getter, computed(() => store.getters[getter])]
      )
    )
  }
  return Object.fromEntries(
    Object.keys(store.getters).filter(name => name.indexOf(namespace) > -1).map(
      getter => [getter.replace(`${namespace}/`, ''), computed(() => store.getters[getter])]
    )
  )
}
const mapMutations = namespace => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store._mutations).filter(name => name.indexOf(namespace) > -1).map(
      mutation => [mutation.replace(`${namespace}/`, ''), value => store.commit(mutation, value)]
    )
  )
}
const mapActions = namespace => {
  const store = useStore()
  // console.log(store._actions)
  return Object.fromEntries(
    Object.keys(store._actions).filter(name => name.indexOf(namespace) > -1).map(
      action => [action.replace(`${namespace}/`, ''), value => store.dispatch(action, value)]
    )
  )
}
export { mapState, mapGetters, mapMutations, mapActions }
