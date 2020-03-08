<template>
  <div class="home">
    <RouletteDemo></RouletteDemo>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RouletteDemo from "@/components/RouletteDemo.vue";

@Component({
  components: {
    RouletteDemo
  }
})
export default class Home extends Vue {}
</script>
