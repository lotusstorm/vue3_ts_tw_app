<template>
  <router-view />
</template>

<script setup lang="ts">
import { useReactiveProvider } from "@/composables/useContext";
import type { MainData } from "@/types/MainDataTypes.interface";

useReactiveProvider<MainData>({
  contactsList: [],
  firstName: "",
  lastName: "",
  email: "",
});
</script>
