<template>
  <v-bottom-sheet v-model="commentSheet">
    <div class="comment white">
      <v-layout align-center
                justify-center
                column>
        <div class="subheading text-xs-center py-3"> 对这工作感觉怎么样呢？ </div>
        <div class="comment-stars py-2 my-2">
          <v-flex class="d-flex">
            <v-icon class="mx-2 ">iconfont icon-star</v-icon>
            <v-icon class="mx-2">iconfont icon-star</v-icon>
            <v-icon class="mx-2">iconfont icon-star</v-icon>
            <v-icon class="mx-2">iconfont icon-star</v-icon>
            <v-icon class="mx-2">iconfont icon-star</v-icon>
          </v-flex>
        </div>
        <v-layout wrap
                  class="comment-tags">
          <v-flex xs6
                  v-for="n of 10"
                  :key="n"
                  class="pa-2">
            <base-tag height="24px"
                      class="ma-0"
                      block
                      outline
                      v-model="aaa"
                      :item="n">123213</base-tag>
          </v-flex>
        </v-layout>
        <div class="comment-text mt-3">
          <base-textarea outline
                         solo
                         flat
                         label="除了评分，还有什么其他想说的吗~"
                         counter="200"
                         class="body-1"></base-textarea>
          <v-btn color="primary"
                 class="mt-3 mb-5"
                 block>确定</v-btn>
        </div>
      </v-layout>
    </div>
  </v-bottom-sheet>
</template>

