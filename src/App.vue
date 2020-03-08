<template>
  <div id="app" class="container mt-3">
    <h2>Aardvark Roulette game API demo</h2>
    <form>
      <div class="form-group">
        <label for="baseUrl">API base URL</label>
        <input
          type="text"
          class="form-control"
          id="baseUrl"
          placeholder="Base URL"
          readonly
          :value="url"
        />
      </div>
    </form>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export default class App extends Vue {
  url = process.env.VUE_APP_ENDPOINTURL
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
  line-height: 1.42857143;
  color: #333;
  background-color: #fff;
}
</style>
