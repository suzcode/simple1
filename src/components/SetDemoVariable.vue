<template>
    <button @click="setDemoVariable(true)">Set Demo Variable to True</button>
  </template>
  
  <script setup lang="ts">
  import { useUserStore } from "@/stores/UserStore";
  
  const UserStore = useUserStore();
  </script>