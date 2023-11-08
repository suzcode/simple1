<template>
  <div class="about">
    <h1>This is an about page updated 6Nov2023 at 4am </h1>
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

    <!-- Might need to add back in  -->

    <!-- <button @click="fetchData">Ftech Data</button>
    <br> -->
    <!--end of section to add back in-->

    <p>Response data: {{ responseData }}</p>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from "vue";

// url for kubernetes backend
const url = "http://34.31.236.147/microservice1";

var responseData = ref(null);
var userAge = ref(null);
var response = ref(null);

// initial resp variable

//------------------------------------------------------------------
// This function posts the selected age to the python backend
function setAge(age) {
  axios
    .post(url, age)
    .then((res) => {
      console.log("OK", res);
      responseData = res.data;
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
  return responseData;
}



// When the submit button is clicked this calls the setCustomer and getMessage functions
function onSubmit(e) {
  console.log(e);
  e.preventDefault();
  console.log(userAge);
  const age_dict = {}
  age_dict['ageval'] = userAge.value;
  console.log('raw data is as follows', age_dict);
  console.log("data is as follows", age_dict['ageval']);
  age_dict_json = JSON.stringify(age_dict);
  //const options = { headers: { "content-type": "application/json" } };
  //response = setAge(data, options);
  //response = setAge(age);
  // test
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
  
  

  //----------------------------------------------------------------------


//--------------------------------------------------------
//may need to revert to this
//--------------------------------------------------------

// function fetchData() {
//   axios
//     .get(url, {timeout: 10000})
//     .then((response) => {
//       responseData = response.data;
//     })
//     .catch((error) => {
//     if (axios.isCancel(error)) {
//       console.error('Request canceled:', error);
//     } else {
//       console.error('Error:', error);
//     }
//     return responseData
//   });
// }
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
