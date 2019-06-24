import Vue from 'vue'
import Router from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import ForgotPassword from '@/views/ForgotPassword'
import ResetPassword from '@/views/ResetPassword'

import MainView from '@/views/MainView.vue'

import EventView from '@/views/pages/EventView.vue'
import FriendView from '@/views/pages/FriendView.vue'
import MessageView from '@/views/pages/MessageView.vue'
import ProfileView from '@/views/pages/ProfileView.vue'

// import FullHeader from '@/components/layouts/FullHeader.vue'

// import ExploreMainView from '@/views/explore/CommonView.vue'
// import ListView from '@/views/explore/ListView.vue'
// import SavedView from '@/views/explore/SavedView.vue'
// import ShuffleView from '@/views/explore/ShuffleView.vue'
// import ExploreFooter from '@/components/layouts/footers/ExploreFooter.vue'

// import FriendMainView from '@/views/friends/MainView.vue'
// import FriendListView from '@/views/friends/FriendView.vue'
// import GroupListView from '@/views/friends/GroupView.vue'
// import FriendFooter from '@/components/layouts/footers/FriendFooter.vue'

// import ProfileMainView from '@/views/profile/MainView.vue'
// import ProfileAccountView from '@/views/profile/AccountView.vue'
// import ProfileBaseView from '@/views/profile/BaseView.vue'
// import ProfileHistoryView from '@/views/profile/HistoryView.vue'
// import ProfileFooter from '@/components/layouts/footers/ProfileFooter.vue'

Vue.use(Router)

export default new Router({
  mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        auth: false
      }
    }, {
      path: '/password/forgot',
      name: 'forgot-password',
      component: ForgotPassword,
      meta: {
        auth: false
      }
    }, {
      path: '/password/reset/:token',
      name: 'reset-password',
      component: ResetPassword,
      meta: {
        auth: false
      }
    }, {
      path: '/app',
      component: MainView,
      children: [
        {
          path: 'events',
          name: 'events',
          component: EventView,
          meta: {
            auth: true
          }
        }, {
          path: 'friends',
          name: 'friends',
          component: FriendView,
          meta: {
            auth: true
          }
        }, {
          path: 'messages',
          name: 'messages',
          component: MessageView,
          meta: {
            auth: true
          }
        }, {
          path: 'profile',
          name: 'profile',
          component: ProfileView,
          meta: {
            auth: true
          }
        }, {
          path: '',
          redirect: { name: 'events' }
        }
      ]
    }
  ]
})
