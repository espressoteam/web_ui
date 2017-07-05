<template>
  <v-app id='layout'>
    <v-navigation-drawer temporary light :mini-variant.sync='mini' v-model='drawer'>
      <v-list class='pa-0'>
        <v-list-item>
          <v-list-tile tag='div'>
            <v-list-tile-content>
              <v-list-tile-title><img width='32' height='32' src='/static/img/icons/logo.png' /> ROUTE64</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop='mini = !mini'>
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
      </v-list>
      <v-list class='pt-0' dense>
        <v-divider></v-divider>
        <v-list-item v-for='item in items' :key='item'>
          <v-list-tile @click.native='$router.push({name: item.name})'>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class='transparent elevation-0' light>
      <v-toolbar-side-icon light @click.native.stop='drawer = !drawer'></v-toolbar-side-icon>
      <v-toolbar-title style='cursor: pointer;' @click="$router.push({name:'home'})">
        <img width='32' height='32' src='/static/img/icons/logo-white.png' /> ROUTE64
      </v-toolbar-title>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
    <v-snackbar
      :multi-line="true"
      :timeout="10000"
      :top="true"
      v-model="snackbar"
    >
        <span>
          <strong>{{ messageTitle }}</strong><br/>
          {{messageBody}} <a href="">view</a>
        </span>
        <v-spacer></v-spacer>
      <v-btn flat class="pink--text" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import firebase from './services/firebase'
const messaging = firebase.messaging()

export default {
  name: 'app',
  data () {
    return {
      snackbar: false,
      messageTitle: '',
      messageBody: '',
      drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard', name: 'home' },
        { title: 'My routes', icon: 'question_answer', name: 'my-route' }
      ],
      mini: false,
      right: null
    }
  },
  created () {
    console.log('Register on message event')
    messaging.onMessage((payload) => {
      console.log('Message received. ', payload)
      this.messageTitle = payload.data.title || 'got message'
      this.messageBody = payload.data.body || 'got message'
      this.snackbar = true
    })
  },
  methods: {
    hideMenu: function () {
      document.getElementsByClassName('mdl-layout__drawer')[0].classList.remove('is-visible')
      document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible')
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
@import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');

#layout {
  background: url('/static/img/background.jpg') center / cover;
  height: 100%;
}

.head1 {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 0;
    margin: 0;
}

.input input, .input textarea {
  color: white !important;
  font-size: larger !important;
  background: rgba(0, 0, 0, 0.5);
}
</style>
