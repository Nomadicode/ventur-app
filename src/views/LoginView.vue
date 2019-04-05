<template>
  <v-layout
    fill-height
    align-center
    justify-center
    column>
    <img
      alt="Driftr Logo"
      :class="{'space-bottom--double': !registerActive, 'space-bottom': registerActive}"
      :height="registerActive || loginActive ? '100' : '150'"
      src="@/assets/images/logo.svg" />

      <form class="fill-width" v-if="loginActive">
        <v-text-field
          v-model="login.email"
          label="email"
          dark
          color="white"></v-text-field>

        <v-text-field
          dark
          v-model="login.password"
          :type="showLoginPassword ? 'text' : 'password'"
          label="password"
          :append-icon="showLoginPassword ? 'visibility_off' : 'visibility'"
          @click:append="showLoginPassword = !showLoginPassword"
          color="white"></v-text-field>

        <a class="reset-link" href="/password/forgot">forgot password?</a>
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
        <v-text-field
          dark
          v-model="register.name"
          label="full name"
          color="white"></v-text-field>
        <v-text-field
          dark
          v-model="register.email"
          label="email"
          color="white"></v-text-field>
        <v-text-field
          dark
          v-model="register.password"
          :type="showRegisterPassword ? 'text' : 'password'"
          label="password"
          :append-icon="showRegisterPassword ? 'visibility_off' : 'visibility'"
          @click:append="showRegisterPassword = !showRegisterPassword"
          color="white"></v-text-field>
      </form>
      <v-btn
        depressed
        round
        large
        class="fill-width primary-color"
        :class="{'space-bottom': !registerActive}"
        color="white"
        @click="registerClicked()">Create Account</v-btn>

      <v-btn
        depressed
        large
        dark
        round
        class="fill-width facebook-login"
        color="#4067AC"
        @click="authenticate('facebook')">
         <v-icon dark left>$vuetify.icons.facebook</v-icon>
         Continue with Facebook</v-btn>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import converters from '@/services/converters'

export default {
  name: 'home',
  created () {
    if (this.token) {
      this.$router.push({ name: 'explore-random' })
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
        firstName: null,
        lastName: null,
        email: null,
        password: null
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
        this.$auth.login(this.login).then((result) => {
          var user = converters.objToCamel(result.data)
          self.$store.commit('UserModule/LOGIN_USER', user)
          self.$router.push({ name: 'explore-random' })
        }).catch((error) => {
          var errorMessage = self.parseErrors(error.response.data)
          self.$message({
            type: 'error',
            message: errorMessage
          })
        })
      } else {
        this.$message({
          type: 'error',
          message: 'Error: All fields required'
        })
      }
    },
    async processRegistration () {
      if (this.register.firstName && this.register.lastName && this.register.email && this.register.password) {
        var self = this
        this.$auth.register(this.login).then((result) => {
          var user = converters.objToCamel(result.data)
          self.$store.commit('UserModule/LOGIN_USER', user)
          self.$router.push({ name: 'explore-random' })
        }).catch((error) => {
          var errorMessage = self.parseErrors(error.response.data)
          self.$message({
            type: 'error',
            message: errorMessage
          })
        })
      } else {
        this.$message({
          type: 'error',
          message: 'Error: All fields required'
        })
      }
    },
    parseErrors (error) {
      var keys = Object.keys(error)
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i]

        var message = error[k][0]
      }

      return message
    },
    authenticate: function (provider) {
      this.$auth.authenticate(provider).then(function (result) {
        console.log(result)
        // Execute application logic after successful social authentication
      })
    },
    registerClicked () {
      if (this.registerActive) {
        this.processRegistration()
      } else {
        this.loginActive = false
        this.registerActive = true
      }
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
</style>
