<template>
    <input
      v-bind="$attrs"
      class="input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from "vue";
  
  defineProps({
    modelValue: [String, Number],
  });
  
  const emit = defineEmits(["update:modelValue"]);
  
  // function passInputComponent(value) {
  //   emit("update:modelValue", value);
  //   console.log("INPUT", value);
  // }
  </script>
  
  <!-- <style scoped>
  .input {
    @apply border border-gray-200 p-2 rounded-md w-full;
  }
  </style> -->