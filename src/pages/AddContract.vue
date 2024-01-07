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
        v-model="contractId"
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
        type="number"
      />
      <FormGroup
        v-model="percentInc"
        label="Percent increase"
        placeholder="Enter annual percent increase"
        type="number"
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
    
    <!-- <p>Term months: {{ termMonths }}</p> -->
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

var customerId = ref(null);
var customerName = ref(null);
var contractId = ref(null);
var start = ref("2017-01-01");
var startSubs = ref(null);
var responseData = ref(null);
var percentInc = ref(null);
var end = ref("2024/01/01");

const startDay = computed(() => {
  const start_ref = new Date(start.value);
  const start_day_in_month = start_ref.getDate();
  return start_day_in_month;
});
const startMonth = computed(() => {
  const start_ref = new Date(start.value);
  const start_month_in_year = start_ref.getMonth() + 1;
  return start_month_in_year;
});
const startYear = computed(() => {
  const start_ref = new Date(start.value);
  const start_yr = start_ref.getFullYear();
  return start_yr;
});
const endDay = computed(() => {
  const end_ref = new Date(end.value);
  const end_day_in_month = end_ref.getDate();
  return end_day_in_month;
});
const endMonth = computed(() => {
  const end_ref = new Date(end.value);
  const end_month_in_year = end_ref.getMonth() + 1;
  return end_month_in_year;
});
const endYear = computed(() => {
  const end_ref = new Date(end.value);
  const end_yr = end_ref.getFullYear();
  return end_yr;
});

const term_Months = computed(() => {
  const dayDiff = endDay.value - startDay.value;
  console.log("Day diff", dayDiff);
  const monthDiff = endMonth.value - startMonth.value;
  console.log("Month diff", monthDiff);
  const yearDiff = endYear.value - startYear.value;
  console.log("Year diff", yearDiff);
  return monthDiff + yearDiff * 12;
});

var contract1 = ref<any>(null);
var successMessage = ref(null);


function onSubmitnewContract(e) {
  var sendObject = {};
  var new_contract = {};
  var new_contract_json = ref(null);
   // Convert startSubs and percentInc to numbers
  const startSubsValue = parseFloat(startSubs.value);
  const percentIncValue = parseFloat(percentInc.value);
  console.log(e);
  e.preventDefault();
  contract1 = {
      contract_id: contractId.value,  
      customer_id: customerId.value,
      customer_name: customerName.value,
      start_day: startDay.value,
      start_month: startMonth.value,
      start_year: startYear.value,
      end_day: endDay.value,
      end_month: endMonth.value,
      end_year: endYear.value, 
      start_subs: startSubsValue,
      percent_inc: percentIncValue,
      term_months: term_Months.value,
  };

  console.log("contract1", contract1);
  console.log("contract1 JSON", JSON.stringify(contract1));
  successMessage = "NOT UPDATED YET";
  console.log("SuccessMessage", successMessage);
  new_contract["entries"] = contract1;
  console.log("new contract", new_contract);
  new_contract_json = JSON.stringify(new_contract);
  console.log("data is as follows", new_contract_json);
  sendNewContract(new_contract_json);
  successMessage = "UPDATED";
  console.log(successMessage);
  // restart(JSON.stringify(successMessage), options1);
  return new_contract_json;
}

// This function posts the selected customer name to the python backend
function sendNewContract(contract_json) {
  axios
    .post(url, contract_json, {
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