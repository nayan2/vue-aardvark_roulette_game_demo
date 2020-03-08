<template>
  <div class="c-loader" v-if="state">
    <atom-spinner :animation-duration="1000" :size="60" :color="'#14a765'" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AtomSpinner } from "epic-spinners";

@Component({
  components: {
    AtomSpinner
  }
})
export default class Loader extends Vue {
  constructor() {
		super();
  }

  get state() {
    return this.$store.getters.spinnerState;
  }
}
</script>

<style scoped>
.c-loader {
  padding-left: 42%;
  position: fixed;
  z-index:999;
  bottom: 24vh;
  left: -8%;
  bottom: 46%;
}
</style>