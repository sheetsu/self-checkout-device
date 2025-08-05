<template>
  <DevicesCard class="menu-item">
    <div class="menu-item__header">
      <span class="text-body-m text-dark-700 text-bold">
        {{ itemData.name }}
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
          :max="itemData.dishesLeft"
          v-if="amount > 0"
          v-model="amount"
        />
      </div>
      <span class="text-h2 text-dark-700">
        {{ formattedPrice(itemData.totalPriceCents).displayValue }}
      </span>
    </div>
  </DevicesCard>
</template>

<script setup lang="ts">
import { ref, type Ref, PropType, watch, onMounted } from "vue";
import type { MenuItem } from "@views/menu/models/MenuItem";
import { useCartStore } from "@views/menu/subViews/cart/stores/cartStore";
import { formattedPrice } from "@/views/shared/helpers/formattedPrice";

import DevicesCard from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesCard.vue";
import DevicesButton from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesButton.vue";
import DevicesNumericInput from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesNumericInput.vue";
import BaseIcon from "@sheetsu/sl-frontend-packages/shared-icons/BaseIcon.vue";

const cartStore = useCartStore();

const props = defineProps({
  itemData: {
    type: Object as PropType<MenuItem>,
    required: true,
  },
});

const amount: Ref<number> = ref(0);

const addItemToCart = (): void => {
  amount.value += 1;
};

const watchAmount = (): void => {
  watch(amount, (newVal: number, oldVal: number) => {
    if (newVal > oldVal) {
      cartStore.actions.addItem(props.itemData);
    } else if (newVal < oldVal) {
      cartStore.actions.removeItemByMenuItemId(props.itemData.id);
    }
  });
};

onMounted((): void => {
  amount.value = cartStore.state.addedMenuItems.reduce(
    (acc, item) => (item.item.id === props.itemData.id ? acc + 1 : acc),
    0
  );

  watchAmount();
});
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
