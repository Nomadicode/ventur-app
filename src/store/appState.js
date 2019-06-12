const AppState = {
  namespaced: true,

  state: {
    location: null,
    timezone: null
  },
  mutations: {
    SET_LOCATION (state, locationData) {
      state.location = {
        latitude: locationData.latitude,
        longitude: locationData.longitude
      }
    },
    SET_TIMEZONE (state, timezone) {
      state.timezone = timezone
    }
  },
  getters: {
    timezone: state => {
      return (state.timezone) ? state.timezone : null
    },
    currentLocation: state => {
      return (state.location) ? state.location : null
    }
  }
}

export default AppState
