<template>
  <div class="gameBoard">
    <h5>Game board</h5>
    <div>
      <transition name="fade" v-for="(slot, index) in gameConfiguration.results" :key="index">
        <button type="button" class="btn-temp col-xs-1 btn"
          v-if="result != index"
          :class="'btn-' + gameConfiguration.colors[index]"
        >
          {{ gameConfiguration.results[index] }}
        </button>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class GameBoard extends Vue {
  get gameConfiguration() {
    return this.$store.getters.gameConfiguration;
  }

  get result() {
    return this.$store.getters.gameResult;
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
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    transition: opacity 1s;
  }
  .fade-leave {
    /* opacity: 1; */
  }
  .fade-leave-active {
    transition: opacity 1s;
    opacity: 0;
  }
</style>
