<template>
  <li class="friend-item">
    <img :src="DefaultAvatar" />
    <h4>{{ item.name }}</h4>

    <v-btn
      class="friend-menu-toggle"
      icon
      absolute
      right
      dark
      @click="toggleMenu()">
      <v-icon>more_vert</v-icon>
    </v-btn>

    <ul v-if="showMenu" class="friend-menu">
      <li>Send Message</li>
      <li>Remove Friend</li>
    </ul>
  </li>
</template>

<script>
import DefaultAvatar from '@/assets/images/avatar.svg'

export default {
  name: 'FriendItem',
  props: ['item'],
  data () {
    return {
      DefaultAvatar: DefaultAvatar,
      showMenu: false
    }
  },
  methods: {
    toggleMenu () {
      this.showMenu = !this.showMenu
    }
  }
}
</script>

<style lang="scss" scoped>
  .friend-item {
    display: inline-block;
    vertical-align: top;
    margin: 10px;
    width: calc(33.333% - 20px);
    text-align: center;
    position: relative;

    h4 {
      font-size: 12px;
    }

    .friend-menu-toggle {
      position: absolute;
      top: -8px;
      right: -20px;
    }

    .friend-menu {
      display: block;
      position: absolute;
      top: 30px;
      width: 100px;
      background: #f8f8f8;
      box-shadow: 0 0 5px #000;
      list-style-type: none;
      padding-left: 0;
      margin-left: 0;
      border-radius: 5px;
      z-index: 100;

      li {
        padding: 10px 5px;
        font-size: 13px;
        color: rgba(0,0,0,0.5);

        &:not(:last-child) {
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }

        &:last-child {
          color: #FF5252;
        }
      }
    }
  }
</style>
