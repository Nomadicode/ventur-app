<template>
  <div>
    <h5 class="space-bottom--half">Accessibility</h5>
    <v-layout align-center class="pad-ends--quarter">
      <v-flex xs10>
        <label class="field-label">Show only handicap friendly events?</label>
      </v-flex>
      <v-spacer />
      <v-flex class="horizontal-right" xs2>
        <el-switch
          :width="35"
          class="font--small"
          @change="save('handicapOnly')"
          v-model="settings.handicapOnly"></el-switch>
      </v-flex>
    </v-layout>

    <v-divider />

    <v-layout align-center class="pad-ends--quarter">
      <v-flex xs9>
        <label class="field-label">Show events with ALCOHOL?</label>
      </v-flex>
      <v-spacer />
      <v-flex class="horizontal-right" xs4>
        <el-switch
          :width="35"
          class="font--small"
          @change="save('showAlcohol')"
          v-model="settings.showAlcohol"></el-switch>
      </v-flex>
    </v-layout>

    <v-divider />

    <v-layout align-center class="pad-ends--quarter">
      <v-flex xs9>
        <label class="field-label">Show 18+ (NSFW) events?</label>
      </v-flex>
      <v-spacer />
      <v-flex class="horizontal-right" xs4>
        <el-switch
          :width="35"
          class="font--small"
          @change="save('showNsfw')"
          v-model="settings.showNsfw"></el-switch>
      </v-flex>
    </v-layout>

    <h5 class="space-top--double space-bottom--half">Notifications</h5>

    <v-layout align-center class="pad-ends--quarter">
      <v-flex xs10>
        <label class="field-label">Friend creates a new event</label>
      </v-flex>
      <v-spacer />
      <v-flex class="horizontal-right" xs2>
        <el-switch
          :width="35"
          class="font--small"
          @change="save('newFriendEventNotification')"
          v-model="settings.newFriendEventNotification"></el-switch>
      </v-flex>
    </v-layout>

    <v-divider />

    <v-layout align-center class="pad-ends--quarter">
      <v-flex xs10>
        <label class="field-label">Upcoming saved events</label>
      </v-flex>
      <v-spacer />
      <v-flex class="horizontal-right" xs2>
        <el-switch
          :width="35"
          class="font--small"
          @change="save('upcomingSavedEventNotification')"
          v-model="settings.upcomingSavedEventNotification"></el-switch>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import getUserSettings from '@/graphql/profile/queries/getUserSettings.gql'
import updateUserSettings from '@/graphql/profile/mutations/updateUserSettings.gql'
import { mapGetters } from 'vuex'

export default {
  name: 'Accessibility',
  apollo: {
    user: {
      query: getUserSettings,
      variables: {
        'pk': this.userId
      },
      result ({ data, loading, networkStatus }) {
        this.settings = (data) ? data.user.settings : {}
      }
    }
  },
  computed: {
    ...mapGetters('UserModule', ['userId'])
  },
  data () {
    return {
      settings: {
        showAlcohol: false,
        showNsfw: false,
        handicapOnly: false,
        newFriendEventNotification: false,
        upcomingSavedEventNotification: false
      }
    }
  },
  methods: {
    save (field) {
      var self = this

      this.$apollo.mutate({
        mutation: updateUserSettings,
        variables: self.settings
      }).then(function (result) {
        if (result.updateUserSettings && result.updateUserSettings.userSettings) {
          self.settings = result.updateUserSettings.userSettings
        }
      })
    }
  }
}
</script>
