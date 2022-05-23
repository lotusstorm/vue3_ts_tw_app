<template>
  <div class="flex flex-col">
    <span class="mb-2 text-sm text-slate-600">{{ label }}</span>
    <div
      class="min-h-[44px] cursor-pointer border-solid py-2 px-4 border-2 shadow-sm font-medium rounded-md hover:bg-silver-700"
      :class="{ 'border-red-500': isError }"
      @click="emit('click')"
    >
      <div
        v-if="isSelect"
        class="relative flex flex-col text-white rounded-md last:mb-0 px-5 py-2 bg-indigo-700"
      >
        <h2 class="text-md">{{ firstName }} {{ lastName }}</h2>
        <span class="text-sm">{{ email }}</span>
        <AppButton
          class="absolute top-[50%] translate-y-[-50%] right-4 rounded-full px-2 py-2 bg-white text-indigo-700 hover:bg-indigo-100"
          @click="emit('clear')"
        >
          <XIcon class="w-5" />
        </AppButton>
      </div>
      <span v-else-if="placeholder" class="text-sm text-slate-400">
        {{ placeholder }}
      </span>
    </div>
    <template v-if="isError">
      <span v-for="error of errorMasseges" :key="error.$uid" class="text-sm text-red-500">
        {{ error.$message }}
      </span>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, defineEmits, computed } from "vue";
import { ErrorObject } from "@vuelidate/core";

import { XIcon } from "@heroicons/vue/solid";
import AppButton from "@/components/AppButton.vue";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  label: string;
  placeholder?: string;
  errorMasseges?: ErrorObject[];
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  errorMasseges: () => [],
});

const emit = defineEmits(["click", "clear"]);

const isSelect = computed(() => props.firstName && props.lastName && props.email);
const isError = computed(() => props.errorMasseges.length > 0);
</script>
