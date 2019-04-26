<template>
 <div class="list">
    <div v-if="(!friends || friends.length === 0) && !loading" class="empty">
      <p>No friends found</p>
      <el-button
        class="extra-light-text add-btn"
        type="text"
        @click="$store.commit('AppState/OPEN_ADD_FRIEND_MODAL')">
        add a friend
      </el-button>
    </div>
    <loading-icon v-if="loading"></loading-icon>
  </div>
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
