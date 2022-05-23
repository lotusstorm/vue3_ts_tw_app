<template>
  <form class="flex flex-col h-full" @submit.prevent="handleFormSubmit">
    <AppTextInput
      v-model="v$.firstName.$model"
      :error-masseges="v$.firstName.$errors"
      label="First Name"
      placeholder="First Name"
      class="mb-2"
    />
    <AppTextInput
      v-model="v$.lastName.$model"
      :error-masseges="v$.lastName.$errors"
      label="Last Name"
      placeholder="Last Name"
      class="mb-2"
    />
    <AppTextInput
      v-model="v$.userEmail.$model"
      :error-masseges="v$.userEmail.$errors"
      label="Email"
      placeholder="Email"
      class="mb-2"
    />
    <AppButton
      :disabled="v$.$invalid"
      :loading="isSubmiting"
      type="submit"
      class="w-full mt-auto"
    />
  </form>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

import AppTextInput from "@/components/AppTextInput.vue";
import AppButton from "@/components/AppButton.vue";

const firstName = ref("");
const lastName = ref("");
const userEmail = ref("");
const isSubmiting = ref(false);

const rules = computed(() => ({
  firstName: {
    required,
  },
  lastName: {
    required,
  },
  userEmail: {
    required,
    email,
  },
}));

const v$ = useVuelidate(rules, { firstName, lastName, userEmail });

const handleFormSubmit = async () => {
  try {
    isSubmiting.value = true;
    const isFormCorrect = await v$.value.$validate();
    // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
    console.log(isFormCorrect, "isFormCorrect");
    if (!isFormCorrect) return;
  } catch (error) {
    console.error(error);
  } finally {
    isSubmiting.value = false;
  }
};
</script>
