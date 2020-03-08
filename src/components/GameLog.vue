<template>
  <div class="gameLog">
    <h5>Log</h5>
    <pre>
{{log}}
    </pre>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class GameLog extends Vue {
  get log() {
    return this.$store.getters.gameLog;
  }
}
</script>

<style scoped>
pre {
    display: block;
    padding: 9.5px;
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #333;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow-y: scroll;
    max-height: 60vh;
}
</style>
