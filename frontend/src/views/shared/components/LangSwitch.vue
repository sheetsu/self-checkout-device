<template>
  <div class="lang-switch">
    <div class="lang-switch__button text-button-s">
      <BaseIcon name="flag-pl-color" size="small" />
      <span class="lang-switch__button-text">PL</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "@sheetsu/sl-frontend-packages/shared-icons/BaseIcon.vue";
</script>

<style lang="scss" scoped>
.lang-switch {
  &__button {
    display: flex;
    align-items: center;
    gap: $space-md;
    padding: $space-md $space-xl;

    cursor: pointer;
    background-color: var(--dark-400);
    border-radius: $space-xxl;
  }

  &__button-text {
    opacity: 0.8;
    color: var(--neutral-white);
  }
}
</style>
