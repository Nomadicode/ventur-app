<template>
  <form class="fill-width">
    <label class="field-label accent-color block pad-top--half">Full Name</label>
    <el-input
      v-model="name"
      placeholder="John Smith" />

    <label class="field-label accent-color block pad-top--half">Email</label>
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
      depressed
      round
      large
      class="fill-width space-sides--none primary-color space-top"
      color="white"
      @click="processRegistration()">Create Account</v-btn>
  </form>
</template>

<script>
import converters from '@/services/converters'
import { parseErrors, displayError } from '@/services/helpers'

export default {
  name: 'RegisterForm',
  data () {
    return {
      name: null,
      email: null,
      password: null
    }
  },
  methods: {
    processRegistration () {
      if (this.name && this.email && this.password) {
        var self = this

        var register = {
          name: this.name,
          email: this.email,
          password: this.password
        }

        this.$auth.register(register).then((result) => {
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
      this.name = null
      this.email = null
      this.password = null
    }
  }
}
</script>