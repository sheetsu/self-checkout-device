<template>
  <div class="order-item">
    <div class="order-item__content-side">
      <span class="text-body-l">Mintaj z frytkai i surówką</span>
      <span class="text-h2 text-dark-700">19,00 zł</span>
    </div>
    <div class="order-item__delete">
      <BaseIcon name="remove" color="dark-500" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "@sheetsu/sl-frontend-packages/shared-icons/BaseIcon.vue";
</script>

<style lang="scss" scoped>
.order-item {
  display: flex;

  background-color: var(--neutral-white);

  &__content-side {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    padding: $space-xxl;
  }

  &__delete {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 112px;
    min-height: 100%;

    border-left: solid 1px var(--dark-100);
  }
}
</style>
