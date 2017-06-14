<template>
<div>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--3-col mdl-cell--2-col-phone">
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent filled">My routes</button>
    </div>
    <div class="mdl-cell mdl-cell--3-col mdl-cell--2-col-phone">
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent filled">Routes nearby</button>
    </div>
  </div>
  <div class="mdl-grid">
    <h4 class="head1">Recommended</h4>
  </div>
  <div class="mdl-grid">
    <route-card 
    class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone"
    v-for="route in this.recommendRoutes" :route="route" :key="route.id" @click="displayDetails(route.id)"></route-card>
  </div>
  <div class="mdl-grid">
    <h4 class="head1">Popular</h4>
  </div>
  <div class="mdl-grid">
    <route-card 
    class="mdl-cell mdl-cell--6-col mdl-cell--4-col-phone"
    v-for="route in this.popularRoutes" :route="route" :key="route.id" @click="displayDetails(route.id)"></route-card>
  </div>
</div>
</template>
<script>
  import data from '../data'

  export default {
    methods: {
      displayDetails (id) {
        this.$router.push({name: 'detail', params: { id: id }})
      }
    },
    data () {
      return {
        'recommendRoutes': data.routes.slice(0, 2),
        'popularRoutes': data.routes.slice(3)
      }
    }
  }
</script>
<style scoped>
  .filled {
    width: 100%;
  }
</style>
