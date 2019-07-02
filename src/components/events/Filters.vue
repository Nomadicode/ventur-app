<template>
  <v-dialog
      v-model="dialog"
      width="500"
      persistent
    >
      <template v-slot:activator="{ on }">
        <el-button
          class="fill-width space-none filter-btn"
          type="primary"
          plain
          size="mini"
          v-on="on"
        >
          <v-icon color="primary" size="14">add</v-icon>
          filters
        </el-button>
      </template>

      <v-card>
        <v-card-text>
          <v-layout
            class="space-bottom--half"
            align-center
            justify-center
            row
            wrap>
            <v-flex xs4>
              <el-button
                size="mini"
                round
                @click="setDates('today')">Today</el-button>
            </v-flex>

            <v-flex xs4>
              <el-button
                size="mini"
                round
                @click="setDates('week')">7 Days</el-button>
            </v-flex>

            <v-flex xs4>
              <el-button
                size="mini"
                round
                @click="setDates('month')">30 Days</el-button>
            </v-flex>
          </v-layout>

          <v-layout
            class="space-bottom--half"
            row
            wrap>
            <v-flex class="pad-right--2" xs6>
              <label class="pad-bottom--quarter field-label">Start date</label>
              <v-dialog
                ref="startDatePicker"
                v-model="showStartDatePicker"
                :return-value.sync="filters.startDate"
                full-width
                lazy
                reactive
                persistent
              >
                <template v-slot:activator="{ on }">
                  <el-input
                    prefix-icon="el-icon-date"
                    :value="displayStartDate"
                    placeholder="Start date"
                    v-on="on"
                    size="small"
                    @focus="showStartDatePicker = true" />
                </template>
                <v-date-picker
                  v-model="filters.startDate"
                  scrollable
                  width="272"
                  @change="$refs.startDatePicker.save(filters.startDate)">
                </v-date-picker>
              </v-dialog>
            </v-flex>
            <v-spacer />
            <v-flex class="pad-left--2" xs6>
              <label class="pad-bottom--quarter field-label">End date</label>
              <v-dialog
                ref="endDatePicker"
                v-model="showEndDatePicker"
                :return-value.sync="filters.endDate"
                full-width
                lazy
                reactive
                persistent
              >
                <template v-slot:activator="{ on }">
                  <el-input
                    prefix-icon="el-icon-date"
                    :value="displayEndDate"
                    placeholder="End date"
                    v-on="on"
                    size="small"
                    @focus="showEndDatePicker = true" />
                </template>
                <v-date-picker
                  v-model="filters.endDate"
                  scrollable
                  width="272"
                  :min="this.filters.startDate"
                  @change="$refs.endDatePicker.save(filters.endDate)">
                </v-date-picker>
              </v-dialog>
            </v-flex>
          </v-layout>

          <v-container class="pad-none pad-top--half space-bottom--half" fluid grid-list-sm>
            <v-layout row wrap>
              <v-flex xs6>
                <price-input v-model="filters.price" label="Max price"></price-input>
              </v-flex>
              <v-spacer />
              <v-flex xs6>
                <duration-select v-model="filters.duration" label="Max duration"></duration-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            small
            color="muted"
            @click="close">Cancel</v-btn>
          <v-btn
            flat
            small
            color="primary"
            @click="save">Apply Filters</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment-timezone'

import DurationSelect from '@/components/elements/inputs/DurationSelect'
import PriceInput from '@/components/elements/inputs/PriceInput'

export default {
  name: 'EventFilters',
  props: ['value'],
  mounted () {
    this.filters = Object.assign({}, this.value)
  },
  data () {
    return {
      dialog: false,
      moneySettings: {
        decimal: '.',
        thousands: ',',
        prefix: '$',
        precision: 2,
        masked: false
      },
      showStartDatePicker: false,
      showEndDatePicker: false,
      filters: {}
    }
  },
  computed: {
    ...mapGetters('AppState', ['timezone']),
    displayStartDate () {
      return (this.filters && this.filters.startDate) ? moment(this.filters.startDate).format('MM/DD/YYYY') : ''
    },
    displayEndDate () {
      return (this.filters && this.filters.endDate) ? moment(this.filters.endDate).format('MM/DD/YYYY') : ''
    },
    today () {
      return moment().format('YYYY-MM-DD')
    }
  },
  methods: {
    close () {
      this.dialog = false
      this.$emit('close')
    },
    setDates (increment) {
      if (increment === 'today') {
        this.filters.startDate = moment().tz(this.timezone).format('YYYY-MM-DD')
        this.filters.endDate = moment().tz(this.timezone).endOf('day').format('YYYY-MM-DD')
      }

      if (increment === 'week') {
        this.filters.startDate = moment().tz(this.timezone).format('YYYY-MM-DD')
        this.filters.endDate = moment().tz(this.timezone).add(7, 'days').format('YYYY-MM-DD')
      }

      if (increment === 'month') {
        this.filters.startDate = moment().tz(this.timezone).format('YYYY-MM-DD')
        this.filters.endDate = moment().tz(this.timezone).add(30, 'days').format('YYYY-MM-DD')
      }
    },
    save () {
      this.$emit('input', this.filters)
      this.dialog = false
    }
  },
  components: {
    DurationSelect,
    PriceInput
  }
}
</script>
