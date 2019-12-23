import Vuex from 'vuex'

const store = () => new Vuex.Store({
  state: {
    token: '',
    user: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
    }
  }
})

export default store 