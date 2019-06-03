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
        <label>Email</label>
        <el-input
          v-model="login.email"
          placeholder="test@example.com" />

        <label class="block pad-top--half">Password</label>
        <el-input
          v-model="login.password"
          placeholder="password"
          show-password />

        <a class="reset-link pad-top--quarter" href="/password/forgot">forgot password?</a>
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
        <label class="block pad-top--half">Full Name</label>
        <el-input
          v-model="register.name"
          placeholder="John Smith" />

        <label class="block pad-top--half">Email</label>
        <el-input
          v-model="register.email"
          placeholder="test@example.com" />

        <label class="block pad-top--half">Password</label>
        <el-input
          class="pad-bottom--half"
          v-model="register.password"
          placeholder="password"
          show-password />
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
         Continue with Facebook
      </v-btn>
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
