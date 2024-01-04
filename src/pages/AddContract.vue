<template>
    <h3>Enter a new contract</h3>
    <form class="flex flex-col mt-10 space-y-7" @submit.prevent="onSubmitnewContract">
      <FormGroup
        v-model="customerId"
        label="Customer ID"
        placeholder="Enter Customer ID"
        type="text"
      />
      <FormGroup
        v-model="customerName"
        label="Customer Name"
        placeholder="Enter Customer Name"
        type="text"
      />
      <FormGroup
        v-model="contractid"
        label="Contract ID"
        placeholder="Enter Contract ID"
        type="text"
      />
      <FormGroup
        v-model="start"
        label="Contract start"
        placeholder="Enter Contract Start"
        type="date"
        required
        pattern="\d{4}-\d{2}-\d{2}"
      />
      <FormGroup
        v-model="end"
        label="End Date"
        placeholder="Enter contract end date"
        type="date"
        required
        pattern="\d{4}-\d{2}-\d{2}"
      />
      <FormGroup
        v-model="startSubs"
        label="Starting subscription"
        placeholder="Enter Starting Subscription"
        type="text"
      />
      <FormGroup
        v-model="percentInc"
        label="Percent increase"
        placeholder="Enter annual percent increase"
        type="text"
      />
      <form @submit.prevent.stop="onSubmitnewContract" method="POST">
        <input
          name="contract1"
          v-model="contract1"
          type="Object"
          placeholder="This is the new contract info"
          visable="false"
        />
        <button class="button">Submit</button><br /><br />
      </form>
    </form>
    <p>Term months: {{ termMonths }}</p>
</template>
  
<script setup lang="ts" (props, { emit })>
import { ref, reactive, computed } from "vue";
import { defineAsyncComponent, defineEmits } from "vue";
import axios from "axios";

const FormGroup = defineAsyncComponent(() =>
import("@/components/form/FormGroup.vue")
);

const emit = defineEmits(["submit"]);

// url for kubernetes backend
const url = "http://34.31.236.147/addcontract";

function submitForm() {
contract1 = {
    contract_id: id.value,  
    customer_id: customerId.value,
    customer_name: customerName.value,
    start: start.value,
    start_subs: startSubs.value,
    percent_inc: percentInc.value,
    end: end.value,
    term: termMonths.value,
};
console.log("contract1", contract1);
}

const customerId = ref(null);
const customerName = ref(null);
const id = ref(null);
const start = ref("2017-01-01");
const startSubs = ref(null);
const percentInc = ref(null);
const end = ref("2024/01/01");

const termMonths = computed(() => {
const startValue = new Date(start.value);
const endValue = new Date(end.value);
const startMonth = startValue.getMonth();
const endMonth = endValue.getMonth();
const monthDiff = endMonth - startMonth;
console.log("Month diff", monthDiff);
const startYear = startValue.getYear();
const endYear = endValue.getYear();
const yearDiff = endYear - startYear;
console.log("Year diff", yearDiff);
const startDays = startValue.getDate();
const endDays = endValue.getDate();
const dayDiff = endDays - startDays;
return monthDiff + yearDiff * 12;
});

var contract1 = ref<any>(null);

var successMessage = ref(null);

function onSubmitnewContract(e) {
var sendObject = {};
console.log(e);
e.preventDefault();
contract1 = {
    customerId: customerId.value,
    customerName: customerName.value,
    id: id.value,
    start: start.value,
    startsubs: startSubs.value,
    percentinc: percentInc.value,
    end: end.value,
    term: termMonths.value,
};
console.log("contract1", contract1);
// sendObject = {
//   contract1,
// };
successMessage = "NOT UPDATED YET";
console.log("SuccessMessage", successMessage);
let new_contract = {}
new_contract['entries'] = contract1.value 
new_contract_json = JSON.stringify(new_contract);
console.log("data is as follows", new_contract_json);
sendNewContract(new_contract_json);
successMessage = "UPDATED";
console.log(successMessage);
// restart(JSON.stringify(successMessage), options1);
return new_contract_json;
}

// This function posts the selected customer name to the python backend
function sendNewContract(new_contract_json) {
axios
.post(url, new_contract_json, {
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

<!-- <style scoped>
.button {
@apply bg-purple-500 text-gray-50 px-9 py-2 rounded;
}
</style> -->