<template>
  <div class="job-filter white">
    <v-layout class="job-filter-wrap text-xs-center border-top border-bottom"
              id="filter">
      <v-flex xs3
              class="job-filter-item white">
        <v-btn flat
               block
               class="job-filter-item-title ma-0 border-right__list"
               @click="onClickTab(1)">{{currentCity.areaname}}</v-btn>
        <transition>
          <job-regions class="job-filter-item-regions"
                       v-show="active === 1"
                       :class="{close: active !== 1}"
                       @regionTypeChange="onRegionTypeChange"
                       @touchmove="preventWindowScroll"></job-regions>
        </transition>
      </v-flex>
      <v-flex xs3
              class="job-filter-item white">
        <v-btn flat
               block
               class="job-filter-item-title ma-0 border-right__list"
               @click="onClickTab(2)">职位类型</v-btn>
        <transition>
          <job-positions class="job-filter-item-positions"
                         :class="{close: active !== 2}"
                         @filterChanged="onFilterChanged($event, 'position')"
                         @touchmove="preventWindowScroll"></job-positions>
        </transition>
      </v-flex>
      <v-flex xs3
              class="job-filter-item white">
        <v-btn flat
               block
               class="job-filter-item-title ma-0 border-right__list"
               @click="onClickTab(3)">智能排序</v-btn>
        <transition>
          <job-orderby class="job-filter-item-orderby"
                       :class="{close: active !== 3}"
                       @filterChanged="onFilterChanged($event, 'orderBy')"
                       @touchmove="preventWindowScroll"></job-orderby>
        </transition>
      </v-flex>
      <v-flex xs3
              class="job-filter-item white">
        <v-btn flat
               block
               class="job-filter-item-title ma-0"
               @click="onClickTab(4)">筛选</v-btn>
        <transition>
          <job-conditions class="job-filter-item-conditions"
                          :class="{close: active !== 4}"
                          @filterChanged="onFilterChanged($event, 'condition')"
                          @touchmove="preventWindowScroll"></job-conditions>
        </transition>
      </v-flex>
    </v-layout>
    <!-- <base-location location-only></base-location> -->
  </div>
</template>

<script>
import JobRegions from '@/components/JobRegions'
import JobPositions from '@/components/JobPositions'
import JobOrderby from '@/components/JobOrderby'
import JobConditions from '@/components/JobConditions'
import { mapGetters } from 'vuex'
import { preventWindowScroll } from '@mixins'
export default {
  components: {
    JobRegions,
    JobPositions,
    JobOrderby,
    JobConditions
  },
  data: () => ({
    active: 0,
    filter: {},
    region: {},
    position: {},
    orderBy: {},
    condition: {}
  }),
  mixins: [preventWindowScroll],
  computed: {
    ...mapGetters({
      currentCity: 'common/currentCity'
    })
  },
  methods: {
    scrollToFilter() {
      this.$vuetify.goTo('#filter', {
        duration: 500,
        // offset: -48,
        easing: 'easeInOutCubic'
      })
    },
    onClickTab(tab) {
      this.active = tab
      this.scrollToFilter()
    },
    onFilterChanged(filter, type) {
      this[type] = filter
      this.closeFilter()
      this.setFilter()
    },
    onRegionTypeChange({ region, type }) {
      if (type === 'metro') {
        delete this.region.countyId
        delete this.region.district
        if (region === 'all') {
          delete this.region.metroId
        } else {
          this.region.metroId = region.id
        }
      } else if (type === 'area') {
        if (region === 'all') {
          delete this.region.countyId
        } else {
          delete this.region.district
          this.region.countyId = region.id
        }
      } else if (type === 'businessDistricts') {
        delete this.region.countyId
        this.region.district = region.id
      }
      this.closeFilter()
      this.setFilter()
      // console.log(JSON.stringify(this.region, null, 2))
    },
    closeFilter() {
      setTimeout(() => {
        this.active = 0
      }, 100)
    },
    setFilter() {
      this.filter = Object.assign({}, this.region, this.position, this.orderBy, this.condition)
      this.$emit('filterChanged', this.filter)
      console.log(JSON.stringify(this.filter, null, 2))
    }
  }
}
</script>

<style lang="scss">
.job-filter {
  position: sticky;
  top: $top-nav-height;
  z-index: 1;
  .job-filter-wrap {
    position: relative;
    z-index: 2;
    .job-filter-item {
      .job-filter-item-title.border-right__list::after {
        transform: scaleY(0.5);
      }
      .job-filter-item-regions,
      .job-filter-item-positions,
      .job-filter-item-orderby,
      .job-filter-item-conditions {
        position: absolute;
        left: 0;
        top: 100%;
        width: 100vw;
        text-align: left;
        background-color: $white;
        // max-height: calc(100vh - #{$top-nav-height} - #{$bottom-nav-height} - 36px);
        // transition: max-height 300ms;
        // will-change: max-height;
        // &.close {
        //   max-height: 0;
        //   padding-top: 0 !important;
        //   padding-bottom: 0 !important;
        //   overflow-y: hidden;
        // }
        &::before {
          content: '';
          display: block;
          position: absolute;
          width: 100vw;
          left: 0;
          top: 0;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: -1;
        }
      }
    }
  }
}
</style>
