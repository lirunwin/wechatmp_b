<template>
  <div class="my-mission-salary"
       v-if="id">
    <v-layout align-center
              justify-center
              py-4
              class="text-xs-center">
      <v-layout align-center
                justify-center>
        <div class="px-3">
          <div class="headline primary--text mb-2">￥{{salaryLog.paiedWage || 0}}</div>
          已发放
        </div>
        <div class="px-3">
          <div class="headline primary--text mb-2">￥{{salaryLog.unPayWage || 0}}</div>
          未发放
        </div>
      </v-layout>
    </v-layout>
    <div class="body-2 py-2 px-3 grey lighten-3">工资记录</div>
    <div class="my-mission-salary-log">
      <div class="my-mission-salary-log-item"
           v-for="item of salaryLog.list"
           :key="item.id">
        <v-layout align-center
                  class="border-bottom px-3 py-2">
          <span class="subheading grey--text text--darken-2">{{item.clearingDate}}</span>
          <v-spacer></v-spacer>
        </v-layout>
        <v-layout align-center
                  class="py-3 caption">
          <span class="flex-auto pl-3">
            <span class="title">{{item.payPrice || 0}}</span>元</span>
          <v-layout wrap>
            <div class="px-3">
              <div>工作时长：
                <span class="subheading">{{item.baseNumber | formatWorkHours(item.wageBaseUnit)}}</span>
              </div>
              <div>基本工资：
                <span class="subheading">{{item.wageBase}}</span>
                <span class="caption">元</span>/天</div>
            </div>
            <v-spacer></v-spacer>
            <div class="px-3">
              <div>完成单量：
                <span class="subheading">{{item.commisionNumber}}
                  <span class="caption">{{item.commisionNumber >=0 ? '单' : '无单量'}}</span>
                </span>
              </div>
              <div>每单提成：
                <span class="subheading">{{item.wageCommision}}</span>
                <span class="caption">元</span>/单
              </div>
            </div>
            <v-flex xs12
                    v-if="+item.awardPrice !== 0"
                    class="px-3">
              <div>奖惩金额：
                <span class="subheading"
                      :class="item.awardPrice > 0 ? 'primary--text': 'error--text'">{{item.awardPrice}}
                  <span class="caption">元</span>
                </span>
              </div>
            </v-flex>
          </v-layout>
        </v-layout>
        <base-divider></base-divider>
      </div>
      <base-infinite @infinite="infinite($event, fetchSalaryLog, {id})"
                     ref="infiniteLoading"></base-infinite>
    </div>
  </div>
</template>

<script>
import { page } from '@mixins'
import { mapActions, mapGetters } from 'vuex'
export default {
  props: ['id'],
  mixins: [page],
  methods: {
    ...mapActions({
      fetchSalaryLog: 'mission/fetchSalaryLog'
    })
  },
  computed: {
    ...mapGetters({
      salaryLog: 'mission/salaryLog'
    })
  }
}
</script>

<style lang="scss">
.my-mission-salary {
  .my-mission-salary-btn {
    border: 3px solid $primary;
    border-radius: 50%;
  }
  .my-mission-salary-log-item {
    position: relative;
    z-index: 2;
    img {
      position: absolute;
      z-index: 1;
      right: 2rem;
      top: 0.5rem;
      width: 20vw;
    }
  }
}
</style>
