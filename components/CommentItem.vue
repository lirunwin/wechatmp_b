<template>
  <div class="white"
       v-if="item">
    <base-divider></base-divider>
    <v-layout class="px-3 pt-2"
              column>
      <v-layout align-center>
        <v-flex class="subheading text-truncate pr-3">{{item.targetname}}</v-flex>
        <comment-stars :stars="item.score"></comment-stars>
      </v-layout>
      <v-flex class="caption text-muted mt-1">
        <v-icon class="iconfont icon-time icon--text"></v-icon>评价时间：{{item.createtime}}
      </v-flex>
      <v-flex v-if="item.evaluationTags.length">
        <base-tag :outline="false"
                  v-for="tag of item.evaluationTags"
                  :key="tag.id"
                  :color="`grey lighten-${tag.tagsource || 0}`"
                  height="24px">{{tag.tagname}}</base-tag>
      </v-flex>
      <v-divider class="mt-3"></v-divider>
    </v-layout>
    <p class="pa-3 body-2 mb-0">{{item.content}}</p>
  </div>
</template>

<script>
import CommentStars from '@/components/CommentStars'
export default {
  props: ['item'],
  components: {
    CommentStars
  }
}
</script>
