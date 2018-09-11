<template>
  <div class="job-position ">
    <div class="pa-3 white">
      <div v-for="item of positions"
           :key="item.header.id">
        <div>{{item.header.name}}</div>
        <div>
          <base-tag height="24px"
                    :color="currentItem.id === position.id ? 'primary': 'grey darken-1'"
                    v-for="position of item.list"
                    @click="onClick(position)"
                    :key="position.id">{{position.name}}</base-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { jobTypes } from '@const'
import { labelToValue } from '@helper'
export default {
  data: () => ({
    levelOne: 'metro',
    levelTwo: {},
    levelThree: {},
    jobType: '',
    jobTypes,
    currentItem: {}
  }),
  computed: {
    ...mapGetters({
      positions: 'common/groupedPositions'
    })
  },
  methods: {
    ...mapActions({
      fetchPositions: 'common/fetchPositions'
    }),
    onClick(position) {
      if (this.currentItem.id === position.id) {
        this.currentItem = {}
      } else {
        this.currentItem = position
      }
      this.$emit('filterChanged', { positionId: position.id })
    },
    reset() {
      this.currentItem = {}
    }
  },
  mounted() {
    this.jobType = labelToValue('parttime', this.jobTypes)
    this.fetchPositions({ recruitmenttype: this.jobType })
  }
}
</script>
