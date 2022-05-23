<template>
  <ul class="h-[100%]">
    <li
      v-for="contact of contactsList"
      :key="contact.id"
      class="cursor-pointer mb-3 last:mb-0 px-5 py-2 rounded-full border-solid border-2 border-indigo-600 hover:text-white hover:bg-indigo-700"
    >
      {{ contact.title }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const contactsList = reactive([
  { id: 1, title: "contact-1" },
  { id: 2, title: "contact-2" },
  { id: 3, title: "contact-3" },
  { id: 4, title: "contact-4" },
  { id: 5, title: "contact-5" },
]);
</script>
