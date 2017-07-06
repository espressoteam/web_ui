<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs8 class="mb-2">
          <v-text-field
              name="title"
              label="Title"
              v-model="route.title"
              class="input"
              autofocus
            ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs8 class="mb-2">
          <v-text-field
              name="info"
              label="Info"
              multi-line
              rows="2"
              v-model="route.info"
              class="input"
            ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs8 class="mb-2">
          <div class="input-group input-group--dirty input-group--dark input-group--text-field input-group--multi-line">
            <label>Search for a place</label>
            <div class="input-group__input input">
              <gmap-autocomplete 
              :value="description" 
              @place_changed="setPlace">
              </gmap-autocomplete>
            </div>
          </div>
        </v-flex>
        <v-flex xs2 class="mb-2">
          <v-dialog v-model="place_dialog" persistent>
            <v-card class="pa-3">
              <v-card-title>
                <div class="headline">{{selecting_place.title}}</div>
              </v-card-title>
              <visit-editor :visit="selecting_place"></visit-editor>
              <v-card-row actions>
                <v-spacer></v-spacer>
                <v-btn class="green--text darken-1" flat="flat" @click.native="addVisit()">Add</v-btn>
                <v-btn class="green--text darken-1" flat="flat" @click.native="cancel()">Cancel</v-btn>
              </v-card-row>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 class="mb-2">
          <route-map-card v-if="route.center" :route="route"></route-map-card>
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
    <v-btn error light v-on:click.native="saveMyRoute()" style="position: fixed; top:60px; right: 10px;">Save</v-btn>
  </div>
</template>
<script>
import data from '../data'
export default {
  data () {
    return {
      place_dialog: false,
      description: ' ',
      selecting_place: {},
      previewImg: '',
      edit: false,
      dedit: false,
      error: false,
      message: '',
      snackbar: false,
      loading: false,
      route: {}
    }
  },
  created () {
    let id

    if (this.$route.query.id !== undefined) {
      id = this.$route.query.id
    } else if (this.$route.query.copy !== undefined) {
      id = this.$route.query.copy
    }

    if (id !== undefined) {
      console.log('open route id: ', id)
      this.route = data.routes[id]
    }
  },
  methods: {
    addVisit () {
      this.route.visits = this.route.visits || []
      let id = this.route.visits.length
      let seq = id + 1
      this.selecting_place.id = id
      this.selecting_place.seq = seq
      this.route.center = this.route.center || this.selecting_place.position
      console.log('Adding visit: ', this.selecting_place)
      this.route.visits = this.route.visits.concat(this.selecting_place)
      this.route = Object.assign({}, this.route)
      this.selecting_place = {}
      this.description = ''
      this.place_dialog = false
    },
    cancel () {
      this.selecting_place = {}
      this.description = ''
      this.place_dialog = false
    },
    setPlace (place) {
      console.log('select place: ', place)
      // let photo = place.photos[0]
      // this.previewImg = photo.getUrl({'maxWidth': photo.width, 'maxHeight': photo.height})
      // console.log('previewImg: ', this.previewImg)
      let selectingPlace = {
        title: place.name,
        position: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}
      }
      this.selecting_place = selectingPlace
      this.place_dialog = true
    },
    saveMyRoute () {
      this.loading = true
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
