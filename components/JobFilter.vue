<template>
  <div class="job-filter white"
       :class="{active: active > 0}"
       ref="filter"
       id="filter">
    <div>
      <v-layout class="job-filter-tabs text-xs-center border-top border-bottom"
                @touchmove="preventWindowScroll">
        <v-flex xs3>
          <v-btn flat
                 block
                 class="job-filter-item-title ma-0"
                 @click="onClickTab(1)">{{currentCity.areaname}}</v-btn>

        </v-flex>
        <v-flex xs3>
          <v-btn flat
                 block
                 class="job-filter-item-title ma-0"
                 @click="onClickTab(2)">职位类型</v-btn>

        </v-flex>
        <v-flex xs3>
          <v-btn flat
                 block
                 class="job-filter-item-title ma-0"
                 @click="onClickTab(3)">智能排序</v-btn>

        </v-flex>
        <v-flex xs3>
          <v-btn flat
                 block
                 class="job-filter-item-title ma-0"
                 @click="onClickTab(4)">筛选</v-btn>

        </v-flex>
      </v-layout>
      <div class="job-filter-items">
        <!-- <transition-group name="fade"
                          tag="div"> -->
        <job-regions class="job-filter-item-regions border-bottom"
                     v-show="active === 1"
                     :key="0"
                     ref="regions"
                     @regionTypeChange="onRegionTypeChange"
                     @touchmove="stopPropagation"></job-regions>
        <job-positions class="job-filter-item-positions border-bottom"
                       v-show="active === 2"
                       :key="1"
                       ref="positions"
                       @filterChanged="onFilterChanged($event, 'position')"
                       @touchmove="stopPropagation"></job-positions>
        <job-orderby class="job-filter-item-orderby border-bottom"
                     v-show="active === 3"
                     :key="2"
                     ref="orderby"
                     @filterChanged="onFilterChanged($event, 'orderBy')"
                     @touchmove="stopPropagation"></job-orderby>
        <job-conditions class="job-filter-item-conditions border-bottom"
                        v-show="active === 4"
                        :key="3"
                        ref="conditions"
                        @filterChanged="onFilterChanged($event, 'condition')"
                        @reset="onReset"
                        @touchmove="stopPropagation"></job-conditions>
        <!-- </transition-group> -->
      </div>
    </div>
    <base-location location-only
                   v-if="!currentCity.id"></base-location>
  </div>
</template>

<script>
import JobRegions from '@/components/JobRegions'
import JobPositions from '@/components/JobPositions'
import JobOrderby from '@/components/JobOrderby'
import JobConditions from '@/components/JobConditions'
import { mapGetters } from 'vuex'
// import { stopPropagation } from '@mixins'
export default {
  components: {
    JobRegions,
    JobPositions,
    JobOrderby,
    JobConditions
  },
  data: () => ({
    active: 0,
    region: {},
    position: {},
    orderBy: {},
    condition: {}
  }),
  // mixins: [stopPropagation],
  computed: {
    ...mapGetters({
      currentCity: 'common/currentCity',
      currentLocation: 'common/currentLocation'
    }),
    currentPosition() {
      let currentPosition = {}
      currentPosition.cityId = this.currentCity.id
      let position = this.currentLocation.position
      if (position) {
        currentPosition.latitude = position.lat
        currentPosition.longitude = position.lng
      }
      return currentPosition
    }
  },
  methods: {
    preventWindowScroll() {
      console.log('preventWindowScroll')
    },
    stopPropagation() {
      console.log('stopPropagation')
    },
    scrollToFilter() {
      this.$vuetify.goTo('#filter', {
        duration: 500,
        easing: 'easeInOutCubic'
      })
    },
    onClickTab(tab) {
      if (this.currentCity.id) {
        let filterBCR = this.$refs.filter.getBoundingClientRect()
        console.log(filterBCR)
        if (filterBCR && filterBCR.top !== 0) {
          this.scrollToFilter()
        }
        this.active = tab
      }
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
          delete this.region.platformId
        } else {
          console.log(+region.metroid === 0)
          if (+region.metroid === 0) {
            this.region.metroId = region.id
            delete this.region.platformId
          } else {
            this.region.platformId = region.id
            delete this.region.metroId
          }
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
    },
    closeFilter() {
      setTimeout(() => {
        this.active = 0
      }, 100)
    },
    setFilter() {
      let filter = Object.assign({}, this.region, this.position, this.orderBy, this.condition, this.currentPosition)
      Object.keys(filter).forEach(key => {
        if (filter[key] === '' || (filter[key] && filter[key].length === 0)) {
          delete filter[key]
        }
      })
      console.log(filter)
      this.$emit('filterChanged', filter)
    },
    onReset() {
      this.$refs.regions.reset()
      this.$refs.positions.reset()
      this.$refs.orderby.reset()
      this.$refs.conditions.reset()
      this.region = {}
      this.position = {}
      this.orderBy = {}
      this.condition = {}
      this.$emit('filterChanged', this.currentPosition)
      this.closeFilter()
    }
  },
  watch: {
    currentPosition(newValue) {
      if (newValue) {
        // this.setFilter()
      }
    },
    active(isActive) {
      if (isActive) {
        // document.documentElement.style.overflow = 'hidden'
        // this.formBg = true
      } else {
        // document.documentElement.style.overflow = 'auto'
      }
    }
  }
}
</script>

<style lang="scss">
.job-filter {
  position: sticky;
  top: $top-nav-height;
  z-index: 1;
  .job-filter-items {
    position: relative;
  }
  &.active {
    .job-filter-items {
      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 100vw;
        height: calc(100vh - #{$job-filter-height} - #{$bottom-nav-height} - #{$top-nav-height});
        left: 0;
        top: 0;
        z-index: -1;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }

  .job-filter-item-regions,
  .job-filter-item-positions,
  .job-filter-item-orderby,
  .job-filter-item-conditions {
    position: absolute;
    left: 0;
    // top: 100%;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    width: 100vw;
    text-align: left;
    z-index: 1;
    max-height: calc(100vh - #{$job-filter-height} - #{$bottom-nav-height} - #{$top-nav-height});
  }
}
.dropdown {
  position: relative;
  height: 0;
  overflow: hidden;
  transition: height 350ms;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    background-image: linear-gradient(to top, white, rgba(white, 0));
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-leave,
  &-enter-to {
    opacity: 1;
  }

  &-enter-active,
  &-leave-active {
    position: absolute;
    width: 100%;
    transition: opacity 200ms ease-in-out;
  }

  &-enter-active {
    transition-delay: 100ms;
  }
}
.fade-enter-active {
  transition: transform 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-leave-active {
  transition: transform 0.3s ease;
  opacity: 0;
}

.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(100%);
  // opacity: 0;
  // max-height: 0;
}
</style>
