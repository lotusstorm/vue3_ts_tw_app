<template>
  <button
    :type="type"
    class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-75"
    :disabled="disabled"
    @click="emit('click')"
  >
    <RefreshIcon v-if="loading" class="animate-spin w-5" />
    <slot v-else>Save</slot>
  </button>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, defineEmits } from "vue";
import type { ButtonHTMLAttributes } from "vue";
import { RefreshIcon } from "@heroicons/vue/solid";

interface Props {
  type?: ButtonHTMLAttributes["type"];
  loading?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: "button",
  loading: false,
  disabled: false,
});

const emit = defineEmits(["click"]);
</script>
