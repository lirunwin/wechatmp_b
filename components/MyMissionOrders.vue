<template>
  <div class="my-mission-orders"
       v-if="id">
    <v-layout class="py-4"
              align-center
              justify-center>
      <div class="my-mission-orders-btn"
           :class="{disable: disabled}">
        <v-btn color="primary"
               fab
               large
               flat
               class="ma-0 body-2"
               :disabled="disabled"
               @click="dialog = true">提交单量</v-btn>
      </div>
    </v-layout>
    <v-layout align-center
              justify-center
              pb-3
              class="text-xs-center">
      <div class="px-4">
        <div class="title primary--text pb-2">{{orders.orderNum || 0}}</div>
        <div>总单量</div>
      </div>
      <div class="px-4">
        <div class="title primary--text pb-2">{{orders.orderConfirmNum || 0}}</div>
        <div>已确认</div>
      </div>
      <div class="px-4">
        <div class="title primary--text pb-2">{{orders.orderDenyNum || 0}}</div>
        <div>已驳回</div>
      </div>
    </v-layout>
    <div class="body-2 py-2 px-3 grey lighten-3">单量记录</div>
    <div class="my-mission-orders-log">
      <v-layout class="my-mission-orders-log-item mt-2"
                align-center
                wrap
                v-if="orders.list.length"
                v-for="order of orders.list"
                :key="order.orderid">
        <span class="px-3 flex-auto">
          <span class="subheading">{{order.number || 0}}</span>
          <span class="grey--text">单</span>
        </span>
        <v-flex>
          <div>
            <span class="caption">提交时间:{{order.createtime}}</span>
          </div>
          <div class="mt-2"
               v-if="order.checkTime">
            <span class="caption">确认时间:{{order.checkTime}}</span>
          </div>
        </v-flex>
        <span class="primary--text pr-3 flex-auto">
          {{order.acceptanceStatus | valueToLabel(orderStatuses)}}
        </span>
        <v-flex xs12
                class="mt-2"
                v-if="order.directions">
          <v-divider></v-divider>
          <div class="grey--text px-3 mt-2 caption">
            备注：{{order.directions}}
          </div>
        </v-flex>
        <img src="@img/reject.png"
             v-if="getStatusName(order.acceptanceStatus) === 'reject'">
        <v-flex xs12
                class="mt-2">
          <base-divider></base-divider>
        </v-flex>
      </v-layout>
      <base-infinite @infinite="infinite($event, fetchOrders, {id})"
                     ref="infiniteLoading"></base-infinite>
    </div>
    <v-dialog v-model="dialog"
              max-width="500px">
      <v-card>
        <v-card-title class="justify-center pt-4">
          <span class="title">上传单量</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid"
                  class="px-3"
                  ref="form"
                  lazy-validation>
            <v-layout align-end>
              <div class="flex-auto">数量：</div>
              <v-flex>
                <base-input placeholder="数量"
                            v-model="order.number"
                            :rules="numberRules"
                            :flat="false"
                            :solo="false"
                            class="mt-0"
                            type="number"
                            required></base-input>
              </v-flex>
            </v-layout>
            <v-layout align-top
                      class="mt-3">
              <div class="flex-auto">说明：</div>
              <v-flex>
                <base-textarea outline
                               solo
                               flat
                               v-model="order.directions"
                               label="说明情况"
                               counter="200"
                               class="body-1"></base-textarea>
              </v-flex>
            </v-layout>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary"
                 block
                 class="ma-4"
                 :disabled="!valid"
                 @click="submit"
                 :loading="loading">上传</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { page } from '@mixins'
import { mapActions, mapGetters } from 'vuex'
import { orderStatuses, applyStatuses } from '@const'
import { valueToLabel } from '@helper'
export default {
  props: ['id', 'status'],
  mixins: [page],
  data: () => ({
    orderStatuses,
    dialog: false,
    loading: false,
    valid: false,
    order: {},
    numberRules: [v => !!v || '', v => (v && v > 0) || '']
  }),
  computed: {
    ...mapGetters({
      orders: 'mission/orders'
    }),
    disabled() {
      return valueToLabel(this.status, applyStatuses, 'name') === 'done'
    }
  },
  methods: {
    ...mapActions({
      fetchOrders: 'mission/fetchOrders',
      addOrder: 'mission/addOrder'
    }),
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.order.deliveryid = this.id
        this.addOrder(this.order).then(res => {
          this.loading = false
          this.dialog = false
          this.order = {}
        })
      }
    },
    getStatusName(val) {
      return valueToLabel(val, orderStatuses)
    }
  }
}
</script>

<style lang="scss">
.my-mission-orders {
  .my-mission-orders-btn {
    border: 3px solid $primary;
    border-radius: 50%;
    &.disable {
      border-color: $border-color-dark;
    }
  }
  .my-mission-orders-log-item {
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
