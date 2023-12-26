<template>
    <div class="about">
      <h1>This is the Edit contract details page </h1>
      <br>
      <form @submit="onSubmit" method="POST">
        <input
          name="contractRef"
          v-model="contractRef"
          type="text"
          placeholder="Enter the contract number"
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
  const url = "http://34.31.236.147/contract";
  
  var responseData = ref(null);
  var contractRef = ref<any>(null);
  var response = ref(null);
  
  // When the submit button is clicked this adds the age selected and queries the backend database
  function onSubmit(e) {
    console.log(e);
    e.preventDefault();
    console.log(contractRef);
    let contract_dict = {}
    contract_dict['ref'] = contractRef.value;
    console.log('raw data is as follows', contract_dict);
    const contract_dict_json = JSON.stringify(contract_dict);
    console.log('contract_dict_json', contract_dict_json);
    axios
      .post(url, contract_dict_json, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log("OK", response.data);
        responseData = response.data;
        return responseData;
      })
      .catch((error) => {
        console.log("ERROR", error);
        if (error.response) {
          console.log("Server responded with a non-2xx status", error.response.data);
        }
        console.log('response is ', responseData);
        throw error;  // Re-throw the error to propagate it to the calling code
      });
  }
  
  </script>