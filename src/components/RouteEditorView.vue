<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs6 class="mb-2">
          <span v-if="!edit" class="head1 display-3">
            {{route.title}}
            <v-icon style="cursor:pointer" class="white--text ml-2" @click="edit=true">mode_edit</v-icon>
          </span>
          <div v-else style="display:flex;">
            <input v-model="route.title" class="head1"/>
            <v-icon style="cursor:pointer;" class="head1 white--text" @click="edit=false">save</v-icon>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 class="mb-2">
          <v-card horizontal>
            <v-card-row :img="route.imageUrl" height="150px"></v-card-row>
            <v-card-column>
              <v-card-row class="pink white--text">
                <v-card-text v-if="!dedit">
                  {{route.info}} 
                  <v-icon style="cursor:pointer;" class="white--text" @click="dedit=true">mode_edit</v-icon>
                </v-card-text>
                <v-text-field v-else
                  multi-line
                  v-model="route.info"
                  :append-icon="'save'"
                  :append-icon-cb="() => dedit = false"
                ></v-text-field>
              </v-card-row>
              <v-card-row actions class="pink darken-2">
                <v-btn flat class="white--text" @click.native="$router.push({name:'editor', id:'', query: { copy: route.id }})">
                  <v-icon left light>save</v-icon>Save
                </v-btn>
              </v-card-row>
            </v-card-column>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 class="mb-2">
          <route-map-card :route="route"></route-map-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 md6 class="mb-2" v-for="(visit, index) in route.visits" :key="visit.id">
          <visit-card :visit="visit"></visit-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar class="cyan darken-4"
      :timeout="60000"
      :top="true"
      :secondary="true"
      :multi-line="true"
      v-model="snackbar"
    >
      <span><strong>We will notify you when <u>{{route.traveller}}</u> do something interesting!!</strong></span>
      <v-btn light primary @click.native="snackbar = false; registerUser();">Allow</v-btn>
      <v-btn light small flat @click.native="snackbar = false" class="caption"><small>Not interested</small></v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import data from '../data'
export default {
  data () {
    return {
      edit: false,
<<<<<<< Updated upstream
      previousTitle: null,
=======
      dedit: false,
>>>>>>> Stashed changes
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
