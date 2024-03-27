<template>
    <div>
      <p v-if="demoVariable">Demo Variable is True</p>
      <p v-else>Demo Variable is False</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useUserStore } from "@/stores/UserStore";
  
  const UserStore = useUserStore();
  const demoVariable = UserStore.demoVariable;
  </script>