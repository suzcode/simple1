<template>
  <div class="about">
    <h1>This is an about page updated 17sep2023 </h1>
    <button @click="fetchData">Ftech Data</button>
  </div>
</template>

<script>
import axios from 'axios';

const url = "http://35.202.141.120/microservice1";

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
