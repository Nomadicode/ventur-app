<template>
  <div>
    <h5>Security</h5>
    <div>
      <label class="field-label space-ends--quarter">Current Password</label>
      <el-input
        v-model="currentPassword"
        show-password
        type="password"
        placeholder="current password"></el-input>

      <label class="field-label space-top--half space-ends--quarter">New Password</label>
      <el-input
        v-model="newPassword"
        show-password
        type="password"
        placeholder="new password"></el-input>
    </div>
    <el-button
      class="fill-width space-top"
      type="default"
      @click="changePassword()">Change Password</el-button>

    <el-button
      class="fill-width space-left--none delete-button-bottom space-top--quad"
      type="danger"
      @click="deleteAccount()">Delete Account</el-button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import requestAccountDelete from '@/graphql/profile/mutations/deleteAccount.gql'

export default {
  name: 'Security',
  data () {
    return {
      currentPassword: '',
      newPassword: ''
    }
  },
  computed: {
    ...mapGetters('UserModule', ['token', 'userId']),
    headers () {
      return {
        'Authorization': 'JWT ' + this.token
      }
    }
  },
  methods: {
    changePassword () {
      if (this.currentPassword && this.newPassword) {
        var self = this
        var data = {
          'old_password': this.currentPassword,
          'new_password1': this.newPassword,
          'new_password2': this.newPassword
        }

        this.$http.post('/auth/password/change/', data, {headers: this.headers}).then(function (result) {
          self.currentPassword = ''
          self.newPassword = ''
          self.$message({
            message: 'Success: Password updated',
            type: 'success'
          })
        }).catch(error => {
          console.error(error)
          self.$message({
            message: 'Error: Unable to update password',
            type: 'error'
          })
        })
      }
    },
    deleteAccount () {
      var self = this
      this.$prompt('Enter your password to proceed. This cannot be undone.', 'Confirm Account Deletion', {
        confirmButtonText: 'DELETE ACCOUNT',
        confirmButtonClass: 'el-button--danger',
        cancelButtonText: 'Cancel'
      }).then(function () {
        self.$apollo.mutate({
          mutation: requestAccountDelete,
          variables: {
            pk: self.userId
          }
        }).then((data) => {
          self.$message({
            type: 'success',
            message: 'Your account deletion request is being processed. Please allow 7 days for the account to be removed.'
          })
        })
      }).catch((error) => {
        console.error(error)
        self.$message({
          type: 'error',
          message: 'Unable to delete account, please contact support: <strong>support@driftr.app</strong>',
          dangerouslyUseHTMLString: true
        })
      })
    }
  }
}
</script>
