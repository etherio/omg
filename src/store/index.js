import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    User: null,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    SIGNIN({ commit }, user) {
      commit("SET_USER", user);
    },
    SIGNOUT({ commit }) {
      commit("SET_USER", null);
    },
  },
});
