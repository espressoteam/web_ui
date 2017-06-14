<template>
<div class="mdl-card">
  <div class="mdl-card__supporting-text head">
    <span></span>
  </div>
  <div class="mdl-card__media" 
  :style="{backgroundImage:'url('+ visit.url +')'}">
    <h4 class='media-text'>{{visit.seq}} {{visit.title}}</h4>
  </div>
  <div class="mdl-card__supporting-text">
    <p><b>Visited duration:</b> {{visit.end - visit.start}} hour(s)</p>
    <p>{{visit.info}}</p>
  </div>
  <div class="mdl-card__actions mdl-card--border">
    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Detail</a>
    <a v-if="visit.commute === 'train'" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"><i class="material-icons">train</i></a>
    <a v-if="visit.commute === 'bus'" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"><i class="material-icons">directions_bus</i></a>
    <a v-if="visit.commute === 'car'" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"><i class="material-icons">directions_car</i></a>
  </div>
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
.mdl-card__supporting-text.head {
  padding: 5px;
}
.media-text {
  color: white;
  background: rgba(0, 0, 0, 0.5);
}
</style>
