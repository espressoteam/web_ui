<template>
<div>
  <v-container fluid>
    <v-layout row>
      <v-flex xs6 md4 class="mb-3">
        <v-btn error block light v-on:click.native="displayMyRoutes">My routes</v-btn>
      </v-flex>
      <v-flex xs6 md4 class="mb-3">
        <v-btn error block light>Routes nearby</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row class="mb-2">
      <v-flex xs7 md2>
        <h4 class="head1">Recommended</h4>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md4 class="mb-2" v-for="route in this.recommendRoutes" :key="route.id">
        <route-card :route="route" @click="displayDetails(route.id)"></route-card>
      </v-flex>
    </v-layout>
    <v-layout row class="mb-2 mt-2">
      <v-flex xs6 md2>
        <h4 class="head1">Popular</h4>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md4 class="mb-2" v-for="route in this.popularRoutes" :key="route.id">
        <route-card :route="route" @click="displayDetails(route.id)"></route-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>
<script>
  import gql from 'graphql-tag'

  export default {
    methods: {
      displayDetails (id) {
        this.$router.push({name: 'detail', params: { id: id }})
      },
      displayMyRoutes () {
        this.$router.push({name: 'my-route'})
      }
    },
    data () {
      return {
        'recommendRoutes': [],
        'popularRoutes': []
      }
    },
    apollo: {
      recommendRoutes: gql`{recommendRoutes {
        id
        title
        info
        imageUrl
        copied
        duration
      }}`,
      popularRoutes: gql`{popularRoutes {
        id
        title
        info
        imageUrl
        copied
        duration
      }}`
    }
  }
</script>
<style scoped>
  .filled {
    width: 100%;
  }
</style>
