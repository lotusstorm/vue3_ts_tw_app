<template>
  <div class="flex flex-col">
    <label class="flex flex-col">
      <span class="mb-2 text-sm text-slate-600">{{ label }}</span>
      <input
        v-model="value"
        :type="type"
        :placeholder="placeholder"
        class="placeholder:text-slate-400 placeholder:text-sm text-base inline-flex py-2 px-4 border-2 shadow-sm font-medium rounded-md hover:bg-silver-700 outline-none focus:border-indigo-500 invalid:border-red-500 required:border-red-500"
        :class="{ 'border-red-500 focus:border-red-500': isError }"
        :required="required"
        @blur="emit('blur')"
      />
    </label>
    <template v-if="isError">
      <span v-for="error of errorMasseges" :key="error.$uid" class="text-sm text-red-500">
        {{ error.$message }}
      </span>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ErrorObject } from "@vuelidate/core";
import { withDefaults, defineProps, defineEmits, computed, Ref } from "vue";

interface Props {
  label: string;
  modelValue: string | number | Ref<string | number>;
  type?: string;
  errorMasseges?: ErrorObject[];
  placeholder?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  errorMasseges: () => [],
  placeholder: "",
  required: false,
});

const emit = defineEmits(["update:modelValue", "blur"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const isError = computed(() => props.errorMasseges.length > 0);
</script>
