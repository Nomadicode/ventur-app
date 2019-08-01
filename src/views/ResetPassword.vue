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

      <h4 class="accent-color">Reset Your Password</h4>

      <el-input
        class="fill-width space-top space-bottom--quad"
        v-model="newPassword"
        placeholder="new password"
        show-password></el-input>

      <v-btn
        outline
        round
        large
        class="fill-width space"
        color="white"
        @click="resetPassword()">Reset Password</v-btn>
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
      newPassword: ''
    }
  },
  methods: {
    resetPassword () {
      var self = this
      this.$http.post('/auth/password/reset/confirm/', { email: this.email }).then(function (result) {
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
