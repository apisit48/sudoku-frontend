<template>
  <div class="sections">
    <div class="leftSection">
      <table class="sideSudoku">
        <tbody>
        <tr class="sideTr" v-for="(row, idx) in grid" :key="idx">
          <td class="sideTd" v-for="(cell, idy) in row" :key="idy"
              :class="{
                locked: grid[idx][idy].locked,
                selected: grid[idx][idy].selected,
                completed: grid[idx][idy].completed,
                given: grid[idx][idy].given,
                multiplayerCompleted: grid[idx][idy].multiplayerCompleted
              }">
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="middleSection">
      <div class="timerContainer">
        <div class="timer">
          <div class="timerTxt">
            {{ this.$store.state.timer }}
          </div>
        </div>
      </div>

      <table class="sudoku">
        <tbody>
        <tr v-for="(row,idx) in grid" :key="idx">
          <td class="sudokuCell" v-for="(cell,idy) in row" :key="idy"
              :class="{
                locked: grid[idx][idy].locked,
                selected: grid[idx][idy].selected
              }"
              @click="setSelected(grid[idx][idy], idx, idy)"> {{ grid[idx][idy].value }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="rightSection">
      <div class="rankingsContainer">
        <div class="scoresTxt">
          Scores
        </div>
        <table>
          <tbody class="rankingsBoard">
          <tr class="rankingItem" v-for="(score, player, rank) in this.$store.state.playerScores" :key="player">
            <span class="rankNumber">{{ rank+1 + ". "}}</span>
            <span class="rankName">{{ player + " " }}</span>
            <span class="rankScore">{{ this.$store.state.timer}}</span>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div id="winContainer" class="winContainer playing">
    <div class="winTxt">
      You Win!
    </div>
    <div class="winScoreTxt">
      Final score: {{ this.$store.state.timer }}
    </div>
    <v-card-actions class="justify-center">
      <button class="custom-button" @click="redirectToHome">
        <router-link to="/">Back To Home</router-link>
      </button>
    </v-card-actions>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Sockjs from 'sockjs-client/dist/sockjs';
import { over } from 'stompjs';
import {useWebSocketStore} from "@/websocket/websocket";
import router from "@/router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Grid',
  computed: mapState([
    'grid'
  ]),
  methods: {
    timer() {
      this.$store.state.timer += 1;
      if(!this.$store.state.gameCompleted) {
        setTimeout(this.timer, 1000);
      }
    },
    pickNumber(e) {
      if (this.$store.state.gameCompleted) return;
      let typed = parseInt(String.fromCharCode(e.keyCode),10);
      if(!typed) return;
      this.$store.commit('setNumber', typed);

      const selectedCell = this.grid.find(row => row.some(cell => cell.selected));
      if (selectedCell) {
        const r = this.grid.indexOf(selectedCell);
        const c = selectedCell.findIndex(cell => cell.selected);
        this.checkCompletions([r, c]);
      }
    },
    setSelected(cell,x,y) {
      if (this.$store.state.gameCompleted) return;
      this.$store.commit('setSelected',{x,y});
    },
    gameWon() {
      document.getElementById("winContainer").style.display = "flex";
      this.$store.state.gameCompleted = true;
    },
    checkFullCompletion() {
      const grid = this.$store.state.grid;
      for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
          if(!grid[i][j].completed && !grid[i][j].given) {
            console.log(i + " " + j);
            return;
          }
        }
      }
      this.gameWon();
    },
    // Check completion functions
    checkCompletions(idxs) {
      const checkFunctions = [
        this.checkSubSquareCompletion,
        this.checkVerticalCompletion,
        this.checkHorizontalCompletion
      ];

      let res = null;
      for(let i = 0; i < checkFunctions.length; i++) {
        res = checkFunctions[i](idxs);
        if(res < 0) continue;
        this.$store.state.playerScores.player += 100;
        //this.$store.state.stompClient.send('/app/game/complete', {}, res);
      }
      this.checkFullCompletion();
    },
    checkSubSquareCompletion(idxs) {
      const r = idxs[0];
      const c = idxs[1];

      const startRow = (Math.floor(r / 3) * 3);
      const startCol = (Math.floor(c / 3) * 3);

      // Check sub-square completions
      let completedCells = 0;
      for (let row = startRow; row < startRow + 3; row++) {
        for (let col = startCol; col < startCol + 3; col++) {
          if (this.grid[row] && this.grid[row][col] && this.grid[row][col].value === this.grid[row][col].solution) {
            completedCells++;
          }
        }
      }

      // Return if sub-square not complete
      if(completedCells !== 9) {
        return -1;
      }

      this.$store.state.completedSquares += 1;
      // Set sub-square cells to completed
      for (let row = startRow; row < startRow + 3; row++) {
        for (let col = startCol; col < startCol + 3; col++) {
          this.$store.state.grid[row][col].completed = true;
          this.$store.state.grid[row][col].locked = true;
          this.$store.state.grid[row][col].selected = false;
        }
      }

      return JSON.stringify({'messageType': 'COMPLETION', 'roomId': this.$store.state.roomId, 'completionType': 'square', 'completionRow': idxs[0], 'completionCol': idxs[1]});
    },
    checkVerticalCompletion(idxs) {
      const c = idxs[1];

      // Check vertical line completions
      let completedCells = 0;
      for (let row = 0; row < 9; row++) {
        if (this.grid[row] && this.grid[row][c] && this.grid[row][c].value === this.grid[row][c].solution) {
          completedCells++;
        }
      }

      // Return if vertical line not complete
      if(completedCells !== 9) {
        return -1;
      }

      for (let row = 0; row < 9; row++) {
        if (this.grid[row] && this.grid[row][c]) {
          this.$store.state.grid[row][c].completed = (this.grid[row][c].value === this.grid[row][c].solution);
          this.$store.state.grid[row][c].locked = true;
          this.$store.state.grid[row][c].selected = false;
        }
      }

      return JSON.stringify({'messageType': 'COMPLETION', 'roomId': this.$store.state.roomId, 'completionType': 'vertical-line', 'completionRow': idxs[0], 'completionCol': idxs[1]});
    },
    checkHorizontalCompletion(idxs) {
      const r = idxs[0];
      // Check horizontal line completions
      let completedCells = 0;
      for (let col = 0; col < 9; col++) {
        if (this.grid[r] && this.grid[r][col] && this.grid[r][col].value === this.grid[r][col].solution) {
          completedCells++;
        }
      }

      // Return if horizontal line not complete
      if(completedCells !== 9) {
        return -1;
      }

      for (let col = 0; col < 9; col++) {
        if (this.grid[r] && this.grid[r][col]) {
          this.$store.state.grid[r][col].completed = (this.grid[r][col].value === this.grid[r][col].solution);
          this.$store.state.grid[r][col].locked = true;
          this.$store.state.grid[r][col].selected = false;
        }
      }

      return JSON.stringify({'messageType': 'COMPLETION', 'roomId': this.$store.state.roomId, 'completionType': 'horizontal-line', 'completionRow': idxs[0], 'completionCol': idxs[1]});
    },
    mutliplayerCheckCompletion(type, r, c) {
      const startRow = (Math.floor(r / 3) * 3);
      const startCol = (Math.floor(c / 3) * 3);

      switch (type) {
        case "square":
          for (let row = startRow; row < startRow + 3; row++) {
            for (let col = startCol; col < startCol + 3; col++) {
              this.$store.state.grid[row][col].multiplayerCompleted = true;
            }
          }
          break;
        case "vertical-line":
          for (let row = 0; row < 9; row++) {
            if (this.grid[row] && this.grid[row][c]) {
              this.$store.state.grid[row][c].multiplayerCompleted = true;
            }
          }
          break;
        case "horizontal-line":
          for (let col = 0; col < 9; col++) {
            if (this.grid[r] && this.grid[r][col]) {
              this.$store.state.grid[r][col].multiplayerCompleted = true;
            }
          }
          break;
        default:
          break;
      }
    },

    // Websocket Methods
    connectToBackend: function () {
      //let Sock = new Sockjs('http://localhost:8080/sdk');
      //this.$store.state.stompClient=over(Sock);
      //this.$store.state.stompClient.connect({}, this.onConnected, this.onError);
      const store = useWebSocketStore();
      this.$store.state.stompClient = store;
      //this.$store.state.stompClient.send('/game/start', 'new');
      //this.$store.state.stompClient.send('/room/'+this.$store.state.roomId, JSON.stringify({'messageType': 'BOARD', 'roomId': this.$store.state.roomId, 'boardString': this.$store.state.origString}));
    },
    onError: function(err) {
      console.log(err);
    },
    onMessageReceived: function (payload) {
      if(payload.body) {
        let payloadData = JSON.parse(payload.body);
        console.log(payloadData.messageType);
        switch(payloadData.messageType) {
          case "BOARD":
            console.log("Board string: " + payloadData.boardString);
            break;
          case "COMPLETION":
            console.log("Type, index: ", payloadData.completionType, payloadData.completionRow, payloadData.completionCol);
            break;
          default:

        }
      }
    },
    onBoardMessageReceived: function (payload) {
      console.log(payload);
    },
  },
  mounted() {
    this.$store.commit('initGrid');
    window.addEventListener('keypress', this.pickNumber);
    this.connectToBackend();
    setTimeout(this.timer, 1000);
  },
  unmounted() {
    window.removeEventListener('keypress', this.pickNumber);
    this.$store.state.timer = 0;
    this.$store.state.gameCompleted = false;
    this.$store.state.playerScores.player = 0;
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.winContainer {
  position:absolute;
  width: 60%;
  height: 20%;
  top: 300px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ghostwhite;
  border-radius: 40px;
  border: 4px solid #88dbff;
  display: none;
  flex-direction: column;
  justify-content: center;
}

.winTxt {
  align-self: center;
  font-size: 40px;
  font-weight: 600;
}

.winScoreTxt {
  align-self: center;
  font-size: 20px;
}

.rankingsContainer {
  min-width: 100%;
  height: 100%;
  background-color: rgba(211, 211, 211, 0.5);
  border-radius: 10px;
  padding: 10px;
  margin-top: 80px;
}

table {
  width: 100%;
}

.rankingsBoard {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.rankingItem {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: rgba(40, 160, 255, 0.2);
  border-radius: 5px;
}

.rankNumber {
  font-size: 18px;
  font-weight: 500;
  margin-left: 15px;
  width: 30px;
}
.rankName {
  font-size: 18px;
  margin: 0 15px 0 15px;
  flex-grow: 1;
}
.rankScore {
  font-size: 18px;
  font-weight: 500;
  margin-right: 15px;
}

.scoresTxt {
  font-size: 22px;
  text-align: center;
  font-weight: 800;
  margin-bottom: 10px;
}

.timerContainer {
  display: flex;
  justify-content: center;
}
.timerTxt {
  font-size: 32px;
}

.sections {
  display: flex;
  justify-content: space-evenly;
  margin-top: 35px;
}
.leftSection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
}
.middleSection {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.rightSection {
  display: flex;
  flex-direction: column;
  width: 20%;
}

.rankingItem:nth-child(2n) {
  background-color: rgba(40, 160, 255, 0.2);
}

.rankingItem:first-child {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.rankingItem:last-child {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

/*
 Center sudoku board
 */
.sudoku {
  border-collapse: collapse;
  border: 3px solid;
}

td {
  border: 1px solid;
  text-align: center;
  width: 50px;
  height: 50px;
}

.sudoku tbody tr .sudokuCell:nth-child(3), .sudoku tbody tr .sudokuCell:nth-child(6) {
  border-right: 3px solid;
}

.sudoku tbody tr:nth-child(3), .sudoku tbody tr:nth-child(6) {
  border-bottom: 3px solid;
}

.sudokuCell.locked {
  cursor: context-menu;
  background-color: rgba(0,0,0,0.1);
}

.sudokuCell {
  cursor: pointer;
}

.sudokuCell.selected {
  background-color: rgba(255, 224, 188, 0.7);
}

.sudokuCell:not(.locked):hover {
  background-color: rgba(255, 224, 188, 0.7);
}
.sudokuCell:not(.locked):active {
  background-color: rgba(255, 224, 188, 1);
}

/*
 Side sudoku board
 */
.sideSudoku {
  border-collapse: collapse;
  border: 3px solid;
  margin-top: 80px;
}

.sideTd {
  border: 1px solid;
  text-align: center;
  height: 2vw;
  width: 2vw;
}

.sideSudoku tbody tr td:nth-child(3), .sideSudoku tbody tr td:nth-child(6) {
  border-right: 3px solid;
}

.sideSudoku tbody tr:nth-child(3), .sideSudoku tbody tr:nth-child(6) {
  border-bottom: 3px solid;
}

.sideTd.given {
  background-color: rgba(211, 211, 211, 1);
}

.sideTd.completed {
  background-color: rgba(0, 255, 0, 0.5);
}

.sideTd.multiplayerCompleted {
  background-color: rgba(255, 0, 0, 0.5);
}

/*
win message styling
 */
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

</style>
