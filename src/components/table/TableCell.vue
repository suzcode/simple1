template>
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
      | "start_year"
      | "start_day"
      | "start_subs"
      | "percent_inc"
      | "end_year"
      | "end_month"
      | "end_day"
      | "term_mths";
  }>();
  const inputElement = ref<HTMLInputElement>();
  const inputValue = ref<number>(props.cellvalue);
  const showInput = ref<boolean>(false);
  watch(
    () => props.cellvalue,
    (newValue: number) => {
      inputValue.value = newValue;
    }
  );
  const emit = defineEmits<{ (e: "changed", value: EmittedValue): void }>();
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