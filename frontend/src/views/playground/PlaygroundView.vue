<template>
  <!-- Test your code here ... -->
  <DevicesButton label="Test endpoint" @click="testEndpoint()" />
</template>

<script setup lang="ts">
import DevicesButton from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesButton.vue";

import api from "@/api/client";

const testEndpoint = async (): Promise<void> => {
  await api.get("hello");
};
</script>
