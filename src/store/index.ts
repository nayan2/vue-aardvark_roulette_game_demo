import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameLog: '' as string,
    gameEvents: [] as any,
    gameResult: -1 as number,
    gameStats: [] as any,
    numberOfAnimations: 3 as number,
    gameConfiguration: { colors: [], results: [] },
    spinnerState: false
  },
  mutations: {
    setGameConfiguration: (state, payload) => {
      state.gameConfiguration = payload;
    },
    setgameStats: (state, payload) => {
      state.gameStats = payload;
    },
    addGameLocalLog: (state, payload) => {
      state.gameLog += `${ new Date().toISOString() }' '${ payload }\r\n`;
    },
    setGameResult: (state, payload) => {
      state.gameResult = payload;
    },
    resetGameResult: state => {
      state.gameResult = -1;
    },
    decrementNumberOfAnimation: (state) => {
      state.numberOfAnimations -= 1;
    },
    resetNumberOfAnimation: state => {
      state.numberOfAnimations = 3;
    },
    addGameEvent: (state, payload) => {
      let currLength = state.gameEvents.length;
      payload['Id'] = currLength++;
      state.gameEvents.push(payload);
    },
    toggelSpinner: state => {
      state.spinnerState = !state.spinnerState;
    }
  },
  getters: {
    state: state => {
      return { gameConfiguration: state.gameConfiguration, stats: state.gameStats };
    },
    gameConfiguration: state => state.gameConfiguration,
    events: state => state.gameEvents,
    gameLog: state => state.gameLog,
    numberOfAnimations: state => state.numberOfAnimations,
    spinnerState: state => state.spinnerState,
    gameResult: state => state.gameResult
  }
})
