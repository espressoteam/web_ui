<template>
  <div>
    <div class="mdl-grid">
      <input v-if="edit" class="head1" type="text" v-model="route.title" id="title" @blur="edit=false">
      <span v-if="!edit" class="head1">{{route.title}} <i @click="edit=true" class="material-icons button">edit</i></span>
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
  </div>
</template>
<script>
import data from '../data'
export default {
  data () {
    return {
      edit: false,
      previousTitle: null,
      route: data.routes[this.$route.query.copy]
    }
  },
  watch: {
    edit () {
      if (this.edit) {
        this.previousTitle = this.route.title
      } else if (this.previousTitle !== this.route.title) {
        this.$http.put(`route/${this.route.id}`, this.route)
      }
    }
  }
}
</script>
<style scoped>
  .head1 {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 2.12em;
    padding-top: 2px;
    padding-bottom: 8px;
  }
  .button {
    cursor: pointer;
  }

  .button:hover {
    color: grey;
  }
</style>
