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
                  :min="today"
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
                  :min="this.filters.endDate"
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

          <v-container class="pad-top--half pad-bottom--quarter pad-sides--none" fluid grid-list-sm>
            <v-layout row wrap>
              <v-flex xs7>
                <el-switch
                  v-model="filters.kidFriendly"
                  active-text="Kid Friendly">
                </el-switch>
              </v-flex>
              <v-spacer />
              <v-flex xs5>
                <el-switch
                  v-model="filters.over18"
                  active-text="Over 18">
                </el-switch>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs7>
                <el-switch
                  :width="50"
                  v-model="filters.handicapFriendly"
                  active-text="Handicap Friendly">
                </el-switch>
              </v-flex>
              <v-spacer />
              <v-flex xs5>
                <el-switch
                  v-model="filters.over21"
                  active-text="Over 21">
                </el-switch>
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
