<template>
  <div class="about">
    <h1>This is an about page updated 26Nov2023 at 12pm </h1>
    <br>
    <form @submit="onSubmit" method="POST">
      <input
        name="userAge"
        v-model="userAge"
        type="text"
        placeholder="Enter the age"
      />
      <button class="btn btn-primary">Submit</button><br /><br />
    </form>

    <p>Response data: {{ responseData }}</p>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from "vue";

// url for kubernetes backend
const url = "http://34.31.236.147/microservice1";

var responseData = ref(null);
var userAge = ref<any>(null);
var response = ref(null);

// When the submit button is clicked this calls the setCustomer and getMessage functions
function onSubmit(e) {
  console.log(e);
  e.preventDefault();
  console.log(userAge);
  let age_dict = {}
  age_dict = userAge.value;
  console.log('raw data is as follows', age_dict);
  const age_dict_json = JSON.stringify(age_dict);
  console.log('age_dict_json', age_dict_json);
  axios
    .post(url, age_dict_json)
    .then((res) => {
      console.log("OK", res);
      responseData = res.data;
    })
    .catch((error) => {
      console.log("ERROR", error);
    console.log('response is ', responseData);
    return responseData
    });
}

</script>