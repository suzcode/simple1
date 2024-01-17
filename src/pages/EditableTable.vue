<template>
  <pre>
    {{ details }}
  </pre>
  <div>
    <h1>This is the editable table page updated 9.40pm 16 Jan 2024</h1>
    <div class="container">
      <template v-if="customerListResponse.data !== null">
        Customers:
        <select v-model="selectedCustomer" class="form-control">
          <option selected disabled value="">Choose</option>
          <option
            v-for="customer in customerListResponse.data"
            :key="customer"
          >
            {{ customer }}
          </option>
        </select>
        <form @submit.prevent.stop="onSubmit" method="POST">
          <input
            name="selectedCustomer"
            v-model="selectedCustomer"
            type="text"
            placeholder="Select customer name"
            :visible="false"
          />
          <!-- <ul>
          <li v-for="item in people1">
            {{ item.key }} - {{ item.id }} change to {{ item.val }}
          </li>
          </ul> -->
          <button class="btn btn-primary">Submit</button><br /><br />
        </form>
        <!-- <p>Response data: {{ details }}</p> -->
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
          name="cellUpdates"
          v-model="cellUpdates"
          type="Object"
          placeholder="This is the updated cells"
          visable="false"
        />
        <ul>
          <li v-for="item in people1">
            {{ item.key }} - {{ item.id }} change to {{ item.val }}
          </li>
        </ul>
        <button class="btn btn-primary">Confirm changes</button><br /><br />
      </form>
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

// var selectedCustomer = ref(null);
var people1 = ref([]);
// url for kubernetes backend
const url_cust = "http://34.31.236.147/customers";
const url = "http://34.31.236.147/microservice1";
const url_updates = "http://34.31.236.147/contractupdates"
var exists = false;
var successMessage = ref(null);
var responseData = ref(null);
var selectedCustomer = ref<any>(null);
var cellUpdates = ref<any>(null);
var customerListResponse = ref(null);
var details = ref(null);
var existingPayload = ref([]);

// Gets a list of the customers for the drop down selector box
onBeforeMount(async () => {
    customerListResponse.value = await axios.get(url_cust);
    console.log(customerListResponse.data);
    return customerListResponse;
  });

function handlePersonUpdate(payload: EmittedValue): void {
  console.log("payload", payload);
  console.log("payloand.id", payload.id);
  console.log("payloand.key", payload.key);
  console.log("payloand.val", Number(payload.val));
  existingPayload = details.value.cellChanges;
  console.log("Pre-existinng Payload", existingPayload);
  console.log("peop1e1 for value.find", people1);
  if (Array.isArray(people1.value)) {
    exists = !!people1.value.find(
    (item) => item.id === payload.id && item.key === payload.key
    );
    console.log("EXISTS", exists);
    if (exists === false) {
    people1.push(payload);
    }
  } else {
    console.log("people1.value is not an array");
  }
  // people.value = people.value.map((item, index) => {
  //    if (item.id == payload.id) {
  //      item[payload.key] = Number(payload.value);
  //      console.log("match", item[payload.key]);
  //    }
  //    console.log("People", people);
  //    console.log("ITEM", item);
  //    peoplePush(payload, existingPayload);
  //    return item;
  //  });
}

function peoplePush(payload, existingPayload) {
  console.log(payload.id);
  console.log(payload.key);
  console.log(Number(payload.val));
  console.log("NEW");
  console.log("peop1e1 for value.find", people1);
  if (Array.isArray(people1.value)) {
    exists = !!people1.value.find(
    (item) => item.id === payload.id && item.key === payload.key
    );
    console.log("EXISTS", exists);
    if (exists === false) {
    people1.push(payload);
    }
  } else {
    console.log("people1.value is not an array");
  }
  console.log(people1);
  people1.find((item, index) => {
    if (item.id === payload.id && item.key === payload.key) {
      console.log("EXISTING1");
      console.log("INDEX", people1[index]);
      people1.value[index] = payload;
      console.log("INDEX", people1[index]);
    }
  console.log("People1.value", people1.value);
  const people1Value = people1.value;
  const pepJSON = JSON.stringify(people1Value);
  console.log("People1 json", pepJSON);
  console.log("existingPayload", existingPayload);
  const exJSON = JSON.stringify(existingPayload);
  console.log("existingPayload stringify", exJSON);
  const resultList = [];
  // Iterate over the dictionaries in list1 and list2
  for (let i = 0; i < Math.max(people1Value.length, existingPayload.length); i++) {
  // Combine dictionaries using spread syntax, defaulting to an empty object if undefined
    resultList.push({
      ...(people1Value[i] || {}),
      ...(existingPayload[i] || {})
  });
  }
  console.log("resultList", resultList);
  people1 = resultList;
  console.log("People1 with existing", people1);
  return people1;
  });
}

function onSubmitChangedCells(e) {
  var sendObject = {};
  console.log(e);
  e.preventDefault();
  const cellUpdates = people1.value;
  console.log("cellUpdates", cellUpdates)
  cellUpdates.append(existingPayload);
  sendObject = {
    selectedCustomer: selectedCustomer.value,
    cellUpdates,
  };
  successMessage = "NOT UPDATED YET";
  console.log(successMessage);
  const data1 = JSON.stringify(sendObject);
  console.log("data is as follows", data1);
  axios
    .post(url_updates, data1, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res1) => {
      console.log("OK", res1);
    })
    .catch((error1) => {
      console.log("ERROR", error1);
    });
  successMessage = "UPDATED";
  console.log(successMessage);
  // restart(JSON.stringify(successMessage), options1);
  return cellUpdates;
}

// When the submit button is clicked this adds the age selected and queries the backend database
function onSubmit(e) {
  console.log(e);
  e.preventDefault();
  console.log(selectedCustomer);
  let customerSelected_dict = {}
  customerSelected_dict['cust'] = selectedCustomer.value;
  console.log('raw data is as follows', customerSelected_dict);
  const customer_dict_json = JSON.stringify(customerSelected_dict);
  console.log('customer_dict_json', customer_dict_json);
  axios
    .post(url, customer_dict_json, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log("OK", response.data);
      details.value = response.data;
      return details;
    })
    .catch((error) => {
      console.log("ERROR", error);
      if (error.response) {
        console.log("Server responded with a non-2xx status", error.response.data);
      }
      console.log('response is ', response);
      throw error;  // Re-throw the error to propagate it to the calling code
    });
}

</script>