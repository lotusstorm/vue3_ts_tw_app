<template>
  <ul class="h-[100%]">
    <li
      v-for="contact of store.contactsList"
      :key="contact.id"
      class="flex flex-col cursor-pointer mb-3 last:mb-0 px-5 py-2 rounded-md border-solid border-2 border-indigo-600 hover:text-white hover:bg-indigo-700"
      @click="handleContactClick(contact)"
    >
      <h2 class="text-md">{{ contact.first_name }} {{ contact.last_name }}</h2>
      <span class="text-sm">{{ contact.email }}</span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

const { store, mutation } = inject("store") || {};
const router = useRouter();

const handleContactClick = ({ first_name = "", last_name = "", email = "" } = {}) => {
  mutation({ firstName: first_name, lastName: last_name, email: email });
  router.push({ name: "Main" });
};
</script>
