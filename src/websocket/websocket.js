import { defineStore } from 'pinia';
import SockJs from "sockjs-client/dist/sockjs"
import Stomp from 'webstomp-client';

export const useWebSocketStore = defineStore('websocket', {
  state: () => ({
    stompClient: null,
    connected: false
  }),
  actions: {
    initialize() {
      return new Promise((resolve, reject) => {
        let socket = new SockJs('http://localhost:8080/sdk');
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect({}, (frame) => {
          console.log('Connected: ' + frame);
          this.connected = true;

          this.stompClient.subscribe('/topic/games', (message) => {
            console.log(message.body);
          });
          this.stompClient.subscribe('/topic/rooms', (message) => {
            console.log('Room message: ', message.body);
          });

          resolve();  // Resolve the promise when connection is successful
        }, (error) => {
          console.log('Error: ' + error);
          this.connected = false;
          reject(error);  // Reject the promise when there is an error
        });
      });
    },

    send(destination, body) {
      if (this.connected) {
        this.stompClient.send(destination, body, {});
      } else {
        console.error('Cannot send message, not connected to WebSocket.');
      }
    },
    disconnect() {
      if (this.connected) {
        this.stompClient.disconnect(() => {
          console.log('Successfully disconnected from WebSocket');
          this.connected = false;
        });
      }
    }
  },
});
