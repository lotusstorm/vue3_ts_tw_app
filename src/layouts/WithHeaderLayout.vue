<template>
  <div class="font-semibold flex flex-auto flex-col h-screen container mx-auto">
    <AppHeader class="sticky top-0" :back="back" :title="title" @back="handleBackClick">
      <template #extension>
        <AppButton v-if="create" @click="handleAddClick">
          <PlusIcon class="w-5" />
        </AppButton>
      </template>
    </AppHeader>
    <main class="p-4 flex-auto">
      <router-view v-slot="{ Component, route }">
        <transition mode="out-in" :name="route.meta.transition">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { PlusIcon } from "@heroicons/vue/solid";

import AppHeader from "@/components/AppHeader.vue";
import AppButton from "@/components/AppButton.vue";

interface Props {
  title: string;
  back: boolean;
  create: boolean;
  backRoute: string;
}

const props = defineProps<Props>();

const router = useRouter();

const handleAddClick = () => router.push({ name: "CreateContact" });
const handleBackClick = () => {
  if (props.back) {
    router.push({ name: props.backRoute });
  }
};
</script>

<style>
.slide-left-enter-active {
  transition: all 0.2s ease-out;
}

.slide-left-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-left-enter-from {
  transform: translateX(30px);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

.slide-right-enter-active {
  transition: all 0.2s ease-out;
}

.slide-right-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-right-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
