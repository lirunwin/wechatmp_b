export default ({ store, route, redirect }) => {
  store.commit('sys/SET_META', route.meta)
}
