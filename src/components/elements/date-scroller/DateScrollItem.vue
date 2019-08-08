<template>
    <div class="date-scroll-item">
        <div v-if="alwaysAvailable" class="vertical-center start">
            <div class="date">Anytime</div>
        </div>
        <div v-else>
            <div class="start">
                <div class="date">{{ formatDate(this.startMoment) }}</div>
                <div class="time">{{ formatTime(this.startMoment) }} <span v-if="sameDay">- {{ formatTime(this.endMoment) }}</span></div>
            </div>
            <span v-if="!sameDay" class="qualifier">to</span>
            <div v-if="!sameDay" class="end">
                <div class="date">{{ formatDate(this.endMoment) }}</div>
                <div class="time">{{ formatTime(this.endMoment) }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment-timezone'

export default {
    name: 'DateScrollItem',
    props: {
        alwaysAvailable: {
            default: false,
            type: Boolean
        },
        startDate: {
            default: null,
            type: String
        },
        endDate: {
            default: null,
            type: String
        }
    },
    created () {
        this.startMoment = moment(this.startDate)
        this.endMoment = moment(this.endDate)
    },
    data () {
        return {
            startMoment: null,
            endMoment: null
        }
    },
    computed: {
        sameDay () {
            return this.startMoment.dayOfYear() === this.endMoment.dayOfYear()
        }
    },
    methods: {
        formatDate (datetime) {
            return datetime.format('MMM D')
        },
        formatTime (datetime) {
            return (datetime.minutes() === 0) ? datetime.format('hA') : datetime.format('h:mmA')
        }
    },
    watch: {
        startDate () {
            this.startMoment = moment(this.startDate)
        },
        endDate () {
            this.endMoment = moment(this.endDate)
        }
    }
}
</script>
