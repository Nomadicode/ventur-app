<template>
  <v-img
    :src="image"
    :maxHeight="(size) ? size : 125"
    :gradient="'rgba(0,0,0,0), rgba(0,0,0,0.6)'"
    class="image-uploader"
    :style="{
      'border-radius': round ? '50%' : '0',
      'width': size + 'px'
    }">
    <el-upload
      :on-change="parsePicture"
      action=""
      :auto-upload="false"
      :show-file-list="false"
      :on-success="handleSuccess"
      :before-upload="beforeUpload">
      <div class="upload-button">
        <v-icon
          v-if="!image"
          color="white"
          size="40">insert_photo</v-icon>
        <p v-if="!image">add photo</p>
      </div>
      <div class="change-upload-button" v-if="image">change photo</div>
    </el-upload>
  </v-img>
</template>

<script>
export default {
  name: 'ImageUploader',
  props: {
    value: {
      default: ''
    },
    round: {
      default: false,
      type: Boolean
    },
    size: {
      default: null,
      type: Number
    }
  },
  data () {
    return {
      imageUrl: '',
      image: ''
    }
  },
  methods: {
    handleSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      return isLt2M
    },
    parsePicture (file, fileList) {
      var self = this
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onloadend = function (readerEvt) {
        var binaryString = readerEvt.target.result
        self.image = binaryString
        self.$emit('input', self.image)
      }
    }
  },
  watch: {
    value () {
      this.image = this.value ? this.value : ''
    }
  }
}
</script>
