<template>
  <v-dialog
    fullscreen
    light
    scrollable
    v-model="modal">
    <v-card class="modal">
      <v-card-title
        class="primary-background accent-color modal-header"
        primary-title>
        Feedback
        <v-spacer />
        <v-icon
          class="close"
          @click="close()">close</v-icon>
      </v-card-title>

      <v-card-text class="pad-top fill-height bg-accent-background">
        <label class="field-label pad-bottom--quarter">Subject</label>
        <el-input
          placeholder="This app is great!"
          v-model="feedback.subject"></el-input>

        <label class="field-label pad-top pad-bottom--quarter">Category</label>
        <el-select
          class="fill-width"
          v-model="feedback.category">
          <el-option
            v-for="item in categories"
            :key="item.pk"
            :label="item.name"
            :value="item.pk"></el-option>
        </el-select>

        <label class="field-label pad-top pad-bottom--quarter">Details</label>
        <el-input
          type="textarea"
          v-model="feedback.details"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="Bug reports, comments, suggestions"></el-input>

        <el-button
          class="fill-width space-top--double"
          @click="submitFeedback">Submit Feedback</el-button>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import gql from 'graphql-tag'
import { mapGetters } from 'vuex'

export default {
  name: 'FeedbackModal',
  apollo: {
    feedbackCategories: {
      query: gql`query { 
        feedbackCategories {
          pk
          name
        }
      }`,
      result ({ data, loading, networkStatus }) {
        this.categories = data.feedbackCategories
      },
      error (err) {
        console.log(err)
      }
    }
  },
  created () {
    this.modal = this.feedbackModal
  },
  data () {
    return {
      modal: false,
      categories: [],
      feedback: {
        subject: null,
        details: null,
        category: 1
      }
    }
  },
  computed: {
    ...mapGetters('AppState', ['feedbackModal'])
  },
  methods: {
    close () {
      this.$store.commit('AppState/CLOSE_FEEDBACK_MODAL')
    },
    submitFeedback () {
      if (this.feedback.subject && this.feedback.details) {
        var self = this
        this.$apollo.mutate({
          mutation: gql`mutation ($subject: String!, $category: Int!, $details: String!){
            submitFeedback(subject: $subject, category: $category, details: $details) {
              success
              error
              feedback {
                subject
                details
              }
            }
          }`,
          variables: this.feedback
        }).then((data) => {
          // Show success
          self.$message({
            type: 'success',
            message: 'Thank you for your feedback!'
          })
          self.close()
        }).catch((error) => {
          // Show error
          console.log(error)
          self.$message({
            type: 'error',
            message: 'An error occurred submitting your feedback'
          })
        })
      } else {
        // Show error
        this.$message({
          type: 'error',
          message: 'Please fill in all fields.'
        })
      }
    }
  },
  watch: {
    feedbackModal () {
      this.modal = this.feedbackModal
    },
    modal () {
      if (this.modal === false) {
        this.$store.commit('AppState/CLOSE_FEEDBACK_MODAL')
      } else {
        this.$store.commit('AppState/OPEN_FEEDBACK_MODAL')
      }
    }
  }
}
</script>
