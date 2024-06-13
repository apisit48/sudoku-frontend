<template>
  <v-app-bar>
    <v-col class=" text-left rounded-pill">
      <v-col class=" v-icon--clickable" @click="router().push({ path: '/' })">
        Sudoku Showdown
      </v-col>
    </v-col>
    <v-btn @click="router().push({ path: 'play' })" class="w-25 bg-light-blue-lighten-5">
      Play
    </v-btn>
    <v-col class="text-right">
      <v-menu
        open-on-hover v-if="userStore.login"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            router :to="item.link"
            @click="submit(item)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-col v-if="!userStore.login" @click="router().push({ path: 'login' })" class=" v-icon--clickable ">
        Login
      </v-col>
    </v-col>

  </v-app-bar>

</template>

<script>
import router from "@/router";
import {useUserStore} from "@/store/app";
import axios from "axios";
  export default {
    data() {
      return {
        loginStatus: false,
        items: [
          { title: "Profile",
            link: "/user",},
          { title: 'Leaderboard',
            link: "/leaderboard" },
          { title: 'Logout',},
        ],
      }
    },
    methods: {
      router() {
        return router
      },
      //there is probably a more elegant way
      submit(item) {
        if (item.title === 'Logout') {
          axios
            .post("/api/logout")
            .then((response) => {
              alert(response.data);
              this.userStore.login = false;
              this.userStore.username = "";
              this.$router.push({path: '/'});
            })
            .catch(() => {
              alert("Couldn't log out for some reason");
            });
        }
      },
    },
    computed: {
      userStore() {
        return useUserStore();
      },
    },
  };
</script>

<style>

.appbar-class {
  font-family: "Verdana", sans-serif;
  font-size: 20px;
}

</style>

