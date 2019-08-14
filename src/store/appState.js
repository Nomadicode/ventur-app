import moment from 'moment-timezone'

const AppState = {
  namespaced: true,

  state: {
    useDeviceLocation: false,
    location: null,
    timezone: null,
    filters: null
  },
  mutations: {
    SET_LOCATION (state, locationData) {
      state.location = {
        latitude: locationData.latitude,
        longitude: locationData.longitude
      }
    },
    SET_DEVICE_LOCATION (state, useDevice) {
      state.useDeviceLocation = useDevice
    },
    SET_TIMEZONE (state, timezone) {
      state.timezone = timezone
    },
    SET_FILTERS (state, filters) {
      state.filters = filters
    },
    RESET (state) {
      state.location = null
      state.timezone = null
    }
  },
  getters: {
    timezone: state => {
      return (state.timezone) ? state.timezone : null
    },
    useDeviceLocation: state => {
      return (state.useDeviceLocation) ? true : false
    },
    currentLocation: state => {
      return (state.location) ? state.location : null
    },
    savedFilters: state => {
      var defaultFilters = {
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().add(7, 'days').format('YYYY-MM-DD'),
        price: 150.00,
        duration: null,
        radius: 10
      }
      return (state.filters) ? state.filters : defaultFilters
    }
  }
}

export default AppState
