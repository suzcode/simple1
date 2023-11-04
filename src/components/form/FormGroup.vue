<template>
    <div class="form-group">
      <Label :class="labelClasses">{{ label }}</Label>
      <Input
        @update:modelValue="passInputValue"
        :value="modelValue"
        :class="inputClasses"
        :placeholder="placeholder"
        :type="type"
      />
    </div>
  </template>
  
  <script setup lang="ts" (props, { emit })>
  import { defineAsyncComponent, defineEmits } from "vue";
  import Input from "./InputComponent.vue";
  // const Input = defineAsyncComponent(() => import("./InputComponent.vue"));
  const Label = defineAsyncComponent(() => import("./LabelComponent.vue"));
  
  const emit = defineEmits(["update:modelValue"]);
  
  defineProps({
    type: String,
    placeholder: String,
    label: String,
    labelClasses: String,
    inputClasses: String,
    modelValue: [String, Number],
  });
  
  function passInputValue(value) {
    emit("update:modelValue", value);
    console.log("VALUE", value);
  }
  </script>
  
  <!-- <style scoped>
  .form-group {
    @apply flex flex-col space-y-4;
  }
  </style> -->