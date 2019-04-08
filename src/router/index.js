import Vue from 'vue'
import Router from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import ForgotPassword from '@/views/ForgotPassword'
import ResetPassword from '@/views/ResetPassword'

import FullHeader from '@/components/layouts/FullHeader.vue'

import ExploreMainView from '@/views/explore/CommonView.vue'
import ListView from '@/views/explore/ListView.vue'
import SavedView from '@/views/explore/SavedView.vue'
import ShuffleView from '@/views/explore/ShuffleView.vue'
import ExploreFooter from '@/components/layouts/footers/ExploreFooter.vue'

import FriendMainView from '@/views/friends/MainView.vue'
import FriendListView from '@/views/friends/FriendView.vue'
import GroupListView from '@/views/friends/GroupView.vue'
import FriendFooter from '@/components/layouts/footers/FriendFooter.vue'

import ProfileMainView from '@/views/profile/MainView.vue'
import ProfileAccountView from '@/views/profile/AccountView.vue'
import ProfileBaseView from '@/views/profile/BaseView.vue'
import ProfileHistoryView from '@/views/profile/HistoryView.vue'
import ProfileFooter from '@/components/layouts/footers/ProfileFooter.vue'

Vue.use(Router)

export default new Router({
  mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: {
        noauth: false
      }
    }, {
      path: '/password/forgot',
      name: 'forgot-password',
      component: ForgotPassword,
      meta: {
        noauth: false
      }
    }, {
      path: '/password/reset',
      name: 'reset-password',
      component: ResetPassword,
      meta: {
        noauth: false
      }
    }, {
      path: '/explore',
      components: {header: FullHeader, default: ExploreMainView, footer: ExploreFooter},
      meta: {
        auth: true
      },
      children: [
        {
          path: 'random',
          name: 'explore-random',
          component: ShuffleView
        }, {
          path: 'list',
          name: 'explore-list',
          component: ListView
        }, {
          path: 'saved',
          name: 'explore-saved',
          component: SavedView
        }, {
          path: '',
          redirect: { name: 'explore-random' }
        }
      ]
    }, {
      path: '/friends',
      components: {header: FullHeader, default: FriendMainView, footer: FriendFooter},
      children: [
        {
          path: 'list',
          name: 'friend-list',
          component: FriendListView
        }, {
          path: 'groups',
          name: 'friend-group-list',
          component: GroupListView
        }, {
          path: '',
          redirect: { name: 'friend-list' }
        }
      ]
    }, {
      path: '/profile',
      components: {header: FullHeader, default: ProfileMainView, footer: ProfileFooter},
      children: [
        {
          path: 'base',
          name: 'profile-base',
          component: ProfileBaseView
        }, {
          path: 'account',
          name: 'profile-account',
          component: ProfileAccountView
        }, {
          path: 'history',
          name: 'profile-history',
          component: ProfileHistoryView
        }, {
          path: '',
          redirect: { name: 'profile-base' }
        }
      ]
    }
  ]
})
