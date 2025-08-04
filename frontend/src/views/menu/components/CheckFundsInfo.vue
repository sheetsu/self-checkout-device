<template>
  <div class="check-funds-info">
    <div class="check-funds-info__icon-container">
      <BaseIcon name="info-solid" color="info-700" />
    </div>
    <div class="check-funds-info__text-content">
      <span class="text-h2 text-info-700">Sprawdź swoje środki</span>
      <span class="text-body-m text-info-700">
        Zeskanuj kartę pracowniczą, brelok lub QR kod
      </span>
    </div>
    <img
      class="check-funds-info__image"
      src="@/assets/svg/Scan.svg"
      alt="Scan to check funds image"
    />
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "@sheetsu/sl-frontend-packages/shared-icons/BaseIcon.vue";
</script>

<style lang="scss" scoped>
.check-funds-info {
  display: flex;
  justify-items: center;

  padding: $space-xl $space-xxl;

  background-color: var(--info-100);

  &__icon-container {
    margin-top: 28px;
    margin-right: $space-md;
  }

  &__text-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: $space-md;
    flex: 1;
  }

  &__image {
    width: 262px;
  }
}
</style>
