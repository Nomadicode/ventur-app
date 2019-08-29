import moment from 'moment-timezone'
import * as DefaultAvatar from '../assets/images/avatar.svg'

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
    userId: state => {
      return (state.user) ? state.user.id : null
    },
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
      return (state.user && state.user.profilePicture) ? state.user.profilePicture : DefaultAvatar
    },
    age: state => {
      return (state.user && state.user.dateOfBirth) ? moment().diff(state.user.dateOfBirth, 'years') : null
    }
  }
}

export default UserModule
