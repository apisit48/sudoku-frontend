<template>
  <h2>{{ userStore.username }}'s user Page</h2>
</template>

<script>
import {useUserStore} from "@/store/app";

export default {
  methods: {
  },
  computed: {
    userStore() {
      return useUserStore();
    },
  },
};

</script>
