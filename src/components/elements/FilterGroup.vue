<template>
    <div class="filter-container">
        <div v-if="expanded" class="filter-box">
            <div>
              <div class="inline">
                <label>Price</label>
                <el-input
                    v-model="filters.price"
                    placeholder="$0.00"></el-input>
              </div>
              <div class="inline space-left">
                <duration-select v-model="filters.duration"></duration-select>
              </div>
            </div>
            <div class="space-top--quarter flex-inline">
                <div class="inline width-50">
                    <el-switch
                        class="switch-btn"
                        v-model="filters.kidFriendly"
                        active-text="Kid Friendly"
                        @change="onChange()">
                    </el-switch>
                    <div class="pad-bottom--quarter"></div>
                    <el-switch
                        class="switch-btn"
                        v-model="filters.handicapFriendly"
                        active-text="Handicap friendly"
                        @change="onChange()">
                    </el-switch>
                </div>
                <div class="inline">
                    <el-switch
                        class="switch-btn"
                        v-model="filters.over18"
                        active-text="Over 18"
                        @change="onChange()">
                    </el-switch>
                    <div class="pad-bottom--quarter"></div>
                    <el-switch
                        class="switch-btn"
                        v-model="filters.over21"
                        active-text="Over 21"
                        @change="onChange()">
                    </el-switch>
                </div>
            </div>
        </div>
        <v-btn
            v-if="toggleable"
            color="white"
            link
            flat
            small
            class="filter-toggle"
            :class="toggleCls"
            light
            @click="toggleFilterDisplay()">
            <v-icon v-if="!expanded">add</v-icon>
            <v-icon v-if="expanded">remove</v-icon> {{ toggleLabel }}
        </v-btn>
    </div>
</template>

<script>
import DurationSelect from '@/components/elements/inputs/DurationSelect'

export default {
  name: 'FilterGroup',
  props: {
    toggleCls: {
      default: '',
      type: String
    },
    toggleable: {
      default: true,
      type: Boolean
    },
    toggleLabel: {
      default: 'filters',
      type: String
    }
  },
  created () {
    this.expanded = !this.toggleable
  },
  data () {
    return {
      expanded: false,
      filters: {
        over18: false,
        over21: false,
        kidFriendly: false,
        handicapFriendly: false,
        price: 0.00,
        duration: null
      }
    }
  },
  methods: {
    toggleFilterDisplay () {
      this.expanded = !this.expanded
    },
    onChange () {
      this.$emit('filterChange', this.filters)
    }
  },
  components: {
    DurationSelect
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
    position: relative;
    text-align: left;

    .filter-box {
        width: 100%;
        background: rgba(255,255,255,0.90);
        color: #4e4e4e;
        padding: 12px 10px;
        font-size: 12px !important;
    }

    .filter-toggle {
        font-size: 12px;
        margin: 0 -10px 0 0;
        padding: 0;
        height: 20px;

        .v-icon {
            font-size: 18px;
        }
    }
}
</style>
