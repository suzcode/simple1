<template>
  <div class="about">
    <h1>This is an about page updated 24sep2023 at 9.18pm </h1>
    <button @click="fetchData">Ftech Data</button>
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
        .get(url)
        .then((response) => {
          this.responseData = response.data;
        })
        .catch((error) => {
          console.error('Error:', error);
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
