<template>
    <h3>Enter a new contract</h3>
    <form class="flex flex-col mt-10 space-y-7" @submit.prevent="submitForm">
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
        v-model="id"
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
      <!-- <FormGroup
        v-model="contract.termMonths"
        label="Term months"
        placeholder="Enter contract term (months)"
        type="text"
      /> -->
      <form @submit.prevent.stop="submitForm" method="POST">
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
    <p>Contract details: {{ contract1 }}</p>
  </template>
  
  <script setup lang="ts" (props, { emit })>
  import { ref, reactive, computed } from "vue";
  import { defineAsyncComponent, defineEmits } from "vue";
  import axios from "axios";
  
  const FormGroup = defineAsyncComponent(() =>
    import("@/components/form/FormGroup.vue")
  );
  
  const emit = defineEmits(["submit"]);
  
  function submitForm() {
    console.log(
      "submit",
      customerId,
      customerName,
      id,
      start,
      startSubs,
      percentInc,
      end
    );
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
  
  var contract1 = ref([]);
  
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
    const data1 = JSON.stringify(contract1);
    console.log("data is as follows", data1);
    const options1 = { headers: { "content-type": "application/json" } };
    sendNewContract(data1, options1);
    successMessage = "UPDATED";
    console.log(successMessage);
    // restart(JSON.stringify(successMessage), options1);
    return contract1;
  }
  
  // This function posts the selected customer name to the python backend
  function sendNewContract(data1, options1) {
    axios.post("http://34.31.236.147/newcontract", data1, options1);
  }
  </script>
  
  <!-- <style scoped>
  .button {
    @apply bg-purple-500 text-gray-50 px-9 py-2 rounded;
  }
  </style> -->