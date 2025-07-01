<template>
  <DevicesCard class="menu-item">
    <div class="menu-item__header">
      <span class="text-body-m text-dark-700 text-bold">
        Mintaj z frytkami i surówką
      </span>
    </div>
    <div class="menu-item__main">
      <div class="menu-item__add-item">
        <DevicesButton
          v-if="amount <= 0"
          class="menu-item__button"
          label="Dodaj"
          @click="addItemToCart()"
        >
          <template #pre-icon>
            <BaseIcon name="plus" color="primary" />
          </template>
        </DevicesButton>
        <DevicesNumericInput
          :min="0"
          :max="limit"
          v-if="amount > 0"
          v-model="amount"
        />
      </div>
      <span class="text-h2 text-dark-700">19,00 zł</span>
    </div>
  </DevicesCard>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";

import DevicesCard from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesCard.vue";
import DevicesButton from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesButton.vue";
import DevicesNumericInput from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesNumericInput.vue";

import BaseIcon from "@sheetsu/sl-frontend-packages/shared-icons/BaseIcon.vue";

defineProps({
  limit: {
    type: Number,
    required: true,
  },
});

const amount: Ref<number> = ref(0);

const addItemToCart = (): void => {
  amount.value += 1;
};
</script>

<style lang="scss" scoped>
.menu-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 260px;
  width: 100%;

  outline: none;
  background-color: var(--neutral-white);

  &__header {
  }

  &__main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__add-item {
    display: flex;

    min-width: 216px;
  }

  &__button {
    width: 100%;
  }
}
</style>
