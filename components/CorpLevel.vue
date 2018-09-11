<template>
  <div class="d-flex">
    <component :is="'svg-corp-level'"
               v-for="n of Math.ceil(level)"
               :key="n"
               class="svg-sm"
               :class="{ 'svg-grey': n > +level}"></component>
  </div>
</template>

<script>
export default {
  props: {
    level: {
      type: [Number, String],
      default: 5
    }
  }
}
</script>
