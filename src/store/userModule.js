const UserModule = {
  namespaced: true,

  state: {
    token: null,
    user: null
  },
  mutations: {
    LOGIN_USER (state, userData) {
      state.user = userData.user
      state.token = userData.token
    },
    LOGOUT_USER (state) {
      state.user = null
      state.token = null
    },
    UPDATE_USER (state, userData) {
      state.user = userData
    }
  },
  getters: {
    email: state => {
      return (state.user) ? state.user.email : null
    },
    token: state => {
      return state.token
    },
    shortName: state => {
      return (state.user) ? state.user.name.split(' ')[0] : null
    },
    fullName: state => {
      return (state.user) ? state.user.name : null
    },
    data: state => {
      return state.user
    },
    profilePicture: state => {
      return (state.user) ? state.user.profile_picture : null
    }
  }
}

export default UserModule
