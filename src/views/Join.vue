<template>
  <div class="flex flex-1 w-full flex-col items-center justify-center min-h-screen bg-scaffold">
    <h1 class="text-4xl font-bold mb-4">Join Tripo group</h1>
    <p class="text-lg text-gray-700 mb-8">Join ID: {{ joinId }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  joinId: string
}>()
</script>
