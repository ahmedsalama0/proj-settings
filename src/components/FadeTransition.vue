<template>
  <Transition mode="out-in" name="fade">
    <slot></slot>
  </Transition>
</template>

<script setup lang="ts"></script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
  /* transition: all 0.2s ease; */
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  /* scale: 125%; */
}
</style>
