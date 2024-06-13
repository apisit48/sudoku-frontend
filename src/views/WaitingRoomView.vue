
<template>
  <div class="loadingTwo"></div>
  <v-row justify="center">
  <div class="waiting-room">
    <h1 v-if="room" class="top">Room: {{ room.roomName }}</h1>
    <div class="mid">
    <h2 v if="room" class="dif">Difficulty: {{ room.difficulty }}</h2>
    <h3 v-if="room" class="size">Size: {{ room.maxUsers }}</h3>
    <h3 v-if="room && room.users">Players: {{ room.users.length }}</h3>
    </div>
    <p v-if="room">Users: </p>
    <template v-for="user in room.users">
      <div v-if="user" :key="user.username">
        <p class="user">{{ user.username }}</p>
      </div>
    </template>
    <div class="topBtn">
    <v-btn
      width="380"
      color="indigo-darken-3"
      variant="outlined"
      @click="startGame()"
    >
      Start Game
    </v-btn>
      </div>
    <div class="botBtn">
      <v-btn
        width="380"
        color="indigo-darken-3"
        variant="outlined"
        @click="leaveRoom()"
      >
        Leave Room
      </v-btn>
    </div>
  </div>
  </v-row>
</template>

<script>
import axios from "axios";
import { useWebSocketStore } from '@/websocket/websocket';
import { useUserStore } from "@/store/app";

export default {
  name: 'WaitingRoomView',

  data() {
    return {
      room: this.$route.params.id,
    };
  },

  setup() {
    const websocket = useWebSocketStore();

    return {
      websocket,
    };
  },
  created() {
    const roomName = this.$route.params.id;

    if (!this.websocket.stompClient) {
      console.error('stompClient is not initialized yet.');
      return;
    }

    try {
      axios.get(`http://localhost:8080/api/room/${roomName}`)
        .then(response => {
          this.room = response.data;
        });
    } catch (error) {
      console.error(`Failed to get room data: ${error}`);
    }

  },


  methods: {
    startGame() {
      this.$router.push({ name: 'Game' });
    },

    leaveRoom() {
      const userStore = useUserStore();
      const roomName = this.$route.params.id;
      const leaveData = {
        roomName: roomName,
        username: userStore.username,
      };

      this.websocket.send("/app/game/leave", JSON.stringify(leaveData));
      this.$router.push({ name: 'Home' });
    },

    handleRoomUpdate(message) {
      const roomData = JSON.parse(message.body);

      if (!roomData.users) {
        roomData.users = [];
      }

      this.$set(this, 'room', roomData);
    },

    handleSubscriptionError(error) {
      console.error('Failed to subscribe: ', error.response.data);
    },
  },
};
</script>

<style scoped>
.waiting-room {
  position: absolute;
  top: 20%;
  text-align:center;
  margin: 80px;
  font-family: Roboto-Slab-Light, sans-serif !important;

}
.top{
  margin-top: 20px;
}
.user{
  margin: 10px;
}
.size{
  margin: 5px;
}
.topBtn{
  margin-top: 15px;
}
.botBtn{
  margin-top: 15px;
}
.loadingTwo{
  position: absolute;
  top: 4%;
  left: 39.35%;
  margin-top: 50px;
  margin-left: 108px;
  width: 190px;
  height: 190px;
  background: #1E90FF;
  border-radius: 55%;
  animation: loadingAni 2s infinite;
}


@keyframes loadingAni {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  25% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}
</style>

