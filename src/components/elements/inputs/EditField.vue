<template>
    <div 
        class="field"
        :class="containerCls">
        <label 
            v-if="showLabel"
            class="field-label">{{ label }}
            <div class="edit-buttons">
                <el-button
                    v-if="!edit"
                    type="text"
                    @click="toggleEdit()">
                    <v-icon :size="16">edit</v-icon>
                </el-button>
                <el-button 
                    v-if="edit"
                    class="secondary-text"
                    size="mini"
                    type="text" 
                    plain
                    @click="toggleEdit()">cancel</el-button>
                <el-button 
                    v-if="edit"
                    type="text"
                    @click="save()"
                    plain>SAVE</el-button>
            </div>    
        </label>
        <p 
            v-if="!edit" 
            class="field-data"
            :class="fieldCls">{{ newValue }}</p>
        <el-input
            v-if="edit && type === 'input'"
            class="field-input"
            v-model="newValue"
            @change="save"></el-input>

        <el-date-picker
            v-if="edit && type == 'date'"
            class="field-input"
            v-model="newValue"></el-date-picker>

        <div 
            v-if="!showLabel"
            class="edit-buttons"
            :class="editCls">
            <el-button
                v-if="!edit"
                type="text"
                @click="toggleEdit()">
                <v-icon :size="16">edit</v-icon>
            </el-button>
            <el-button 
                v-if="edit"
                class="secondary-text"
                size="mini"
                type="text" 
                plain
                @click="toggleEdit()">cancel</el-button>
            <el-button 
                v-if="edit"
                type="text"
                @click="save()"
                plain>SAVE</el-button>
        </div>    
    </div>
</template>

<script>
export default {
    name: 'EditField',
    props: {
        type: {
            default: 'input',
            type: String
        },
        value: {
            default: ''
        },
        showLabel: {
            default: true,
            type: Boolean
        },
        label: {
            default: 'Field Name',
            type: String
        },
        containerCls: {
            default: '',
            type: String
        },
        editCls: {
            default: '',
            type: String
        },
        fieldCls: {
            default: '',
            type: String
        }
    },
    data () {
        return {
            newValue: '',
            edit: false
        }
    },
    methods: {
        toggleEdit () {
            this.edit = !this.edit
        },
        save () {
            this.$emit('input', this.newValue)
            this.toggleEdit()
        }
    },
    watch: {
        value () {
            this.newValue = this.value
        }
    }
}
</script>

<style lang="scss" scoped>
    .field {
        .field-label {
            padding: 5px 0;
            border-bottom: 1px solid rgba(255,255,255,0.6);
            margin-bottom: 10px;
            color: #FFFFFF;
            font-size: 1.2rem;
            font-weight: 300;
            position: relative;

            .edit-buttons {
                position: absolute;
                right: 0;
                top: 0;
                font-size: 12px !important;
            }
        }
        .field-data {
            font-weight: bolder;
            font-size: 1rem;
        }
        .field-header {
            font-size: 1.8rem;
            margin-bottom: 0;
        }
    }
</style>
