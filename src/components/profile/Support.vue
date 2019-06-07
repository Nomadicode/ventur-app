<template>
  <div>
    <h5>Support</h5>

    <div class="horizontal-center center--vertical">
      <h6>Email</h6>
      <p>support@driftr.app</p>

      <el-button
        class="space-top--quad"
        type="primary"
        plain
        @click="openFeedbackModal">leave feedback / report a bug</el-button>
    </div>
    <feedback-modal></feedback-modal>
  </div>
</template>

<script>
import FeedbackModal from '@/components/modals/FeedbackModal'

export default {
  name: 'Support',
  methods: {
    openFeedbackModal () {
      window.EventBus.$emit('feedback:add')
    }
  },
  components: {
    FeedbackModal
  }
}
</script>
