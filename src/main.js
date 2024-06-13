
// Components

import App from './App.vue';

// Composables
import { createApp } from 'vue';
import { sudoku } from '@/api/sudoku.js';

// Plugins
import { registerPlugins } from '@/plugins';
import { createStore } from 'vuex';

// Create a new store instance.
const store = createStore({
  state: {
    grid: null,
    origString:null,
    difficulty:'easy',
    selected:null,
    count:0,
    gameCompleted:false,

    timer: 0,
    playerScores: {
      "player": 0,
    },
    stompClient: null,
    roomId: "asd",
  },
  mutations: {
    initGrid(state) {
      state.origString = sudoku.generate(state.difficulty);
      let candidates = sudoku.get_candidates(state.origString);
      state.grid = sudoku.board_string_to_grid(state.origString);

      let solution = sudoku.solve(state.origString);
      let solvedGrid = sudoku.board_string_to_grid(solution);

      // change . to "", also store a ob instead of just numbers
      for (let i = 0; i < state.grid.length; i++) {
        for (let x = 0; x < state.grid[i].length; x++) {
          let newVal = {
            value: parseInt(state.grid[i][x], 10),
            locked: true,
            candidates: candidates[i][x],
            selected: false,
            solution: parseInt(solvedGrid[i][x], 10),
            completed: false,
            given: false
          };
          if (state.grid[i][x] === '.') {
            newVal.value = '';
            newVal.locked = false;
          }
          state.grid[i][x] = newVal;
        }
      }

      // mark given squares as grey
      for (let col = 0; col < 9; col++) {
        for (let row = 0; row < 9; row++) {
          if (state.grid[col] && state.grid[col][row]) {
            state.grid[col][row].given = (state.grid[col][row].value === state.grid[col][row].solution);
          }
        }
      }
    },
    setNumber(state, x) {
      if (!state.selected) return;
      let row = state.grid[state.selected.x];
      row[state.selected.y].value = x;
      this.state.grid[state.selected.x] = row;
    },
    setSelected(state, pos) {
      if (state.grid[pos.x][pos.y].locked) return;
      for (let i = 0; i < state.grid.length; i++) {
        let row = state.grid[i];
        for (let x = 0; x < row.length; x++) {
          if ((i !== pos.x || x !== pos.y) && row[x].selected) {
            row[x].selected = false;
          }
          if (i === pos.x && x === pos.y) {
            row[x].selected = true;
            state.selected = pos;
          }
        }
        this.state.grid[i] = row;
      }
    },
    setGameCompleted(state, isCompleted) {
      state.gameCompleted = isCompleted;
    }
  }
});

const app = createApp(App);

app.use(store);

registerPlugins(app);

app.mount('#app');
