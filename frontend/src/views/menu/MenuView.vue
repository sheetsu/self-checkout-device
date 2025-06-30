<template>
  <div>
    <DevicesButton
      size="sm"
      label="Test GET endpoint"
      @click="testGetEndpoint()"
    >
      <template #pre-icon>
        <BaseIcon name="user" />
      </template>
    </DevicesButton>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

import DevicesButton from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesButton.vue";
import BaseIcon from "@sheetsu/sl-frontend-packages/shared-icons/BaseIcon.vue";

const testGetEndpoint = async (): Promise<void> => {
  await axios.get("http://localhost:4000/api/hello");
};
</script>
