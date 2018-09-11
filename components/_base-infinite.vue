<template>
  <no-ssr>
    <infinite-loading v-bind="$attrs"
                      v-on="$listeners"
                      :spinner="spinner"
                      :distance="distance"
                      ref="infiniteLoading">
      <div slot="no-more"
           class="caption text-muted">
        没有更多数据了
      </div>
      <div slot="no-results"
           class="caption text-muted">
        没有查询到结果
      </div>
    </infinite-loading>
  </no-ssr>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
  inheritAttrs: false,
  props: {
    spinner: {
      type: String,
      default: 'bubbles'
    },
    distance: {
      type: Number,
      default: 0
    }
  },
  components: {
    InfiniteLoading
  }
}
</script>
