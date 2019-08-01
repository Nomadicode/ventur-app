<template>
  <v-layout
    align-center
    justify-center
    column>
    <img
      alt="Driftr Logo"
      class="space-bottom--double"
      height="50"
      src="@/assets/images/logo.svg" />

      <h4 class="accent-color">Recover Password</h4>

      <el-input
        class="fill-width space-top space-bottom--quad"
        v-model="email"
        placeholder="test@example.com"></el-input>

      <v-btn
        outline
        round
        large
        class="fill-width space"
        color="white"
        @click="recoverPassword()">Recover Password</v-btn>
      <v-btn
        flat
        large
        class="fill-width"
        color="error"
        @click="goBack()">Go Back</v-btn>
  </v-layout>
</template>

<script>
import { parseErrors } from '@/services/helpers.js'

export default {
  name: 'ForgotPassword',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    recoverPassword () {
      var self = this
      this.$http.post('/auth/password/reset/', { email: this.email }).then(function (result) {
        self.$message({
          type: 'success',
          message: 'Password recovery information has been sent to your email.'
        })
      }).catch(function (error) {
        var errorData = error.response ? error.response.data : error.message
        var message = parseErrors(errorData)
        self.$message({
          type: 'error',
          message: message
        })
      })
    },
    goBack () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
