<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs8 class="mb-2">
          <span v-if="!edit" class="head1 display-3">
            {{route.title}}
            <v-icon style="cursor:pointer" class="white--text ml-2" @click="edit=true">mode_edit</v-icon>
          </span>
          <div v-else style="display:flex;">
            <input v-model="route.title" class="head1" size="10"/>
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
                <v-btn flat class="white--text" 
                  :loading="loading"
                  :disabled="loading"
                  @click.native="loading = true; saveMyRoute();">
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
    <v-snackbar
      :timeout="6000"
      :bottom="true"
      :error="error"
      :success="!error"
      :multi-line="true"
      v-model="snackbar"
    >
      {{message}}
      <v-btn light small flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import data from '../data'
export default {
  data () {
    return {
      edit: false,
      dedit: false,
      error: false,
      message: '',
      snackbar: false,
      loading: false,
      route: data.routes[this.$route.query.copy]
    }
  },
  methods: {
    saveMyRoute () {
      this.$http.put(`route/${this.route.id}`, this.route)
      .then(response => {
        console.log('response: ', response)
        this.error = false
        this.message = 'save successfully'
        this.snackbar = true
        this.loading = false
      }, response => {
        console.log('response: ', response)
        this.error = true
        this.message = 'error saving'
        this.snackbar = true
        this.loading = false
      })
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
