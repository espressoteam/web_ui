<template>
<v-card :img="route.imageUrl" @click="click">
  <v-card-row>
    <v-card-text class="text-xs-right">
      <span class="trans-text pl-1 pt-1 pb-1 pr-1"><strong>{{route.title}}</strong></span>
    </v-card-text>
  </v-card-row>
  <v-card-row height="50px"></v-card-row>
  <v-card-row class="white--text trans-text pl-2 pt-1 pb-1">
    {{ route.info }}<br/>
    {{ route.duration }}, {{ route.copied }} people copied
  </v-card-row>
</v-card>
</template>
<script>
export default {
  name: 'route-card',
  props: ['route'],
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>
<style scoped>
.card {
  background-position: center;
  background-size: cover;
  cursor: pointer;
}
.trans-text {
  color: white;
  background: rgba(0, 0, 0, 0.6);
}
</style>
