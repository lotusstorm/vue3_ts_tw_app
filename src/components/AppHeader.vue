<template>
  <header>
    <button @click="$emit('back')"></button>
    <h1>{{ title }}</h1>
    <div>
      <slot />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

interface Props {
  title: string;
}

defineProps<Props>();

defineEmits(["back"]);
</script>
