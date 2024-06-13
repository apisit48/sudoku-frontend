<template>
  <v-container>
    <v-row align="center" justify="center" class="my-12">
      <v-col cols="40" md="30" lg="40">
        <v-card class="elevation-24">
          <v-card-item class="center-content">
            <img src="https://cdn-icons-png.flaticon.com/128/5732/5732078.png" :style="{ width: '100%', height: '100%' }" alt="Sudoku Showdown Logo">
          </v-card-item>
          <v-card-title class="text-h3" style="line-height: 1; max-width: 100%;">
            <div class="text-center">
              Welcome To Sudoku Showdown!
            </div>
          </v-card-title>
          <v-card-text>
            <div class="text-center">
              <div class="info">
                <span class="text-h6">Meet The Team:</span>
              </div>
              <p class="team-member">Alexandre Simon 6380359</p>
              <p class="team-member">Josh Perry 6380132</p>
              <p class="team-member">Pattapon Songpetchmongkol 6380830</p>
              <p class="team-member">Apisit Bawornsutthimontri 6180622</p>
              <p class="team-member">Pornsun Srisuhk 6180230</p>
              <p class="team-member">Geon Kim 6180019</p>
            </div>
            <div class="text-center">
              <div class="info">
                <span class="text-h6">Click Play to begin.</span>
              </div>
              
            </div>
          </v-card-text>
          <v-card-actions class="justify-center">
            <button class="custom-button" @click="redirectToPlay">Play</button>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row align="center" justify="center" class="my-12">
      <v-col cols="40" md="30" lg="40">
        <v-card class="elevation-24">
          <v-card-item class="center-content">
            <img src="https://cdn-icons-png.flaticon.com/256/5021/5021877.png" :style="{ width: '100%', height: '100%' }" alt="Sudoku Showdown Logo">
          </v-card-item>
          <v-card-title class="text-h3" style="line-height: 1; max-width: 100%;">
            <div class="text-center">
              Who's on TOP in Sudoku Showdown?
            </div>
          </v-card-title>
          <v-card-text>
            <div class="text-center">
              <div class="info">
                <span class="text-h6">Meet The Winners!:</span>
              </div>
              <v-virtual-scroll
                :items="scoreboard"
                :suvtitles="rank"
                height="200"
                class=" text-center"
              >
              <template v-slot:default="{ item }">
                {{ item.username }}
              </template>
                </v-virtual-scroll>
            </div>
            <div class="text-center">
              <div class="info">
                <span class="text-h6">Click to See the Leaderboard.</span>
              </div>
              
            </div>
          </v-card-text>
          <v-card-actions class="justify-center">
            <button class="custom-button" @click="redirectToLeader">Leaderboard</button>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  methods: {
    redirectToPlay() {
      router.push({ name: 'Play' });
    },
    redirectToLeader() {
      router.push({ path: 'leaderboard' });
    },
    ranking() {
        axios
          .get("/api/ranking")
          .then((response) => {
            this.scoreboard = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      }
  },
  data () {
      return {
        scoreboard: [],
      }
    },
    created() {
      this.ranking();
    }
}
</script>

<style scoped>
.center-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-button {
  background-color: #ccf0ff;
  color: #000;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.custom-button:hover {
  background-color: lightblue;
}

.team-member {
  margin: 5px 0;
}

.info {
  margin-top: 30px;
}
</style>
