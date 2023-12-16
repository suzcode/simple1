<template>
    <div>
      <br />
      <br />
      <!-- <pre>
      <h1>{{ successMessage }}</h1>
      Item: {{ item }}
      Selected customer: {{ selectedCustomer }}
      Returned customer is: {{ custName }}
      <peopleCom :key="peopleKey">People1: {{ people1 }}</peopleCom>
      <details :key="componentKey">Details: {{ details }}</details>
    </pre> -->
      <div class="container">
        <template v-if="response.data !== null">
          Customers:
          <select v-model="selectedCustomer" class="form-control">
            <option selected disabled value="">Choose</option>
            <option
              v-for="customer in response.data"
              :key="customer.id"
              :selectedCustomer="selectedCustomer"
            >
              {{ customer }}
            </option>
          </select>
          <form @submit.prevent.stop="onSubmit" method="POST">
            <input
              name="selectedCustomer"
              v-model="selectedCustomer"
              type="text"
              placeholder="Enter name"
              visable="false"
            />
            <button class="btn btn-primary">Submit</button><br /><br />
          </form>
        </template>
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
              v-for="(item, index) in details.Billing"
              :key="index"
              :person="item"
              @personupdated="handlePersonUpdate"
            />
          </template>
        </Table>
        <form @submit.prevent.stop="onSubmitChangedCells" method="POST">
          <input
            name="people1"
            v-model="people1"
            type="Object"
            placeholder="This is the updated cells"
            visable="false"
          />
          <button class="btn btn-primary">Submit</button><br /><br />
        </form>
        {{ successMessage }}
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineAsyncComponent, onBeforeMount, ref } from "vue";
  import { EmittedValue, Person } from "@/types/interfaces";
  import axios from "axios";
  import {
    conditionalExpression,
    isTemplateElement,
    METHOD_TYPES,
  } from "@babel/types";
  
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
  
  var componentKey = ref(0);
  var peopleKey = ref(0);
  
  const forceRerender = () => {
    componentKey.value += 1;
    peopleKey.value += 1;
  };
  
  const response = ref(null);
  
  // Gets a list of the customers for the drop down selector box
  // onBeforeMount(async () => {
  //   response.value = await axios.get("http://127.0.0.1:5000/customers");
  //   console.log(response.value);
  //   return response;
  // });
  
  const selectedCustomer = ref(null);
  
  // When the submit button is clicked this calls the setCustomer and getMessage functions
  function onSubmit(e) {
    console.log(e);
    e.preventDefault();
    const data = JSON.stringify(selectedCustomer.value);
    console.log("data is as follows", data);
    const options = { headers: { "content-type": "application/json" } };
    setCustomer(data, options);
    //getMessage();
  }
  
  // This function posts the selected customer name to the python backend
  // function setCustomer(data, options) {
  //   axios
  //     .post("http://localhost:5000/greeting", data, options)
  //     .then((res) => {
  //       console.log("OK", res);
  //       details.value = res.data;
  //     })
  //     .catch((error) => {
  //       console.log("ERROR", error);
  //     });
  //   return details;
  // }
  
  // var details = ref(null);
  // var custName = ref(null);
  
  
  var people1 = ref([]);
  
  //
  function handlePersonUpdate(payload: EmittedValue): void {
    console.log("payload", payload);
    console.log("people", people);
    console.log("payloand.id", payload.id);
    console.log("payloand.key", payload.key);
    console.log("payloand.val", Number(payload.val));
    //const people = people.value.map((item) => {
    //const container = {};
    //if (item.id == payload.id) {
    //  item[payload.key] = Number(payload.val);
    //}
    //return {
    //  item,
    //  container,
    //  people,
    //};
    //});
    // console.log("item", item);
    //console.log("people1", people1);
    peoplePush(payload);
    console.log("people1", people1);
    //people.value = people.value.map((item, index) => {
    //  if (item.id == payload.id) {
    //    item[payload.key] = Number(payload.value);
    //  }
    //  console.log("People", people);
    //  console.log("ITEM", item);
    //  return item;
    //});
  }
  
  var exists = false;
  
  function peoplePush(payload) {
    console.log(payload.id);
    console.log(payload.key);
    console.log(Number(payload.val));
    console.log("NEW");
    exists = !!people1.value.find(
      (item) => item.id === payload.id && item.key === payload.key
    );
    console.log("EXISTS", exists);
    if (exists === false) {
      people1.value.push(payload);
    }
    console.log(people1);
    people1.value.find((item, index) => {
      if (item.id === payload.id && item.key === payload.key) {
        console.log("EXISTING1");
        console.log("INDEX", people1.value[index]);
        people1.value[index] = payload;
        console.log("INDEX", people1.value[index]);
      }
    });
  }
  
  var successMessage = ref(null);
  
  function onSubmitChangedCells(e) {
    var sendObject = {};
    console.log(e);
    e.preventDefault();
  
    const cellUpdates = people1.value;
    sendObject = {
      selectedCustomer: selectedCustomer.value,
      cellUpdates,
    };
    successMessage = "NOT UPDATED YET";
    console.log(successMessage);
    const data1 = JSON.stringify(sendObject);
    console.log("data is as follows", data1);
    const options1 = { headers: { "content-type": "application/json" } };
    sendUpdates(data1, options1);
    successMessage = "UPDATED";
    console.log(successMessage);
    // restart(JSON.stringify(successMessage), options1);
    return cellUpdates;
  }
  
  // <script setup lang="ts">
  // import axios from 'axios';
  // import { ref } from "vue";

  // url for kubernetes backend
  const url = "http://34.31.236.147/microservice1";

  var responseData = ref(null);
  var userAge = ref<any>(null);
  var response = ref(null);
  var details = ref(null);

  // When the submit button is clicked this adds the age selected and queries the backend database
  function onSubmit(e) {
    console.log(e);
    e.preventDefault();
    console.log(userAge);
    let age_dict = {}
    age_dict['ageval'] = userAge.value;
    console.log('raw data is as follows', age_dict);
    const age_dict_json = JSON.stringify(age_dict);
    console.log('age_dict_json', age_dict_json);
    axios
      .post(url, age_dict_json, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log("OK", response.data);
        // responseData = response.data;
        details.value = response.data;
        return details;
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





  // This function posts the updated cells to the python backend
  function sendUpdates(data1, options1) {
    axios
      .post("http://localhost:5000/updatedCells", data1, options1)
      .then((res1) => {
        console.log("OK", res1);
      })
      .catch((error1) => {
        console.log("ERROR", error1);
      });
  }
  
  </script>