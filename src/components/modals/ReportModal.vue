<template>
  <v-dialog
    light
    scrollable
    v-model="open">
    <v-card class="report-menu">
      <v-card-title class="extra-light-background">
        Why are you reporting this activity?
      </v-card-title>

      <v-card-text>
        <ul class="menu-options">
          <li
            v-for="reason of reasons"
            :key="reason.id"
            @click="setOption(reason.id)">
            <div class="details">
              <h6>{{ reason.name }}</h6>
              <p>{{ reason.detail }}</p>
            </div>
            <div
              class="selected-icon"
              :class="{'selected': reason.id === selected}">
              <v-icon v-if="reason.id === selected">check</v-icon>
            </div>
          </li>
        </ul>
      </v-card-text>

      <v-card-actions class="extra-light-background">
        <v-layout
          row
          wrap>
          <v-flex
            xs6
            align-self-center>
            <el-button
              type="text"
              class="secondary-text"
              @click="$emit('close')">cancel</el-button>
          </v-flex>
          <v-divider />
          <v-flex xs6>
            <el-button
              class="warning-background white-text"
              @click="submitReport">Submit Report</el-button>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import getReportCategories from '@/graphql/core/queries/getReportCategories.gql'

import submitReport from '@/graphql/core/mutations/submitReport.gql'

export default {
  name: 'ReportModal',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    activityId: {
      type: String,
      default: null
    }
  },
  apollo: {
    reportCategories: {
      query: getReportCategories,
      result ({ data, loading, networkStatus }) {
        this.reasons = data ? data.reportCategories : []
        this.loading = false
      }
    }
  },
  data () {
    return {
      reasons: [],
      selected: null
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    setOption (selectionId) {
      this.selected = selectionId
    },
    submitReport () {
      var self = this
      if (this.selected && this.activityId) {
        this.$apollo.mutate({
          mutation: submitReport,
          variables: {
            activity: this.activityId,
            category: this.selected
          }
        }).then((response) => {
          var data = response.data.submitReport
          if (data.success) {
            self.$message({
              type: 'success',
              message: 'Activity Reported, thank you for keeping our community safe!'
            })
            self.$emit('refresh')
            self.close()
          } else {
            self.$message({
              type: 'error',
              message: 'Error: An error occurred reporting this activity. Contact support@driftr.app'
            })
            self.close()
          }
        }).catch((error) => {
          // Show error
          console.log(error)
          self.$message({
            type: 'error',
            message: 'Error: An error occurred reporting this activity. Contact support@driftr.app'
          })
          self.close()
        })
      }
    }
  }
}
</script>
