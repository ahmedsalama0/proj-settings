<template>
  <button
    @click="$emit('click')"
    :class="{
      'p-4 border-b-2': true,
      'border-transparent': !isActive,
      'border-b-blue-600 text-blue-600': isActive,
    }"
  >
    {{ tab.label }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Tab } from '../types.ts';

const isActive = computed(() => props.currentTab === props.tab.key);

const props = defineProps<{
  currentTab: string;
  tab: Tab;
}>();

defineEmits<{
  click: []; 
}>();
</script>
