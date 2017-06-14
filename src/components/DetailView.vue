<template>
  <div>
    <div class="mdl-grid">
      <h4 class="head1">{{route.title}}</h4>
    </div>
    <div class="mdl-grid">
      <route-map-card class="mdl-cell mdl-cell--8-col" :route="route"></route-map-card>
    </div>
    <div class="mdl-grid">
      <visit-card
          class="mdl-shadow--2dp mdl-cell mdl-cell--4-col"
          v-for="(visit, index) in route.visits" :key="visit.id" :visit="visit">
      </visit-card>
    </div>
    <button class="copy-button mdl-button mdl-js-button mdl-button--raised mdl-button--accent" @click="$router.push({name:'editor', id:'', query: { copy: route.id }})">Copy this route</button>
  </div>
</template>
<script>
import data from '../data'
export default {
  data () {
    return {
      route: data.routes[this.$route.params.id]
    }
  }
}
</script>
<style scoped>
  h4 {
    background: rgba(0, 0, 0, 0.5);
    color: white;
  }
  .copy-button {
    position: fixed;
    right: 24px;
    top: 60px;
    z-index: 998;
  }
</style>
