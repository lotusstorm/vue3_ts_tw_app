<template>
  <div class="flex flex-col flex-auto">
    <AppHeader class="sticky top-0" :title="title" @back="handleBackClick">
      <AppButton v-if="needCreate" @click="handleAddClick">
        <PlusIcon class="w-5" />
      </AppButton>
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
  needCreate: boolean;
}

defineProps<Props>();

const router = useRouter();

const handleBackClick = () => router.back();
const handleAddClick = () => router.push({ name: "CreateContact" });
</script>
