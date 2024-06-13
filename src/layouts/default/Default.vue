<template>
  <v-app>
    <default-bar />
    <default-view />
  </v-app>
</template>

<script setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'

</script>

<script>
import { useWebSocketStore } from "@/websocket/websocket";

export default {
  created() {
    const websocketStore = useWebSocketStore();
    websocketStore.initialize();
  },
  beforeUnmount() {
    const websocketStore = useWebSocketStore();
    websocketStore.disconnect();
  }
}
</script>
