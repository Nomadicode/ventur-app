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

      <h4>Recover Password</h4>

      <v-text-field
        v-model="email"
        label="email"
        class="fill-width"
        dark
        color="white"></v-text-field>

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
        color="white"
        @click="goBack()">Go Back</v-btn>
  </v-layout>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    recoverPassword () {
      console.log('Test')
    },
    goBack () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
