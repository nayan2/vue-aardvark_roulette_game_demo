<template>
  <div class="gameStats">
    <h5>Stats (last 200)</h5>
    <table class="table">
      <tbody>
        <tr>
          <td>&nbsp;</td>
          <th colspan="5" class="cold">Cold</th>
          <th :colspan="gameStats.stats.length > 0 ? gameStats.stats.length - 10 : 0" class="neutral">
            Neutral
          </th>
          <th colspan="5" class="hot">Hot</th>
        </tr>
        <tr>
          <th>Slot</th>
          <td v-for="(stat, index) in gameStats.stats" :key="index" :class="'btn-' + gameStats.gameConfiguration.colors[index]">
            {{ gameStats.gameConfiguration.results[index] }}
          </td>
        </tr>
        <tr>
          <th>Hits</th>
          <td v-for="(stat, index) in gameStats.stats" :key="index"
            :class="{ cold: index < 5, hot: (index >= (gameStats.stats.length - 5)), neutral: (index >= 5 && (index < (gameStats.stats.length - 5)))}"
          >
            {{ stat.count }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class GameStats extends Vue {
  get gameStats() {
    return this.$store.getters.state;
  }
}
</script>

<style scoped>
.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  width: 45px;
}
.btn-black {
  color: #fff;
  background-color: #000000;
  border-color: #222222;
}
.btn-red {
  color: #fff;
  background-color: #d9534f;
  border-color: #ac2925;
}
.btn-green {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.cold {
  background-color: #d9edf7;
}
.hot {
  background-color: #f2dede;
}
</style>
