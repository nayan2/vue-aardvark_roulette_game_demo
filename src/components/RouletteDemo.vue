<template>
  <div class="roulettedemo">
    <div class="row">
      <div class="col-md-12">
        <app-game-stats></app-game-stats>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <app-game-board></app-game-board>
        <app-loader></app-loader>
        <app-game-events></app-game-events>
      </div>
      <div class="col">
        <app-game-log></app-game-log>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GameStats from "@/components/GameStats.vue";
import GameBoard from "@/components/GameBoard.vue";
import GameEvents from "@/components/GameEvents.vue";
import GameLog from "@/components/GameLog.vue";
import { GameResource } from "@/utility/resource/gameResource/gameResource";
import { GlobalConfig } from "@/utility/configuration/gameConfig";

@Component({
  components: {
    "app-game-stats": GameStats,
    "app-game-board": GameBoard,
    "app-game-events": GameEvents,
    "app-game-log": GameLog
  }
})
export default class RouletteDemo extends Vue {
  resource: any;

  constructor() {
    super();
    this.resource = this.$resource("", {}, GameResource);
  }

  created() {
    this.$store.commit("addGameLocalLog", "Loading game board");
    this.loadGameConfiguration();
    this.loadNewGame();
  }

  loadGameConfiguration = (): void => {
    this.resource
      .getConfiguration()
      .then((response: any) => {
        return response.json();
      })
      .then((res: any) => {
        this.$store.commit("setGameConfiguration", res);
      });
  };

  loadNewGame = (): void => {
    this.$store.commit("addGameLocalLog", "Checking for new game");
    if (!GlobalConfig.initCall) this.updateStats();

    this.resource
      .getNextGame()
      .then((response: any) => {
        return response.json();
      })
      .then(
        (res: any) => {
          if (GlobalConfig.initCall) {
            this.updateStats();
            GlobalConfig.initCall = false;
          }

          if (res.fakeStartDelta <= 0) {
            this.loadGameResult(res.id);
            return;
          }

          this.$store.commit(
            "addGameLocalLog",
            `sleeping for fakeStartDelta ${res.fakeStartDelta} sec`
          );
          let fakeStartDeltaEvent = {
            message: `Game ${res.id} will start in ${res.fakeStartDelta} sec`,
            isTemp: false,
            updateTimeOfUI: true
          };

          this.$store.commit("addGameEvent", fakeStartDeltaEvent);
          let timerId = setInterval(() => {
            let nextTime = res.fakeStartDelta--;
            if (nextTime > 0) {
              fakeStartDeltaEvent.message = `Game ${res.id} will start in ${nextTime} sec`;
              return;
            }
            clearInterval(timerId);
            fakeStartDeltaEvent.isTemp = true;
            this.loadGameResult(res.id);
          }, 1000);
        },
        (err: any) => {
          this.$store.commit(
            "addGameLocalLog",
            `Error, sleeping for ${GlobalConfig.retry_timer} and retrying`
          );
          setTimeout(() => {
            this.loadNewGame();
          }, GlobalConfig.retry_timer);
        }
      );
  };

  loadGameResult = (gameId: number): void => {
    let wheelSpinningEvent = {
      message: `Game ${gameId}, the wheel is spinning`,
      isTemp: false,
      updateTimeOfUI: false
    };

    this.$store.commit("addGameEvent", wheelSpinningEvent);
    this.resource
      .getGame({ gameId: gameId })
      .then((response: any) => {
        return response.json();
      })
      .then(
        (res: any) => {
          if (!res.result) {
            this.$store.commit('toggelSpinner');
            this.$store.commit(
              "addGameLocalLog",
              "Still no result continue spinning"
            );
            setTimeout(() => {
              this.$store.commit('toggelSpinner');
              wheelSpinningEvent.isTemp = true;
              this.loadGameResult(gameId);
            }, GlobalConfig.retry_timer);
          } else {
            wheelSpinningEvent.isTemp = true;
            this.$store.commit("addGameLocalLog", `Result is ${ res.result }`);
            this.$store.commit("setGameResult", res.result);

            let timerId = setInterval(() => {
              this.$store.commit("decrementNumberOfAnimation");
              if (this.numberOfAnimations >= 0) {

                this.$store.commit("setGameResult", 
                  this.gameResult == res.result
                    ? this.$store.commit("resetGameResult")
                    : this.$store.commit("setGameResult", res.result)
                );
                return;
              }
              clearInterval(timerId);
              this.$store.commit("resetNumberOfAnimation");
            }, 1000);

            this.$store.commit("addGameEvent", {
              message: `Game ${gameId} ended, result is ${res.result}`,
              isTemp: false,
              updateTimeOfUI: false
            });
            this.loadNewGame();
          }
        },
        (err: any) => {
          this.$store.commit(
            "addGameLocalLog",
            "Error getting results continue spinning"
          );
          setTimeout(() => {
            wheelSpinningEvent.isTemp = true;
            this.loadGameResult(gameId);
          }, GlobalConfig.retry_timer);
        }
      );
  };

  get numberOfAnimations() {
    return this.$store.getters.numberOfAnimations;
  }

  get gameResult() {
    return this.$store.getters.gameResult;
  }

  updateStats = (): void => {
    this.resource
      .getCurrentStats({ limit: 200 })
      .then((response: any) => {
        return response.json();
      })
      .then((res: any) => {
        this.$store.commit("setgameStats", res);
      });
  };
}
</script>

<style scoped></style>
