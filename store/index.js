import axios from 'axios';

export const state = () => ({
  drawer: true
})

export const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer
  },
  drawer(state, val) {
    state.drawer = val
  }
}

const createStore = () => {
  return new Vuex.Store({
    
  })
}