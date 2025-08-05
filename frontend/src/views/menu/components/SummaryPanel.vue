<template>
  <div class="summary-panel">
    <div class="summary-panel__left-side">
      <div class="summary-panel__text-block">
        <span class="text-body-m text-dark-300">Liczba produktów</span>
        <span class="text-body-m text-dark-300">
          <NumberFlow :value="itemsCount" /> szt.
        </span>
      </div>
      <div class="summary-panel__text-block">
        <span class="text-h3 text-dark-700">Do zapłaty</span>
        <span class="text-h1 text-dark-700">
          <NumberFlow :value="cartTotalPrice" />
          {{ currency }}
        </span>
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
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@views/menu/subViews/cart/stores/cartStore";
import { formattedPrice } from "@/views/shared/helpers/formattedPrice";
import NumberFlow from "@number-flow/vue";
import { useGlobalStore } from "@/stores/globalStore/globalStore";

import DevicesButton from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesButton.vue";
import BaseIcon from "@sheetsu/sl-frontend-packages/shared-icons/BaseIcon.vue";

const router = useRouter();
const cartStore = useCartStore();
const globalStore = useGlobalStore();

const itemsCount = computed(() => cartStore.getters.itemsCount);
const cartTotalPrice = computed(
  () => formattedPrice(cartStore.getters.cartTotalPrice).value
);
const currency = computed(() => globalStore.state.currency);

const goToCart = (): void => {
  router.push({ name: "cart" });
};
</script>

<style lang="scss" scoped>
.summary-panel {
  display: flex;
  gap: $space-xxl;

  padding: $space-xl $space-xxl;

  overflow: hidden;
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
