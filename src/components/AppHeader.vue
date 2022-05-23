<template>
  <header
    class="text-md min-h-[62px] backdrop-blur-sm px-4 py-2 flex flex-row items-center justify-between"
  >
    <AppButton v-if="back" @click="emit('back')">
      <ArrowNarrowLeftIcon class="w-5" />
    </AppButton>
    <h1 class="absolute left-[50%] translate-x-[-50%]">{{ title }}</h1>
    <div class="ml-auto">
      <slot name="extension" />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, defineEmits } from "vue";
import AppButton from "@/components/AppButton.vue";
import { ArrowNarrowLeftIcon } from "@heroicons/vue/solid";

interface Props {
  title: string;
  back?: boolean;
}

withDefaults(defineProps<Props>(), {
  back: false,
});

const emit = defineEmits(["back"]);
</script>
