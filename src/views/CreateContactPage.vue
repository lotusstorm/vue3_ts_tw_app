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
import { ref, computed, inject, watch, onBeforeMount } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useRouter } from "vue-router";

import AppTextInput from "@/components/AppTextInput.vue";
import AppButton from "@/components/AppButton.vue";

const LOCAL_STORAGE_KEY = "store";

interface localStorageData {
  firstName: string;
  lastName: string;
  userEmail: string;
}

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

onBeforeMount(() => {
  const data: localStorageData = getDataFromLocalStoreg(LOCAL_STORAGE_KEY);

  if (data) {
    firstName.value = data.firstName;
    lastName.value = data.lastName;
    userEmail.value = data.userEmail;
  }
});

watch([firstName, lastName, userEmail], ([firstName, lastName, userEmail]) => {
  setDataToLocalStoreg(LOCAL_STORAGE_KEY, {
    firstName,
    lastName,
    userEmail,
  });
});

const setDataToLocalStoreg = (key: string, data: object) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getDataFromLocalStoreg = (key: string) => {
  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  }

  return {};
};

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
          first_name: firstName.value,
          last_name: lastName.value,
          email: userEmail.value,
        },
      ],
    });

    setDataToLocalStoreg(LOCAL_STORAGE_KEY, {
      firstName: "",
      lastName: "",
      userEmail: "",
    });

    router.push({ name: "Contacts" });
  } catch (error) {
    console.error(error);
  } finally {
    isSubmiting.value = false;
  }
};
</script>
