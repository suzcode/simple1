<template>
    <tr>
      <TableCell :cellvalue="props.person.id" cellkey="id">
        {{ props.person.id }}
      </TableCell>
      <TableCell
        :cellvalue="props.person.jan"
        cellkey="jan"
        @changed="handleChange"
      >
        {{ props.person.jan }}
      </TableCell>
      <TableCell
        :cellvalue="props.person.feb"
        cellkey="feb"
        @changed="handleChange"
      >
        {{ props.person.feb }}
      </TableCell>
      <TableCell
        :cellvalue="props.person.mar"
        cellkey="mar"
        @changed="handleChange"
      >
        {{ props.person.mar }}
      </TableCell>
      <TableCell
        :cellvalue="props.person.apr"
        cellkey="apr"
        @changed="handleChange"
      >
        {{ props.person.apr }}
      </TableCell>
      <TableCell
        :cellvalue="props.person.may"
        cellkey="may"
        @changed="handleChange"
      >
        {{ props.person.may }}
      </TableCell>
      <TableCell
        :cellvalue="props.person.jun"
        cellkey="jun"
        @changed="handleChange"
      >
        {{ props.person.jun }}
      </TableCell>
      <TableCell
        :cellvalue="props.person.jul"
        cellkey="jul"
        @changed="handleChange"
      >
        {{ props.person.jul }}
      </TableCell>
      <TableCell
        :cellvalue="props.person.aug"
        cellkey="aug"
        @changed="handleChange"
      >
        {{ props.person.aug }}
      </TableCell>
      <TableCell
        :cellvalue="props.person.sep"
        cellkey="sep"
        @changed="handleChange"
      >
        {{ props.person.sep }}
      </TableCell>
      <TableCell
        :cellvalue="props.person.oct"
        cellkey="oct"
        @changed="handleChange"
      >
        {{ props.person.oct }}
      </TableCell>
      <TableCell
        :cellvalue="props.person.nov"
        cellkey="nov"
        @changed="handleChange"
      >
        {{ props.person.nov }}
      </TableCell>
      <TableCell
        :cellvalue="props.person.dec"
        cellkey="dec"
        @changed="handleChange"
      >
        {{ props.person.dec }}
      </TableCell>
    </tr>
  </template>
  
  <script setup lang="ts">
  import { defineAsyncComponent, defineProps, defineEmits } from "vue";
  import { EmittedValue, Person } from "../types/interfaces";
  const props = defineProps<{
    person: Person;
  }>();
  const emit = defineEmits<{ (e: "personupdated", value: EmittedValue): void }>();
  const TableCell = defineAsyncComponent(
    () => import(/*webpackChunkName:"tablecell"*/ "./table/TableCell.vue")
  );
  function handleChange(payload: EmittedValue) {
    payload.id = props.person.id;
    console.log(payload);
    emit("personupdated", payload);
  }
  </script>