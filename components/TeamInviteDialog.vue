<template>
  <v-dialog v-model="dialog"
            max-width="500px">
    <v-card>
      <v-card-title class="justify-center pt-4">
        <span class="title">邀请加入战队</span>
      </v-card-title>
      <v-card-text>
        <div class="mx-3">
          <v-text-field label="请输入用户注册电话"
                        v-model="keyword"
                        maxlength="11"
                        clearable></v-text-field>
        </div>
        <v-card-actions>
          <v-btn color="primary"
                 block
                 class="mx-4 my-3"
                 :disabled="!keyword"
                 :loading="loading"
                 @click="search">确定</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    keyword: '',
    loading: false,
    dialog: false
  }),
  methods: {
    ...mapActions({
      searchUser: 'team/searchUser'
    }),
    active() {
      this.dialog = true
    },
    search() {
      if (this.keyword) {
        this.loading = true
        this.searchUser({ keyword: this.keyword, id: '' })
          .then(res => {
            this.$emit('search', res)
            this.loading = false
            this.dialog = false
          })
          .catch(error => {
            this.loading = false
            this.dialog = false
            console.log(error)
          })
      }
    }
  }
}
</script>
