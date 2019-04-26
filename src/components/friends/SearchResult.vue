<template>
  <v-layout class="result" row wrap>
    <v-flex
      class="base-light-background pad-quarter"
      xs3
      align-self-center>
      <v-img
        :src="avatarImage"
        aspect-ratio="1"
        height="70"
        contain
        />
    </v-flex>
    <v-flex xs8>
      <div class="pad-sides--half pad-top--quarter">Fred Jones</div>
    </v-flex>
  </v-layout>
</template>

<script>
import AvatarImage from '@/assets/images/avatar.svg'

export default {
  name: 'SearchResult',
  data () {
    return {
      avatarImage: AvatarImage
    }
  }
}
</script>
