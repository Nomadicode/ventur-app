<template>
  <v-dialog
    light
    v-model="open">
    <v-card class="report-menu">
      <v-card-title class="modal-header extra-light-background">
        Why are you reporting this activity?
      </v-card-title>

      <v-card-text class="modal-body">
        <ul class="menu-options">
          <li
            v-for="reason of reasons"
            :key="reason.id"
            @click="setOption(reason.id)">
            <div class="details">
              <h4>{{ reason.name }}</h4>
              <p>{{ reason.detail }}</p>
            </div>
            <div
              class="selected-icon"
              :class="{'selected': reason.id === selected}">
            </div>
          </li>
        </ul>
      </v-card-text>

      <v-card-actions class="modal-bottom extra-light-background">
        <el-button
          type="text"
          class="secondary-text"
          @click="$emit('close')">cancel</el-button>
        <el-button
          class="warning-background white-text"
          @click="submitReport">Submit Report</el-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'ReportModal',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    activityId: {
      type: Number,
      default: null
    }
  },
  apollo: {
    reportCategories: {
      query: gql`query { 
        reportCategories {
          id
          name
          detail
        }
      }`,
      result ({ data, loading, networkStatus }) {
        this.reasons = data.reportCategories
        this.loading = false
      },
      error (err) { console.log(err) }
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
          mutation: gql`mutation SubmitReport($activity: Int!, $category: Int!, $detail: String){
              submitReport(activity: $activity, category: $category, detail: $detail) {
                  success
                  error
                  report {
                      activity {
                          name
                      }
                      reporter {
                          name
                      }
                  }
              }
          }`,
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

<style lang="scss" scoped>
.report-menu {
    position: relative;
    height: 90vh;

    .modal-header {
        position: fixed;
        font-size: 1.1rem;
        z-index: 5;
        width: calc(100% - 48px);
        box-shadow: 0 0 1px #000;
    }

    .modal-body {
        height: calc(100% - 53px);
        padding-top: 54px;
        overflow: auto;
    }

    .modal-bottom {
        position: absolute;
        bottom: 0;
        z-index: 5;
        box-shadow: 0 0 1px #000;
        width: 100%;
    }
    .menu-options{
        list-style-type: none;
        padding-left: 0;
        margin-left: 0;
        height: calc(100vh - 125px);

        li {
            padding: 10px;
            position: relative;

            .details {
                padding-left: 30px;

                p {
                    font-size: 10px;
                    color: rgba(0,0,0,0.3);
                    margin-bottom: 0;
                }
            }
            &:not(:last-child) {
                border-bottom: 1px solid rgba(0,0,0,0.2);
            }

            .selected-icon {
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                border: 1px solid rgba(0,0,0,0.3);
                border-radius: 30px;
                width: 20px;
                height: 20px;
            }

            .selected {
                background: #009888;
            }
        }
    }
}
</style>
