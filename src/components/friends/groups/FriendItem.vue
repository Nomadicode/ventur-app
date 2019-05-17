<template>
  <v-list-tile
    avatar>
    <v-list-tile-avatar>
      <img :src="item.profilePicture ? item.profilePicture : profilePicture">
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
import gql from 'graphql-tag'
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
        }).catch(() => {})
    },
    remove () {
      var self = this
      this.$apollo.mutate({
        mutation: gql`mutation RemoveFriendFromGroup($groupId: Int!, $memberId:Int!){
          removeFriendFromGroup(groupId: $groupId, memberId: $memberId) {
            success
            error
            group {
              pk
              id
              name
            }
          }
        }`,
        variables: {
          groupId: this.groupId,
          memberId: this.item.id
        }
      }).then((response) => {
        self.$emit('refresh')
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
