<template>
  <BaseLayout>
    <div class="cart-view">
      <HeaderWithHeading heading="Potwierdź i zapłać" />
      <template v-if="itemsCount > 0">
        <div class="cart-view__main">
          <div class="cart-view__order-summary">
            <div class="cart-view__order-items">
              <div ref="orderItemsScrollWrapper" @scroll="checkScroll()">
                <TransitionGroup
                  class="cart-view__order-items-scroll-wrapper"
                  tag="div"
                  name="cart"
                >
                  <OrderItem
                    v-for="item in cartItems"
                    :key="item.id"
                    :id="item.id"
                    :item-data="item.item"
                    @on-remove="handleRemoveItem($event)"
                  />
                </TransitionGroup>
              </div>
              <div
                v-if="itemsCount > 4 && showScrollOverlay"
                class="cart-view__more-items-overlay"
              />
            </div>
            <div class="cart-view__dashed-divider" />
            <div class="cart-view__payment-summary">
              <span class="text-h2 text-dark-700">Do zapłaty</span>
              <span class="text-h1 text-dark-700">
                <NumberFlow :value="cartTotalPrice" />
                {{ currency }}
              </span>
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
      </template>
      <template v-else>
        <CartEmptyState />
      </template>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref, type Ref, nextTick, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@views/menu/subViews/cart/stores/cartStore";
import NumberFlow from "@number-flow/vue";
import { useGlobalStore } from "@/stores/globalStore/globalStore";

import BaseLayout from "@views/shared/layouts/BaseLayout.vue";
import DevicesButton from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesButton.vue";
import HeaderWithHeading from "@views/shared/components/HeaderWithHeading.vue";
import BaseIcon from "@sheetsu/sl-frontend-packages/shared-icons/BaseIcon.vue";
import OrderItem from "@views/menu/subViews/cart/components/OrderItem.vue";
import ScanToPayInfoCard from "@views/menu/subViews/cart/components/ScanToPayInfoCard.vue";
import CartEmptyState from "@views/menu/subViews/cart/components/CartEmptyState.vue";
import { formattedPrice } from "@/views/shared/helpers/formattedPrice";

const router = useRouter();
const cartStore = useCartStore();
const globalStore = useGlobalStore();

const showScrollOverlay: Ref<boolean> = ref(false);
const orderItemsScrollWrapper: Ref<HTMLElement | null> = ref(null);

const itemsCount = computed(() => cartStore.getters.itemsCount);
const cartItems = computed(() => cartStore.state.addedMenuItems);
const cartTotalPrice = computed(
  () => formattedPrice(cartStore.getters.cartTotalPrice).value
);
const currency = computed(() => globalStore.state.currency);

const checkScroll = (): void => {
  if (!orderItemsScrollWrapper.value) return;

  const el = orderItemsScrollWrapper.value;
  const scrollBottom = el.scrollTop + el.clientHeight;
  const distanceToBottom = el.scrollHeight - scrollBottom;
  showScrollOverlay.value = distanceToBottom > 0;
};

const handleRemoveItem = (id: number): void => {
  cartStore.actions.removeItem(id);
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
    overflow-x: hidden;
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

.cart-move,
.cart-enter-active,
.cart-leave-active {
  transition: all 0.4s ease-out;
}

.cart-enter-from,
.cart-leave-to {
  opacity: 0;
  transform: translateX(-150px);
}
</style>
