<template>
  <div>
    <h5>About Driftr</h5>

    <el-button
      class="fill-width space-top--double"
      @click="openTermsModal">Terms of Service</el-button>

    <el-button
      class="fill-width space-top--quad space-left--none"
      @click="openPrivacyModal">Privacy Policy</el-button>

    <terms-modal></terms-modal>
    <privacy-modal></privacy-modal>
  </div>
</template>

<script>
import TermsModal from '@/components/modals/TermsModal'
import PrivacyModal from '@/components/modals/PrivacyModal'

export default {
  name: 'About',
  methods: {
    openTermsModal () {
      window.EventBus.$emit('terms:open')
    },
    openPrivacyModal () {
      window.EventBus.$emit('privacy:open')
    }
  },
  components: {
    PrivacyModal,
    TermsModal
  }
}
</script>
