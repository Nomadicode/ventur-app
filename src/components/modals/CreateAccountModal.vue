<template>
  <v-dialog
    light
    fullscreen
    scrollable
    v-model="modal">
    <v-card class="primary-gradient modal">
      <v-card-text class="full-height">
        <v-layout
          fill-height
          align-start
          justify-center
          column>
          
          <v-container class="pad-none pad-top--half" fluid grid-list-sm>
            <v-layout row wrap>
              <v-spacer />
              <v-flex xs2 class="horizontal-right">
                <v-icon
                  class="accent-color close"
                  @click="close()">close</v-icon>
              </v-flex>
            </v-layout>
          </v-container>

          <div class="pad-top--quarter">
            <h5 class="horizontal-center accent-color">You need an account to access that feature</h5>
            <img
              alt="Driftr Logo"
              class="block horizontal-center space-ends"
              height="50"
              src="@/assets/images/logo.svg" />

            <login-form ref="loginForm" v-if="loginActive" @processed="close"></login-form>

            <register-form ref="registerForm" v-else @processed="close"></register-form>
          </div>

          <div v-if="!loginActive" class="pad space-top fill-width accent-color text-center">Already have an account? <div class="regular-text" @click="loginActive = true">Login</div></div>
          <div v-else class="pad space-top--double fill-width accent-color text-center">Don't have an account? <div class="regular-text" @click="loginActive = false">Create an account</div></div>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import LoginForm from '@/components/elements/LoginForm'
import RegisterForm from '@/components/elements/RegisterForm'

export default {
  name: 'CreateAccountModal',
  created () {
    var self = this
    window.EventBus.$on('user:create-account', () => {
      self.modal = true
    })
  },
  data () {
    return {
      modal: false,
      loginActive: false
    }
  },
  methods: {
    close () {
      if (this.loginActive) {
        this.$refs.loginForm.reset()
      } else {
        this.$refs.registerForm.reset()
      }
      this.loginActive = false
      this.modal = false
    }
  },
  components: {
    LoginForm,
    RegisterForm
  }
}
</script>
