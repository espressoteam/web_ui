// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'

import Config from './configs/appconfig'

Vue.use(VueResource)
Vue.http.options.root = Config.API_URL

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCsFfYE1rLKHx9aTeauPnG7-gSFB3nT6PY'
  }
})

import RouteCard from './components/RouteCard'
Vue.component('route-card', RouteCard)

import VisitCard from './components/VisitCard'
Vue.component('visit-card', VisitCard)

import RouteMapCard from './components/RouteMapCard'
Vue.component('route-map-card', RouteMapCard)

import Vuetify from 'vuetify'
Vue.use(Vuetify)

import VueFire from 'vuefire'
Vue.use(VueFire)

import { ApolloClient, createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'
// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:4000/graphql',
    transportBatching: true
  }),
  connectToDevTools: true
})

// Install the vue plugin
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  template: '<App/>',
  components: { App }
})
