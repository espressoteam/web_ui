<template>
  <div>
      <v-layout row>
        <v-flex xs8 class="mb-2">
          <v-text-field name="info" label="Info" multi-line rows="2" v-model="visit.info">
          </v-text-field>
          <v-dialog
          persistent
          v-model="date_modal">
          <v-text-field
            slot="activator"
            label="Visit date"
            v-model="visit.date"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="visit.date">
            <template scope="{ save, cancel }">
              <v-card-row actions>
                <v-btn flat primary @click.native="clear()">Clear</v-btn>
                <v-btn flat primary @click.native="date_modal = false">Cancel</v-btn>
              </v-card-row>
            </template>
          </v-date-picker>
        </v-dialog>
        </v-flex>
      </v-layout>
      
  </div>
</template>
<script>
export default {
  props: ['visit'],
  data () {
    return {
      date_modal: false
    }
  },
  methods: {
    clear () {
      this.visit.date = null
      this.date_modal = false
    }
  }
}
</script>
<style scoped>
.front {
  z-index: 6;
}
</style>
