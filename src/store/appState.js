const AppState = {
  namespaced: true,

  state: {
    feedbackModal: false,
    aboutModal: false
  },
  mutations: {
    OPEN_FEEDBACK_MODAL (state) {
      state.feedbackModal = true
    },
    CLOSE_FEEDBACK_MODAL (state) {
      state.feedbackModal = false
    },
    TOGGLE_FEEDBACK_MODAL (state) {
      state.feedbackModal = !state.feedbackModal
    },
    OPEN_ABOUT_MODAL (state) {
      state.aboutModal = true
    },
    CLOSE_ABOUT_MODAL (state) {
      state.aboutModal = false
    },
    TOGGLE_ABOUT_MODAL (state) {
      state.aboutModal = !state.aboutModal
    }
  },
  getters: {
    aboutModal: state => {
      return state.aboutModal
    },
    feedbackModal: state => {
      return state.feedbackModal
    }
  }
}

export default AppState
