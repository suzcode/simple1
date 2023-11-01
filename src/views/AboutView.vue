<template>
  <div class="about">
    <h1>This is an about page updated 2Nov2023 at 4am </h1>
    <button @click="fetchData">Ftech Data</button>
    <p>Response data: {{ responseData }}</p>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from "vue";

// url for kubernetes backend
const url = "http://34.31.236.147/microservice1";

var responseData = ref(null);

// initial resp variable

function fetchData() {
  axios
    .get(url, {timeout: 10000})
    .then((response) => {
      responseData = response.data;
    })
    .catch((error) => {
    if (axios.isCancel(error)) {
      console.error('Request canceled:', error);
    } else {
      console.error('Error:', error);
    }
    return responseData
  });
}
</script>

<!-- <style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style> -->
