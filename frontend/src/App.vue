<template>
  <router-view v-slot="{ Component }">
    <Transition mode="out-in" appear name="route">
      <template v-if="isOnline">
        <component :is="Component" />
      </template>
      <template v-else>
        <h1>Offline</h1>
      </template>
    </Transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSSE } from "@views/shared/composables/serverSourceEvent";
import { useQuasar } from "quasar";
import CheckFundsModal from "@views/shared/components/modals/CheckFundsModal.vue";
import PaymentModal from "@views/shared/components/modals/PaymentModal.vue";
import { useCartStore } from "@views/menu/subViews/cart/stores/cartStore";
import { useOnline } from "@vueuse/core";
import { useIdle } from "@vueuse/core";

const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const isOnline = useOnline();
const { idle } = useIdle(1000 * 60 * 1); // 1 minute

const baseSSEUrl = "http://localhost:4000/stream";

const { onMessage } = useSSE(baseSSEUrl);

onMessage((data) => {
  if (data.status !== 200) return;
  const { response } = data;

  if (route.name !== "cart") {
    $q.dialog({
      component: CheckFundsModal,
      componentProps: { userId: response.id, name: response.full_name },
    });
  } else {
    if (cartStore.getters.itemsCount === 0) return;
    $q.dialog({
      component: PaymentModal,
      componentProps: { userId: response.id },
    });
  }
});

watch(idle, (newVal: boolean) => {
  if (!newVal) return;
  cartStore.actions.clearCart();
  router.push({ name: "menu" });
});
</script>

<style lang="scss" scoped>
.route-enter-active,
.route-leave-active {
  transition: all 0.2s ease-in-out;
}

.route-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-10%);
}

.route-enter-from {
  opacity: 0;
  transform: translateX(10%);
}
.route-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
