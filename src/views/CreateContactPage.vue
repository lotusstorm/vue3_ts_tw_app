<template>
  <form class="flex flex-col w-full h-full" @submit.prevent="handleFormSubmit">
    <AppTextInput
      v-model="v$.firstName.$model"
      :error-masseges="v$.firstName.$errors"
      label="First Name"
      placeholder="First Name"
      class="mb-2"
      @blur="v$.firstName.$touch()"
    />
    <AppTextInput
      v-model="v$.lastName.$model"
      :error-masseges="v$.lastName.$errors"
      label="Last Name"
      placeholder="Last Name"
      class="mb-2"
      @blur="v$.lastName.$touch()"
    />
    <AppTextInput
      v-model="v$.userEmail.$model"
      :error-masseges="v$.userEmail.$errors"
      label="Email"
      placeholder="Email"
      class="mb-2"
      @blur="v$.userEmail.$touch()"
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
import { ref, computed, inject } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useRouter } from "vue-router";

import AppTextInput from "@/components/AppTextInput.vue";
import AppButton from "@/components/AppButton.vue";

const { store, mutation } = inject("store") || {};
const router = useRouter();

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
    if (!isFormCorrect) return;

    mutation({
      contactsList: [
        ...store.contactsList,
        {
          id: Math.random(),
          first_name: firstName,
          last_name: lastName,
          email: userEmail,
        },
      ],
    });

    router.push({ name: "Contacts" });
  } catch (error) {
    console.error(error);
  } finally {
    isSubmiting.value = false;
  }
};
</script>
