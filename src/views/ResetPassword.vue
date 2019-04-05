<template>
  <v-layout
    align-center
    justify-center
    column>
    <img
      alt="Driftr Logo"
      class="space-bottom--double"
      height="150"
      src="@/assets/images/logo.svg" />

      <h4>Reset Your Password</h4>

      <v-text-field
        v-model="newPassword"
        label="new password"
        class="fill-width"
        dark
        color="white"></v-text-field>

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
        color="white"
        @click="goBack()">Go Back</v-btn>
  </v-layout>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data () {
    return {
      newPassword: ''
    }
  },
  methods: {
    resetPassword () {
      console.log('Test')
    },
    goBack () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
