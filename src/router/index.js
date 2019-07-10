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

Vue.use(Router)

export default new Router({
  mode: 'hash',
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
          path: 'events/:id',
          name: 'event',
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
    }, {
      path: '/',
      redirect: { name: 'login' }
    }
  ]
})
