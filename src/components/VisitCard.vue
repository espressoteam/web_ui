<template>
<div>
<v-card :img="visit.url">
  <v-card-row class="tran1">
    <v-card-title>
      <span class="white--text">{{visit.seq}} {{visit.title}}</span>
      <v-spacer></v-spacer>
      <v-menu offset-x bottom left origin="top right" transition="v-scale-transition">
        <v-btn icon="icon" slot="activator" class="white--text">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-item>
            <v-list-tile>
              <v-list-tile-title>Remove Card</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
          <v-list-item>
            <v-list-tile>
              <v-list-tile-title>Send Feedback</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
  </v-card-row>
  <v-card-text class="tran2">
    <div class="v-text">
      <p><b>Visited duration:</b> {{visit.end - visit.start}} hour(s)</p>
      {{visit.info}}
    </div>
  </v-card-text>
  <v-card-row actions class="tran1 mt-0">
    <v-btn flat class="white--text">Detail</v-btn>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon v-if="visit.commute === 'train'" class="white--text">train</v-icon>
      <v-icon v-if="visit.commute === 'bus'" class="white--text">directions_bus</v-icon>
      <v-icon v-if="visit.commute === 'car'" class="white--text">directions_car</v-icon>
    </v-btn>
  </v-card-row>
</v-card>
</div>
</template>
<script>
export default {
  name: 'visit-card',
  props: ['visit'],
  methods: {
  }
}
</script>
<style scoped>
.tran1 {
  color: white;
  background: rgba(0, 0, 0, 0.7);
}

.tran2 {
  color: white;
  background: rgba(0, 0, 0, 0.5);
}
</style>
