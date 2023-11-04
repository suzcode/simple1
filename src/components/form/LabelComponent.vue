<template>
    <label v-bind="$attrs" class="label">
      <slot />
    </label>
  </template>
  
  <!-- <style scoped>
  .label {
    @apply text-lg text-gray-700 font-semibold;
  }
  </style> -->