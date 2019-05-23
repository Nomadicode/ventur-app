<template>
  <div class="profile-container">
    <h5>Preferences</h5>
    <div class="space-bottom--double">
      <label class="field-label accent-color space-ends--quarter">Maximum distance to travel (miles)</label>
      <el-input
        class="space-bottom--half"
        placeholder="10"
        v-model="input2">
        <template slot="append">miles</template>
      </el-input>
      <label class="field-label accent-color space-ends--quarter">Maximum activity price (USD)</label>
      <el-input
        class="space-bottom--half"
        placeholder="100"
        v-model="input2">
        <template slot="prepend">$</template>
        <template slot="append">USD</template>
      </el-input>

      <label class="field-label accent-color space-ends--quarter">Accessibility Settings</label>
      <v-container class="pad-sides--none" fluid grid-list-sm>
        <v-layout row wrap>
          <v-flex xs7>
            <el-switch
              v-model="kidFriendly"
              active-text="Kid Friendly">
            </el-switch>
          </v-flex>
          <v-spacer />
          <v-flex xs5>
            <el-switch
              v-model="over18"
              active-text="Over 18">
            </el-switch>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs7>
            <el-switch
              v-model="handicapFriendly"
              active-text="Handicap Friendly">
            </el-switch>
          </v-flex>
          <v-spacer />
          <v-flex xs5>
            <el-switch
              v-model="over21"
              active-text="Over 21">
            </el-switch>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <h5>Security</h5>
    <div>
      <label class="field-label accent-color space-ends--quarter">Current Password</label>
      <el-input
        v-model="currentPassword"
        type="password"
        placeholder="current password"></el-input>

      <label class="field-label accent-color space-top space-ends--quarter">New Password</label>
      <el-input
        v-model="newPassword"
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
export default {
  name: 'AccountView',
  data () {
    return {
      currentPassword: '',
      newPassword: ''
    }
  },
  computed: {
    ...mapGetters('UserModule', ['token']),
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

        console.log(this.headers)
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
      this.$prompt('Enter your password to proceed. This cannot be undone.', 'Confirm Account Deletion', {
        confirmButtonText: 'DELETE ACCOUNT',
        confirmButtonClass: 'el-button--danger',
        cancelButtonText: 'Cancel'
      }).then(function () {
        this.$message({
          type: 'error',
          message: 'Unable to delete account, please contact support: <strong>support@driftr.app</strong>',
          dangerouslyUseHTMLString: true
        })
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>
