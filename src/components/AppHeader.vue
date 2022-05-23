<template>
  <header
    class="text-md h-[62px] text-slate-900 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90 backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10 px-4 py-2 flex flex-row items-center justify-between"
  >
    <AppButton @click="emit('back')">
      <ArrowNarrowLeftIcon class="w-5" />
    </AppButton>
    <h1 class="absolute left-[50%] translate-x-[-50%]">{{ title }}</h1>
    <slot />
  </header>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import AppButton from "@/components/AppButton.vue";
import { ArrowNarrowLeftIcon } from "@heroicons/vue/solid";

interface Props {
  title: string;
}

defineProps<Props>();

const emit = defineEmits(["back"]);
</script>
