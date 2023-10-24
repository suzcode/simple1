<template>
  <div class="about">
    <h1>This is an about page updated 23oct2023 at 1.30pm </h1>
    <button @click="fetchData">Ftech Data</button>
    <p>{{ responseData }}</p>
  </div>
</template>

<script>
import axios from 'axios';

const url = "http://34.31.236.147/microservice1";

export default {
  name: 'MyComponent',
  data() {
    return {
      responseData: '',
    }
  },
  methods: {
    fetchData() {
      axios
        .get(url, {timeout: 10000})
        .then((response) => {
          this.responseData = response.data;
        })
        .catch((error) => {
        if (axios.isCancel(error)) {
          console.error('Request canceled:', error.message);
        } else {
          console.error('Error:', error.response.data);
        }
      });
    },
  }
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
