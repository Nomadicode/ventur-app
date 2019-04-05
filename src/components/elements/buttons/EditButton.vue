<template>
    <div class="buttons-box">
      <el-button
        v-if="!edit"
        type="text"
        class="edit-btn"
        @click="toggleEditMode()">
        <v-icon>edit</v-icon>
      </el-button>
      <el-button 
        v-if="edit"
        size="mini"
        type="info" 
        plain
        @click="toggleEditMode()">Cancel</el-button>
      <el-button 
        v-if="edit"
        type="danger"
        size="mini"
        @click="save()"
        plain>Save</el-button>
    </div>
</template>

<script>
export default {
    name: 'EditButton',
    data () {
        return {
            edit: false
        }
    },
    methods: {
        toggleEditMode () {
            this.edit = !this.edit
            this.$emit('toggle', this.edit)
        },
        save () {
            this.$emit('save')
        }
    }
}
</script>
