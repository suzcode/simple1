<template>
  <td class="px-6 py-4 whitespace-nowrap" @click="handleClick">
    <div :class="{ hidden: showInput }">
      <slot />
    </div>

    <input
      type="text"
      ref="inputElement"
      @blur="handleBlur"
      @keypress.enter="handleBlur"
      v-model="inputValue"
      class="border border-gray focus:ring focus:outline-none focus:ring-gray-500"
      :class="`${showInput ? 'block' : 'hidden'}`"
    />
  </td>
</template>
  
  <script setup lang="ts">
  import { ref, watch, defineProps, defineEmits } from "vue";
  import { EmittedValue } from "../../types/interfaces";
  const props = defineProps<{
    cellvalue: number | string;
    cellkey:
      | "jan"
      | "feb"
      | "mar"
      | "apr"
      | "may"
      | "jun"
      | "jul"
      | "aug"
      | "sep"
      | "oct"
      | "nov"
      | "dec"
      | "customer_id"
      | "contract_id"
      | "start_day"
      | "start_month"
      | "start_year"
      | "start_subs"
      | "percent_inc"
      | "end_day"
      | "end_month"
      | "end_year"
      | "term_months";
  }>();
  var inputElement = ref<HTMLInputElement>();
  var inputValue = ref<number>(props.cellvalue);
  var showInput = ref<boolean>(false);
  watch(
    () => props.cellvalue,
    (newValue: number) => {
      inputValue.value = newValue;
    }
  );
  var emit = defineEmits<{ (e: "changed", value: EmittedValue): void }>();
  
  function handleClick(): void {
    console.log("CLIC");
    showInput.value = true;
    console.log(showInput.value);
    setTimeout(() => {
      (inputElement.value as HTMLInputElement).focus();
    }, 200);
    console.log(inputElement.value);
  }
  
  function handleBlur(): void {
    showInput.value = false;
    console.log(inputValue.value);
    emit("changed", { key: props.cellkey, val: inputValue.value });
  }
  </script>