<template>
  <form class="fill-width">
    <label class="field-label accent-color">Email</label>
    <el-input
      type="email"
      v-model="email"
      placeholder="test@example.com" />

    <label class="field-label accent-color block pad-top--half">Password</label>
    <el-input
      v-model="password"
      placeholder="password"
      show-password />

    <v-btn
      outline
      round
      large
      class="fill-width space-sides--none space-top"
      color="white"
      @click="processLogin()">Sign In</v-btn>
  </form>
</template>

<script>
import converters from '@/services/converters'
import { parseErrors, displayError } from '@/services/helpers'

export default {
  name: 'LoginForm',
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    processLogin () {
      if (this.email && this.password) {
        var self = this
        this.$http.post('/auth/login/', { email: this.email, password: this.password }).then((result) => {
          var user = converters.objToCamel(result.data)
          self.$store.commit('UserModule/LOGIN_USER', user)
          self.$emit('processed')
        }).catch((error) => {
          var errorData = error.response ? error.response.data : error.message
          var errorMessage = parseErrors(errorData)
          self.displayError(errorMessage)
        })
      } else {
        self.displayError('Error: All fields required')
      }
    },
    displayError (message) {
      this.$message({
        type: 'error',
        message: message
      })
    }, 
    reset () {
      this.email = null
      this.password = null
    }
  }
}
</script>