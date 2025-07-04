<template>
  <BaseLayout>
    <div class="cart-view">
      <HeaderWithHeading heading="Potwierdź i zapłać" />
      <div class="cart-view__main">
        <div class="cart-view__order-summary">
          <div class="cart-view__order-items">
            <div
              ref="orderItemsScrollWrapper"
              class="cart-view__order-items-scroll-wrapper"
              @scroll="checkScroll()"
            >
              <OrderItem v-for="i in items" :key="i" />
            </div>
            <div
              v-if="items > 4 && showScrollOverlay"
              class="cart-view__more-items-overlay"
            />
          </div>
          <div class="cart-view__dashed-divider" />
          <div class="cart-view__payment-summary">
            <span class="text-h2 text-dark-700">Do zapłaty</span>
            <span class="text-h1 text-dark-700">49,00 zł</span>
          </div>
        </div>
        <ScanToPayInfoCard />
      </div>
      <div class="cart-view__footer">
        <DevicesButton label="Wróć do listy produktów" @click="goToMenu()">
          <template #pre-icon>
            <BaseIcon name="chevron" direction="left" color="primary-400" />
          </template>
        </DevicesButton>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref, type Ref, nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";

import BaseLayout from "@views/shared/layouts/BaseLayout.vue";
import DevicesButton from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesButton.vue";
import HeaderWithHeading from "@views/shared/components/HeaderWithHeading.vue";
import BaseIcon from "@sheetsu/sl-frontend-packages/shared-icons/BaseIcon.vue";
import OrderItem from "@views/menu/subViews/cart/components/OrderItem.vue";
import ScanToPayInfoCard from "@views/menu/subViews/cart/components/ScanToPayInfoCard.vue";

const router = useRouter();

const items: Ref<number> = ref(10);
const showScrollOverlay: Ref<boolean> = ref(false);
const orderItemsScrollWrapper: Ref<HTMLElement | null> = ref(null);

const checkScroll = (): void => {
  if (!orderItemsScrollWrapper.value) return;

  const el = orderItemsScrollWrapper.value;
  showScrollOverlay.value =
    el.scrollTop + el.clientHeight < el.scrollHeight - 1;
};

const goToMenu = (): void => {
  router.push({ name: "menu" });
};

onMounted((): void => {
  nextTick((): void => {
    checkScroll();
  });
});
</script>

<style lang="scss" scoped>
.cart-view {
  display: flex;
  flex-direction: column;

  height: 100%;

  &__main {
    flex: 1;

    padding: 0 $space-xxl;
  }

  &__order-summary {
    margin-bottom: $space-xxl;
  }

  &__order-items {
    position: relative;

    border-radius: $space-md;
    overflow: hidden;
  }

  &__order-items-scroll-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2px;

    max-height: 700px;

    overflow-y: auto;
  }

  &__more-items-overlay {
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 90px;

    background: linear-gradient(to top, var(--neutral-white), transparent);
  }

  &__dashed-divider {
    width: 98%;
    height: 2px;
    margin: 0 auto;

    background-image: repeating-linear-gradient(
      to right,
      var(--dark-100) 0 10px,
      transparent 10px 20px
    );
  }

  &__payment-summary {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: $space-xxl;

    border-radius: $space-md;
    background-color: var(--neutral-white);
  }

  &__footer {
    padding: 0 $space-xxl $space-xxl $space-xxl;
  }
}
</style>
