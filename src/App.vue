<template>
  <router-view />
</template>

<script setup lang="ts">
import { useReactiveProvider } from "@/composables/useContext";

useReactiveProvider({
  contactsList: [],
  firstName: "",
  lastName: "",
  email: "",
});
</script>
