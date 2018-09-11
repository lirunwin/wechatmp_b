<template>
  <v-layout row
            justify-center
            class="city-selector">
    <v-dialog v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition">
      <v-btn slot="activator"
             color="primary"
             dark>Open Dialog</v-btn>
      <v-card>
        <div class="city-selector-action">
          <v-toolbar light
                     dense
                     flat
                     color="white"
                     class="border-bottom">
            <v-btn icon
                   light
                   @click.native="dialog = false">
              <v-icon class="iconfont icon-x"></v-icon>
            </v-btn>
            <div>选择城市</div>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn light
                     flat
                     @click.native="dialog = false">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <div class="secondary py-2">
            <base-input placeholder="请输入城市名称"
                        prepend-inner-icon="iconfont icon-search"
                        autofocus
                        clearable
                        v-model="inputValue"
                        class="mx-3"></base-input>
          </div>
          <div class="d-flex px-3 py-2 border-bottom">
            当前位置：
            <span class="primary--text">成都</span>
            <v-spacer></v-spacer>
            刷新
          </div>
        </div>
        <v-layout class="city-selector-main">
          <v-list class="city-selector-main-provinces secondary py-0">
            <v-list-tile class="active city-selector-main-province">
              <v-list-tile-content>
                <span>热门</span>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile class="city-selector-main-province"
                         v-for="n of 50"
                         :key="n">
              <v-list-tile-content>
                <span>热门</span>
              </v-list-tile-content>
            </v-list-tile>

          </v-list>
          <v-list class="city-selector-main-cities py-0">
            <v-list-tile class="city-selector-main-city">
              <v-list-tile-content>
                <span class="active px-4">热门</span>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile class="city-selector-main-city"
                         v-for="n of 20"
                         :key="n">
              <v-list-tile-content>
                <span class="px-4">热门</span>
              </v-list-tile-content>
            </v-list-tile>

          </v-list>

        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      dialog: true,
      inputValue: ''
    }
  }
}
</script>

<style lang="scss">
.city-selector-main {
    height: calc(100vh - 138px);
    display: flex;
    ul {
        list-style: none;
        padding: 0;
    }
    .city-selector-main-provinces {
        flex: 0 0 25%;
        width: 25%;
        height: 100%;
        overflow: auto;
        .city-selector-main-province {
            position: relative;
            &.active {
                background-color: #ffffff;
                &::before {
                    content: '';
                    position: absolute;
                    border-left: 2px solid $primary;
                    border-radius: 4px;
                    height: 100%;
                    top: 0;
                    left: 0.5em;
                    transform: scaleY(0.5);
                }
            }
        }
    }
    .city-selector-main-cities {
        overflow: auto;
        height: 100%;
        flex: 1;
        .city-selector-main-city span {
            border-radius: $border-radius;
            cursor: pointer;
            &:hover,
            &.active {
                background-color: lighten($primary, 15%);
            }
        }
    }
}
</style>
