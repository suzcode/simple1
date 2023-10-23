<template>
  <div class="about">
    <h1>This is an about page updated 24sep2023 at 9.18pm </h1>
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
          console.log('response.data', response.data);
          console.log('response', response);
        })
        .catch((error) => {
        if (axios.isCancel(error)) {
          console.error('Request canceled:', error.message);
          console.error(error.status);
        } else {
          console.error('Error:', error);
          console.error(error.status);
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
