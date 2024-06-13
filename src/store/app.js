// Utilities
import { defineStore } from 'pinia'
import {ref} from "vue";

export const useAppStore = defineStore('app', {
  state: () => ({
    //
  }),
})

export const useUserStore = defineStore('user', {
  state: () => ({
    username: "",
    login: false,
    // other state properties
  }),
  actions: {
    setUsername(username) {
      this.login = true;
      this.username = username;
    },
  },
  persist: true,
})

export const persistStore = defineStore('user', ()=>{
  const user = ref({
    name:"help"
  })
  const changeName = (newName) => {
    user.value.name = newName;
  }
  return{
    user,
    changeName,
  }
})
