<template>
<div>
  <v-container fluid>
    <v-layout row class="mb-2">
      <v-flex xs7>
        <h4 class="head1">My Routes</h4>
      </v-flex>
    </v-layout>
    <v-layout row v-for="route in this.myRoutes" :key="route.id">
      <v-flex xs12 class="mb-2">
        <route-card :route="route" @click="editRoute(route.id)"></route-card>
      </v-flex>
    </v-layout>
  </v-container>
  <v-btn error light v-on:click.native="createNewRoute()" style="position: fixed; top:60px; right: 10px;">Create</v-btn>
</div>
</template>
<script>
  import data from '../data'
  export default {
    methods: {
      createNewRoute () {
        this.$router.push({name: 'editor'})
      },
      editRoute (id) {
        this.$router.push({name: 'editor', query: { id: id }})
      }
    },
    data () {
      return {
        'myRoutes': data.routes.slice(0, 2)
      }
    }
  }
</script>
<style scoped>
  .filled {
    width: 100%;
  }
</style>
