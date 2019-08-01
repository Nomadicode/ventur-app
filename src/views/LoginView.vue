<template>
  <v-layout
    fill-height
    align-center
    justify-center
    column>
    <img
      alt="Driftr Logo"
      :class="{'space-bottom--double': !registerActive, 'space-bottom': registerActive}"
      :height="registerActive || loginActive ? '50' : '75'"
      src="@/assets/images/logo.svg" />

      <form class="fill-width" v-if="loginActive">
        <label class="field-label accent-color">Email</label>
        <el-input
          v-model="login.email"
          placeholder="test@example.com" />

        <label class="field-label accent-color block pad-top--half">Password</label>
        <el-input
          v-model="login.password"
          placeholder="password"
          show-password />

        <router-link class="reset-link pad-top--half" :to="{ name: 'forgot-password' }">forgot password?</router-link>
      </form>

      <v-btn
        outline
        round
        large
        class="fill-width"
        :class="{'space': !registerActive}"
        color="white"
        @click="loginClicked()">Sign In</v-btn>

      <form class="fill-width" v-if="registerActive">
        <label class="field-label accent-color block pad-top--half">Full Name</label>
        <el-input
          v-model="register.name"
          placeholder="John Smith" />

        <label class="field-label accent-color block pad-top--half">Email</label>
        <el-input
          v-model="register.email"
          placeholder="test@example.com" />

        <label class="field-label accent-color block pad-top--half">Password</label>
        <el-input
          v-model="register.password"
          placeholder="password"
          show-password />

        <label class="field-label accent-color block pad-top--half">Date of Birth</label>
        <el-input
          v-model="register.date_of_birth"
          v-inputmask
          data-inputmask="'mask': '99/99/9999', 'greedy': 'true'"
          placeholder="mm/dd/yyyy">
        </el-input>
      </form>
      <v-btn
        depressed
        round
        large
        class="fill-width primary-color space-top"
        :class="{'space-bottom': !registerActive}"
        color="white"
        @click="registerClicked()">Create Account</v-btn>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import converters from '@/services/converters'
import moment from 'moment'

export default {
  name: 'home',
  created () {
    if (this.token) {
      this.$router.push({ name: 'events' })
    }
  },
  data () {
    return {
      loginActive: false,
      registerActive: false,
      showLoginPassword: false,
      showRegisterPassword: false,
      login: {
        email: null,
        password: null
      },
      register: {
        name: null,
        email: null,
        password: null,
        date_of_birth: null
      }
    }
  },
  computed: {
    ...mapGetters('UserModule', ['token'])
  },
  methods: {
    loginClicked () {
      if (this.loginActive) {
        this.processLogin()
      } else {
        this.loginActive = true
        this.registerActive = false
      }
    },
    processLogin () {
      if (this.login.email && this.login.password) {
        var self = this
        this.$http.post('/auth/login/', this.login).then((result) => {
          var user = converters.objToCamel(result.data)
          self.$store.commit('UserModule/LOGIN_USER', user)
          self.$router.push({ name: 'events' })
        }).catch((error) => {
          var errorData = error.response ? error.response.data : error.message
          var errorMessage = self.parseErrors(errorData)
          self.displayError(errorMessage)
        })
      } else {
        this.displayError('Error: All fields required')
      }
    },
    async processRegistration () {
      if (this.register.name && this.register.email && this.register.password && this.register.date_of_birth) {
        if (this.dateValid(this.register.date_of_birth)) {
          var self = this

          var register = Object.assign({}, this.register)
          var dateOfBirth = moment(register.date_of_birth)
          var age = moment().diff(dateOfBirth, 'years')

          if (age >= 13) {
            register.date_of_birth = dateOfBirth.format('YYYY-MM-DD')

            this.$auth.register(register).then((result) => {
              var user = converters.objToCamel(result.data)
              self.$store.commit('UserModule/LOGIN_USER', user)
              self.$router.push({ name: 'events' })
            }).catch((error) => {
              var errorData = error.response ? error.response.data : error.message
              var errorMessage = self.parseErrors(errorData)
              self.displayError(errorMessage)
            })
          } else {
            this.displayError('You must be 13 or older to use Driftr.')
          }
        } else {
          this.displayError('Error: Invalid date set for date of birth.')
        }
      } else {
        this.displayError('Error: All fields required')
      }
    },
    displayError (message) {
      this.$message({
        type: 'error',
        message: message
      })
    },
    dateValid (dateString) {
      // First check for the pattern
      if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
        return false
      }

      // Parse the date parts to integers
      var parts = dateString.split('/')
      var day = parseInt(parts[1], 10)
      var month = parseInt(parts[0], 10)
      var year = parseInt(parts[2], 10)

      // Check the ranges of month and year
      if (year < 1900 || year > 3000 || month === 0 || month > 12) {
        return false
      }

      var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]

      // Adjust for leap years
      if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        monthLength[1] = 29
      }

      // Check the range of the day
      return day > 0 && day <= monthLength[month - 1]
    },
    parseErrors (error) {
      if (typeof error === 'string') { return error }

      var keys = Object.keys(error)
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i]

        var message = error[k][0]
      }

      return message
    },
    registerClicked () {
      if (this.registerActive) {
        this.processRegistration()
      } else {
        this.loginActive = false
        this.registerActive = true
      }
    }
  }
}
</script>
