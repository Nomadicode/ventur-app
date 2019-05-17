const AppState = {
  namespaced: true,

  state: {
    drawer: false,
    feedbackModal: false,
    aboutModal: false,
    activityCard: false,
    activityModal: false,
    randomModal: false,
    addFriendModal: false,
    addGroupModal: false
  },
  mutations: {
    RESET (state) {
      state.drawer = false
      state.feedbackModal = false
      state.aboutModal = false
      state.activityModal = false
    },
    OPEN_DRAWER (state) {
      state.drawer = true
    },
    CLOSE_DRAWER (state) {
      state.drawer = false
    },
    TOGGLE_DRAWER (state) {
      state.drawer = !state.drawer
    },
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
    },
    OPEN_ACTIVITY_CARD (state) {
      state.activityCard = true
    },
    CLOSE_ACTIVITY_CARD (state) {
      state.activityCard = false
    },
    TOGGLE_ACTIVITY_CARD (state) {
      state.activityCard = !state.activityCard
    },
    OPEN_ADD_FRIEND_MODAL (state) {
      state.addFriendModal = true
    },
    CLOSE_ADD_FRIEND_MODAL (state) {
      state.addFriendModal = false
    },
    TOGGLE_ADD_FRIEND_MODAL (state) {
      state.addFriendModal = !state.addFriendModal
    },
    OPEN_ADD_GROUP_MODAL (state) {
      state.addGroupModal = true
    },
    CLOSE_ADD_GROUP_MODAL (state) {
      state.addGroupModal = false
    },
    TOGGLE_ADD_GROUP_MODAL (state) {
      state.addGroupModal = !state.addGroupModal
    },
    OPEN_ACTIVITY_MODAL (state) {
      state.activityModal = true
    },
    CLOSE_ACTIVITY_MODAL (state) {
      state.activityModal = false
    },
    TOGGLE_ACTIVITY_MODAL (state) {
      state.activityModal = !state.activityModal
    },
    OPEN_RANDOM_MODAL (state) {
      state.randomModal = true
    },
    CLOSE_RANDOM_MODAL (state) {
      state.randomModal = false
    },
    TOGGLE_RANDOM_MODAL (state) {
      state.randomModal = !state.randomModal
    }
  },
  getters: {
    drawer: state => {
      return state.drawer
    },
    aboutModal: state => {
      return state.aboutModal
    },
    addFriendModal: state => {
      return state.addFriendModal
    },
    addGroupModal: state => {
      return state.addGroupModal
    },
    activityCard: state => {
      return state.activityCard
    },
    activityModal: state => {
      return state.activityModal
    },
    feedbackModal: state => {
      return state.feedbackModal
    }
  }
}

export default AppState
