<template>
    <ul class="friend-list">
        <friend-item v-for="friend of friends" :key="friend.id" :item="friend"></friend-item>

        <li v-if="(!friends || friends.length === 0) && !loading" class="lighter-text empty-list">No friends found
            <el-button
                class="white-text add-btn"
                type="text"
                @click="$store.commit('AppState/OPEN_ADD_FRIEND_MODAL')">
                add a friend
            </el-button>
        </li>
    </ul>
</template>

<script>
import FriendItem from './FriendItem'

export default {
  name: 'FriendList',
  data () {
    return {
      loading: false,
      friends: []
    }
  },
  components: {
    FriendItem
  }
}
</script>

<style lang="scss" scoped>
.friend-list {
    list-style-type: none;
    padding: 0;
    margin: 0;

    .empty-list {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -70%);
        text-align: center;
        font-size: 1.8rem;
        font-weight: 300;
    }
}
</style>
