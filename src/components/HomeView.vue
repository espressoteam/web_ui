<template>
<div>
  <v-container fluid>
    <v-layout row>
      <v-flex xs6 class="mb-3">
        <v-btn error block light>My routes</v-btn>
      </v-flex>
      <v-flex xs6 class="mb-3">
        <v-btn error block light>Routes nearby</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row class="mb-2">
      <v-flex xs7>
        <h4 class="head1">Recommended</h4>
      </v-flex>
    </v-layout>
    <v-layout row v-for="route in this.recommendRoutes" :key="route.id">
      <v-flex xs12 class="mb-2">
        <route-card :route="route" @click="displayDetails(route.id)"></route-card>
      </v-flex>
    </v-layout>
    <v-layout row class="mb-2 mt-2">
      <v-flex xs6>
        <h4 class="head1">Popular</h4>
      </v-flex>
    </v-layout>
    <v-layout row v-for="route in this.popularRoutes" :key="route.id">
      <v-flex xs12 class="mb-2">
        <route-card :route="route" @click="displayDetails(route.id)"></route-card>
      </v-flex>
    </v-layout>
  </v-container>
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
