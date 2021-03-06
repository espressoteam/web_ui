<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs6 class="mb-2">
          <h4 class="head1">{{route.title}}</h4>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 class="mb-2">
          <v-card horizontal>
            <v-card-row :img="route.imageUrl" height="200px"></v-card-row>
            <v-card-column>
              <v-card-row class="indigo white--text">
                <v-card-text>
                  {{route.info}}<br/>
                  <strong>by {{route.traveller}}</strong>
                  <v-btn icon class="white--text text--lighten-2" @click.native="toggleFollow()">
                    <v-icon v-if="route.is_follow" light>star</v-icon>
                    <v-icon v-else light>star_border</v-icon>
                  </v-btn>
                </v-card-text>
              </v-card-row>
              <v-card-row actions class="indigo darken-2">
                <v-btn flat class="white--text" @click.native="$router.push({name:'editor', id:'', query: { copy: route.id }})">
                  <v-icon left light>content_copy</v-icon>Copy this route
                </v-btn>
              </v-card-row>
            </v-card-column>
          </v-card>
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
    <v-snackbar class="deep-orange darken-1"
      :timeout="60000"
      :bottom="true"
      :secondary="true"
      :multi-line="true"
      v-model="snackbar"
    >
      <span><strong>Follow <u>{{route.traveller}}</u>'s updates?</strong></span>
      <v-btn light primary small @click.native="snackbar = false; registerUser();">Allow</v-btn>
      <v-btn light icon flat @click.native="snackbar = false" class="caption pl-0 ml-0"><small>No</small></v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import gql from 'graphql-tag'
import firebase from '../services/firebase'

const messaging = firebase.messaging()

export default {
  data () {
    return {
      route: {},
      message: '',
      token: '',
      user: '',
      snackbar: false
    }
  },
  created () {
    var user = localStorage.getItem('user')
    if (!user) {
      user = new Date().getTime()
      localStorage.setItem('user', user)
    }
    this.user = user

    var token = localStorage.getItem('token')
    this.token = token
  },
  methods: {
    toggleFollow () {
      this.route.is_follow = !this.route.is_follow

      if (this.route.is_follow && !this.token) {
        // try register
        this.snackbar = true
      }

      if (!this.route.is_follow && this.token) {
        console.log('Try unregister user')
        unregisterToken(this.token)
        .then(() => {
          console.log('Unregistered')
          this.token = ''
          deleteToken(this.user)
        })
      }
    },
    registerUser () {
      registerNotification()
      .then((currentToken) => {
        console.log('Token: ', currentToken)
        if (currentToken) {
          this.token = currentToken
          saveToken(this.user, this.token)
          // sendTokenToServer(currentToken);
          // updateUIForPushEnabled(currentToken);
        } else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.')
          // Show permission UI.
          // updateUIForPushPermissionRequired();
          // setTokenSentToServer(false);
        }
      })
    }
  },
  apollo: {
    route: {
      query: gql`query route($id: Int!) {
        route(id: $id) {
          id
          title
          info
          imageUrl
          traveller
          center {lat lng}
          visits {
            id seq commute date start end title info url 
            position {lat lng}
          }
        }
      }`,
      variables () {
        return {
          id: this.$route.params.id
        }
      }
    }
  }
}

const saveToken = (id, token) => {
  localStorage.setItem('token', token)
  firebase.database().ref('tokens/' + id).set({
    token: token
  })
  .then(() => {
    console.log('Synchronization succeeded')
  })
  .catch((error) => {
    console.log('Synchronization failed', error)
  })
}

const deleteToken = (id) => {
  firebase.database().ref('tokens/' + id).remove()
  .then(() => {
    console.log('Synchronization succeeded')
  })
  .catch((error) => {
    console.log('Synchronization failed', error)
  })
}

const unregisterToken = (token) => {
  return messaging.deleteToken(token)
}

const registerNotification = () => {
  return requestPermission()
}

const requestPermission = () => {
  return navigator.serviceWorker.register('/static/firebase-messaging-sw.js')
  .then((registration) => {
    messaging.useServiceWorker(registration)
    return messaging.requestPermission()
    .then(() => {
      console.log('Notification permission granted.')
      return messaging.getToken()
      .catch(function (err) {
        console.log('An error occurred while retrieving token. ', err)
        // showToken('Error retrieving Instance ID token. ', err)
        // setTokenSentToServer(false)
      })
    })
    .catch(function (err) {
      console.log('Unable to get permission to notify.', err)
    })
  })
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
