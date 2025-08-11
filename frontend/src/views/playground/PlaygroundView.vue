<template>
  <!-- Test your code here ... -->
  <DevicesButton label="Test endpoint" @click="testEndpoint()" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import DevicesButton from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesButton.vue";

import api from "@/api/client";

const eventSource = ref<EventSource | null>(null);

const testEndpoint = async (): Promise<void> => {
  await api.get("hello");
};

const startSSE = (): void => {
  if (eventSource.value) {
    console.log("SSE connection already exists");
    return;
  }

  const baseUrl = "http://localhost:4000";
  const sseUrl = `${baseUrl}/stream`;

  console.log("Creating new SSE connection to:", sseUrl);
  eventSource.value = new EventSource(sseUrl);

  eventSource.value.onmessage = (event) => {
    console.log("SSE message received:", JSON.parse(event.data));
  };

  eventSource.value.onerror = (event) => {
    console.error("SSE error:", event);
    console.error("ReadyState:", eventSource.value?.readyState);
    console.error("EventSource error event:", event);

    // Check if connection is being retried
    if (eventSource.value?.readyState === EventSource.CONNECTING) {
      console.warn("SSE is trying to reconnect...");
    }
  };
};

const stopSSE = (): void => {
  if (eventSource.value) {
    eventSource.value.close();
    eventSource.value = null;
    console.log("SSE connection closed");
  }
};

onMounted(() => {
  startSSE();
});

onUnmounted(() => {
  stopSSE();
});
</script>
