<template>
  <v-bottom-nav :active.sync="bottomNav"
                :value="true"
                fixed
                app
                color="white"
                class="bottom-nav">
    <v-btn nuxt
           :to="link.href"
           flat
           v-for="link in links"
           :key="link.label"
           :value="link.label">
      <span v-text="link.title"></span>
      <component :is="link.icon"
                 :key="link.iocn"
                 class="svg" />
    </v-btn>
  </v-bottom-nav>
</template>

<script>
export default {
  data: () => ({
    bottomNav: 'user',
    links: [
      { title: '兼职', href: '/job', label: 'job', icon: 'SvgJob' },
      { title: '战队', label: 'team', href: '/team', icon: 'SvgTeam' },
      {
        title: '排行榜',
        label: 'ranking',
        href: '/ranking',
        icon: 'SvgRanking'
      },
      {
        title: '消息',
        label: 'message',
        href: '/message',
        icon: 'SvgMessage'
      },
      { title: '我的', label: 'user', href: '/user', icon: 'SvgCenter' }
    ]
  })
}
</script>

<style lang="scss">
.bottom-nav {
  .v-btn {
    opacity: 0.75;
    min-width: inherit;
  }
  .v-btn--active {
    opacity: 1;
    svg path.st0 {
      fill: #8bc271;
    }
  }
  svg {
    width: 24px;
    height: 24px;
    path.st0 {
      fill: transparent;
    }

    path:not(.st0) {
      fill: #292828;
    }
  }
  &.v-bottom-nav .v-btn {
    min-width: unset;
  }
}
</style>
