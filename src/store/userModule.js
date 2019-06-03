const UserModule = {
  namespaced: true,

  state: {
    token: null,
    user: null,
    location: null
  },
  mutations: {
    LOGIN_USER (state, userData) {
      state.user = userData.user
      state.token = userData.token
    },
    LOGOUT_USER (state) {
      state.user = null
      state.token = null
      state.location = null
    },
    UPDATE_USER (state, userData) {
      state.user = userData
    },
    SET_LOCATION (state, locationData) {
      state.location = {
        latitude: locationData.latitude,
        longitude: locationData.longitude
      }
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
    },
    timezone: state => {
      return (state.user) ? state.user.timezone : null
    },
    currentLocation: state => {
      return (state.location) ? state.location : null
    }
  }
}

export default UserModule
