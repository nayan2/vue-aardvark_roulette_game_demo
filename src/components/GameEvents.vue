<template>
  <div class="gameEvents">
    <h5>Events</h5>
    <ul class="list-group col-md-12">
      <template v-for="(event, index) in events">
            <li v-if="!event.isTemp" :key="index" class="list-group-item">{{event.message}}</li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class GameEvents extends Vue {
  get events() {
    return this.$store.getters.events;
  }
}
</script>

<style scoped>
.list-group {
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.075);
    box-shadow: 0 1px 2px rgba(0,0,0,.075);
    overflow-y: scroll;
    max-height: 42vh;
}
</style>
