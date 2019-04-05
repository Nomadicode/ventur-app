<template>
    <el-select
        v-model="activity.duration"
        default-first-option
        placeholder="15 minutes">
            <el-option
                v-for="item in durationOptions"
                :key="item.value"
                :label="item.text"
                :value="item.value">
            </el-option>
    </el-select>
</template>

<script>
export default {
    name: 'FriendGroupSelector'
}
</script>
