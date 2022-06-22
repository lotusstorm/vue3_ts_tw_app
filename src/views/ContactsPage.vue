<template>
  <ul class="h-full w-full">
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
import { useRouter } from "vue-router";
import { useReactiveContext } from "@/composables/useContext";
import type { MainData, Contact } from "@/types/MainDataTypes.interface";

const { store, setStore } = useReactiveContext<MainData>();
const router = useRouter();

const handleContactClick = (data: Contact) => {
  setStore({ key: "firstName", value: data.first_name });
  setStore({ key: "lastName", value: data.last_name });
  setStore({ key: "email", value: data.email });

  router.push({ name: "Main" });
};
</script>
