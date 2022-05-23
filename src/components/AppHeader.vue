<template>
  <header
    class="text-md min-h-[62px] backdrop-blur-sm px-4 py-2 flex flex-row items-center justify-between"
  >
    <div>
      <slot name="prepend" />
    </div>
    <h1 class="absolute left-[50%] translate-x-[-50%]">{{ title }}</h1>
    <div class="ml-auto">
      <slot name="append" />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

interface Props {
  title: string;
}

defineProps<Props>();
</script>
