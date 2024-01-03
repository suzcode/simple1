<template>
  <div class="about">
    <h1>This is the Edit contract details page </h1>
    <br>
    <form @submit="onSubmit" method="POST">
      <input
        name="contractRef"
        v-model="contractRef"
        type="text"
        placeholder="Enter the year"
      />
      <button class="btn btn-primary">Submit</button><br /><br />
    </form>

    <p>Response data: {{ responseData }}</p>
  </div>
  <Table>
  <template #thead>
    <TableHead>id</TableHead>
    <TableHead>Jan</TableHead>
    <TableHead>Feb</TableHead>
    <TableHead>Mar</TableHead>
    <TableHead>Apr</TableHead>
    <TableHead>May</TableHead>
    <TableHead>Jun</TableHead>
    <TableHead>Jul</TableHead>
    <TableHead>Aug</TableHead>
    <TableHead>Sep</TableHead>
    <TableHead>Oct</TableHead>
    <TableHead>Nov</TableHead>
    <TableHead>Dec</TableHead>
  </template>

  <!-- Displays table and if the item field is updated it calls the handlePersonUpdate method -->
  <template #tbody>
    <PersonRow
      v-for="(item, index) in responseData.Billing"
      :key="index"
      :person="item"
    />
  </template>
  </Table>
</template>
  
  
<script setup lang="ts">
import axios from 'axios';
import { defineAsyncComponent, ref } from "vue";
import { EmittedValue, Person } from "@/types/interfaces";

const Table = defineAsyncComponent(
() => import(/*webpackChunkName:"table"*/ "@/components/table/TableView.vue")
);
const TableHead = defineAsyncComponent(
  () =>
    import(/*webpackChunkName:"tablehead"*/ "@/components/table/TableHead.vue")
);
const PersonRow = defineAsyncComponent(
  () => import(/*webpackChunkName: "personrow"*/ "@/components/PersonRow.vue")
);
var people = ref<Person[]>([
  {
    id: 2022,
    jan: 99,
    feb: 0,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 0,
    jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 5000.0,
    dec: 0,
  },
  {
    id: 2023,
    jan: 105,
    feb: 0,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 0,
    jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 5000.0,
    dec: 0,
  },
  {
    id: 2024,
    jan: 199,
    feb: 0,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 0,
    jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 5000.0,
    dec: 0,
  },
]);

// url for kubernetes backend
const url = "http://34.31.236.147/yearFilter";

// initialize variables
var responseData = ref(null);
var contractRef = ref<any>(null);
var response = ref(null);
var people1 = ref([]);

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
      responseData.value = response.data;
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