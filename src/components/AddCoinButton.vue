<script setup lang="ts">
defineProps<{
  changeMode: () => void
}>()
</script>

<template>
  <button
    type="button"
    @click="() => changeMode()"
    class="text-yellow-dark font-medium px-4 rounded-md border-2 border-yellow-dark transition-all hover:bg-yellow-dark hover:text-primary">
    нова монета
  </button>
</template>
