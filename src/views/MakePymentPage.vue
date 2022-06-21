<template>
  <div class="flex flex-col h-full">
    <AppSelect
      label="Select contact"
      placeholder="select contact"
      class="mb-2"
      :first-name="firstName"
      :last-name="lastName"
      :email="email"
      :error-masseges="v$.selected.$errors"
      @click="handleSelectClick"
      @clear="handleClearClick"
    />

    <!-- <AppSelect
      label="Select contact"
      placeholder="select contact"
      class="mb-2"
      :first-name="firstName"
      :last-name="lastName"
      :email="email"
      :error-masseges="v$.selected.$errors"
      @click="handleSelectClick"
      @clear="handleClearClick"
    /> -->

    <AppTextInput
      v-model="v$.amount.$model"
      :error-masseges="v$.amount.$errors"
      label="Enter amount"
      placeholder="amount"
      class="mb-2"
      @blur="v$.amount.$touch()"
    />

    <AppButton
      :disabled="v$.$invalid"
      :loading="isSubmiting"
      class="w-full mt-auto"
      @click="handleFormSubmit"
    >
      Pay
    </AppButton>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";
import { useReactiveContext } from "@/composables/useContext";

import AppSelect from "@/components/AppSelect.vue";
import AppButton from "@/components/AppButton.vue";
import AppTextInput from "@/components/AppTextInput.vue";
import type { MainData } from "@/types/MainDataTypes.interface";

const [store, setStore] = useReactiveContext<MainData>();

const { firstName, lastName, email } = toRefs(store);

const router = useRouter();

const amount = ref("");
const isSubmiting = ref(false);
const selected = computed(() => firstName && lastName && email);

const rules = computed(() => ({
  selected: {
    required,
  },
  amount: {
    required,
    numeric,
  },
}));

const v$ = useVuelidate(rules, { amount, selected });

const handleSelectClick = () => {
  router.push({ name: "Contacts" });
};

const handleClearClick = () => {
  setStore({ key: "firstName", value: "" });
  setStore({ key: "lastName", value: "" });
  setStore({ key: "email", value: "" });

  v$.value.selected.$touch();
};

const handleFormSubmit = async () => {
  try {
    isSubmiting.value = true;
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) return;
  } catch (error) {
    console.error(error);
  } finally {
    isSubmiting.value = false;
  }
};
</script>
