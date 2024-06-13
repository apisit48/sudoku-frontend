<template>
  <v-container class="background fill-height">
    <v-responsive>
      <v-row justify="center">
        <v-sheet class="card mx-2" elevation="4" value="rounded=xl" width="450" height="500">
          <div class="card-contents">
            <h1 class="card-text">Create Game</h1>
            <p class="mt-2">Name</p>
            <v-responsive
              max-width="380"
            >
              <v-text-field
                v-model="roomName"
                :items="roomName"
                type="input"
                density="compact"
                variant = "outlined"
              ></v-text-field>
            </v-responsive>
            <v-select
              v-model="selectedDifficulty"
              :items="difficulty"
              density="compact"
              label="Difficulty"
              variant="outlined"
            ></v-select>
            <v-select
              v-model="selectedSize"
              :items="size"
              density="compact"
              label="Size"
              variant="outlined"
            ></v-select>
            <p class="mt-n2">Password (Optional)</p>
            <v-responsive
              max-width="380"
            >
              <v-text-field
                v-model="password"
                type="input"
                density="compact"
                variant = "outlined"
              ></v-text-field>
            </v-responsive>
            <v-btn
              width="380"
              color="primary"
              variant="elevated"
              @click="createGame"
            >
              Create
            </v-btn>
          </div>

        </v-sheet>
        <v-sheet class="card mx-2" elevation="4" value="rounded=xl" width="450" height="500">
          <div class="card-contents">
            <h1 class="card-text mb-3">Join Game</h1>
            <div class="scrollable-list">
              <v-list-item
                v-for="game in games"
                :key="game.roomName"
                :title="game.title"
                :subtitle="game.subtitle"
              >
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1">
                    <v-icon color="white"></v-icon>
                  </v-avatar>
                </template>
                <template v-slot:append>
                  <v-btn
                    color="grey-lighten-1"
                    icon="mdi-location-enter"
                    variant="text"
                    @click="joinGame(game.roomName)"
                  ></v-btn>
                </template>
              </v-list-item>
            </div>
          </div>
        </v-sheet>
      </v-row>
      <div class="py-14" />
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useWebSocketStore } from '@/websocket/websocket';
import { useUserStore } from '@/store/app';
import { useRouter } from 'vue-router';
import axios from 'axios';

const roomName = ref('');
const selectedDifficulty = ref('');
const selectedSize = ref('');
const password = ref('');
const difficulty = ['Easy', 'Medium', 'Hard'];
const size = ['2', '3', '4', '5', '6', '7', '8'];
const games = ref([]);
const router = useRouter();

const fetchGames = async () => {
  const response = await axios.get('http://localhost:8080/api/rooms');
  console.log(response.data);
  games.value = response.data.map(room => ({
    roomName: room.roomName,
    title: room.roomName,
    subtitle: room.difficulty,
    users: (room.users ? room.users.length : 0) + '/' + room.maxUsers,
    time: room.status === 'AVAILABLE' ? 'waiting' : 'playing'
  }));
}

const websocketStore = useWebSocketStore();
const userStore = useUserStore();

onMounted(async () => {
  await fetchGames();
  await websocketStore.initialize();

  if (websocketStore.stompClient.connected) {
    websocketStore.stompClient.subscribe('/topic/rooms', async (message) => {
      const game = JSON.parse(message.body);
      games.value.push(game);
      await fetchGames();
    });

    websocketStore.stompClient.subscribe('/topic/games', (message) => {
      console.log('Received message from /topic/games:', message);
      const confirmation = JSON.parse(message.body);
      if (confirmation.roomName === roomName.value && confirmation.full === false) { // Update this condition as needed
        router.push({name: 'WaitingRoom', params: {id: roomName.value}});
      }
    });

  } else {
    console.error('STOMP client is not connected.');
  }
});

const createGame = () => {
  const gameData = {
    roomName: roomName.value,
    username: userStore.username,
    difficulty: selectedDifficulty.value,
    size: selectedSize.value,
    password: password.value,
  };

  if (gameData.roomName && gameData.difficulty && gameData.size) {
    websocketStore.send("/app/game/create", JSON.stringify(gameData));
    roomName.value = '';
    selectedDifficulty.value = '';
    selectedSize.value = '';
    password.value = '';
  }
  else {
    alert("Please provide room name, difficulty level, and game size to create a game");
  }
};

const joinGame = (roomName) => {
  console.log("roomName", roomName);
  if (roomName) {
    const joinData = {
      roomName: roomName,
      username: userStore.username
    };
    console.log('joinData before send:', joinData);
    websocketStore.send("/app/game/join", JSON.stringify(joinData));
    router.push({name: 'WaitingRoom', params: {id: roomName}});
  }
};
</script>


<style scoped>
.background {
  background-color: ghostwhite;
}

.card {
  background-color: white;
  border-radius: 30px;
}

.card-contents {
  margin-left: 35px;
  margin-right: 35px;
}

.card-text{
  margin-top: 40px;
  font-family: Roboto-Slab-Light, sans-serif !important;
}

.scrollable-list {
  max-height: 350px;
  overflow-y: auto;
}
</style>
