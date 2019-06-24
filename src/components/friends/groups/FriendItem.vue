<template>
  <v-list-tile
    avatar>
    <v-list-tile-avatar>
      <v-img
        :src="item.profilePicture ? item.profilePicture : profilePicture"></v-img>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title v-html="item.name"></v-list-tile-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <v-icon
        color="#FF5757"
        @click="removeFromGroup">clear</v-icon>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import removeFriendFromGroup from '@/graphql/friends/mutations/removeFriendFromGroup.gql'
import ProfilePicture from '@/assets/images/avatar.svg'

export default {
  name: 'GroupListFriendItem',
  props: ['item', 'groupId', 'groupName'],
  data () {
    return {
      profilePicture: ProfilePicture
    }
  },
  methods: {
    removeFromGroup () {
      var self = this
      this.$confirm('Are you sure you want to remove ' + this.item.name + ' from ' + this.groupName)
        .then((response) => {
          self.remove()
        })
    },
    remove () {
      var self = this
      this.$apollo.mutate({
        mutation: removeFriendFromGroup,
        variables: {
          groupId: this.groupId,
          memberId: this.item.id
        }
      }).then((response) => {
        self.$emit('refresh')
      })
    }
  }
}
</script>
