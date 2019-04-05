<template>
    <el-select
        class="fill-width"
        v-model="selected"
        multiple
        placeholder="High school friends"
        clearable
        filterable
        @change="onChange"
    >
        <el-option
            v-for="item in groups"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
    </el-select>
</template>

<script>
import { mapGetters } from 'vuex'
import gql from 'graphql-tag'

export default {
    name: 'FriendGroupSelect',
    props: ['value'],
    apollo: {
        friendGroups: {
            query: gql`query { 
                friendGroups {
                    id
                    name
                }
            }`,
            result({ data, loading, networkStatus }) {
                this.groups = data.friendGroups
            },
            error(err) {

            }
        }
    },
    data () {
        return {
            groups: [],
            selected: []
        }
    },
    computed: {
        ...mapGetters('UserModule', ['data'])
    },
    methods: {
        onChange () {
            this.$emit('input', this.selected)
        }
    },
    watch: {
        value () {
            this.selected = this.value
        }
    }
}
</script>