<template>
<div class="mdl-card mdl-shadow--2dp">
  <div class="mdl-card__supporting-text">
    <p>{{ route.info }}</p>
    <p>{{ route.comment }}</p>
  </div>
  <div class="mdl-card__media">
    <gmap-map
    :center="route.center"
    :zoom="8"
    style="width: 100%; height: 250px;">
    <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" :content="infoContent" @closeclick="infoWinOpen=false"></gmap-info-window>
    <gmap-marker
      :key="index"
      v-for="(m, index) in route.visits"
      :position="m.position"
      :clickable="true"
      :label="'' + m.seq"
      @click="toggleInfoWindow(m,index)"></gmap-marker>
  </gmap-map>
  </div>
</div>
</template>
<script>
export default {
  name: 'route-map-card',
  props: ['route'],
  methods: {
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.position
      this.infoContent = marker.title
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    }
  },
  data () {
    return {
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }
  }
}
</script>
<style scoped>
  .image-card {
    position: relative;
    margin-bottom: 8px;
    cursor: pointer;
  }
  .image-card__picture > img {
    width:100%;
  }
  .image-card__comment {
    position: absolute;
    bottom: 0;
    height: 52px;
    padding: 16px;
    text-align: right;
    background: rgba(0, 0, 0, 0.5);
  }
  .image-card__comment > span {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
</style>
