<template>
  <div class="summary-panel">
    <div class="summary-panel__left-side">
      <div class="summary-panel__text-block">
        <span class="text-body-m text-dark-300">Liczba produktów</span>
        <span class="text-body-m text-dark-300">0 szt.</span>
      </div>
      <div class="summary-panel__text-block">
        <span class="text-h3 text-dark-700">Do zapłaty</span>
        <span class="text-h1 text-dark-700">0,00 zł</span>
      </div>
    </div>
    <DevicesButton
      label="Dokończ zakupy"
      size="lg"
      color="primary"
      @click="goToCart()"
    >
      <template #post-icon>
        <BaseIcon name="chevron" direction="right" />
      </template>
    </DevicesButton>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import DevicesButton from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesButton.vue";
import BaseIcon from "@sheetsu/sl-frontend-packages/shared-icons/BaseIcon.vue";

const router = useRouter();

const goToCart = (): void => {
  router.push({ name: "cart" });
};
</script>

<style lang="scss" scoped>
.summary-panel {
  display: flex;
  gap: $space-xxl;

  padding: $space-xl $space-xxl;

  background-color: var(--neutral-white);

  &__left-side {
    display: flex;
    flex-direction: column;
    gap: $space-lg;
    flex: 1;
  }

  &__text-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
