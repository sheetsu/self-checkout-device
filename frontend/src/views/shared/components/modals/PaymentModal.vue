<template>
  <q-dialog maximized full-width ref="dialogRef">
    <BaseDialogContent class="payment-modal">
      <template #body>
        <div class="payment-modal__content">
          <div class="payment-modal__summary-header">
            <div class="payment-modal__summary-headings">
              <div class="payment-modal__summary-animation">
                <Vue3Lottie
                  :animation-data="modalAnimation"
                  :width="400"
                  :height="400"
                  :loop="false"
                />
              </div>
              <span class="text-h1 text-body-700">Płatność zaakceptowana</span>
              <span class="text-body-l text-dark-700">
                Możesz zabrać zakupy. Smacznego
              </span>
            </div>
          </div>
          <div v-if="!isError" class="payment-modal__summary-main">
            <span
              class="payment-modal__summary-main-heading text-h2 text-dark-700"
            >
              Środki wykorzystane
            </span>
            <div class="payment-modal__extra-funding">
              <div
                v-for="funding in extraFunding"
                :key="funding.name"
                class="payment-modal__single-funding"
                :class="[
                  funding.color && funding.icon
                    ? `payment-modal__single-funding--bg-${funding.color}`
                    : '',
                  {
                    'payment-modal__single-funding--filled':
                      funding.icon && funding.color,
                  },
                ]"
              >
                <div class="payment-modal__funding-icon-wrapper">
                  <BaseIcon
                    v-if="funding.icon"
                    :name="funding.icon"
                    :color="funding.color"
                  />
                  <span
                    class="text-body-m"
                    :class="`text-${funding.color}-700`"
                  >
                    {{ funding.name }}
                  </span>
                </div>
                <span class="text-body-m" :class="`text-${funding.color}-700`">
                  -{{ formattedPrice(funding.value).displayValue }}
                </span>
              </div>
            </div>
            <div class="payment-modal__divider" />
            <div class="payment-modal__summary-cost">
              <span class="text-body-m text-dark-700">Łączny koszt</span>
              <span class="text-h2 text-dark-700">
                -{{
                  formattedPrice(paymentResult?.totalPriceCents || 0)
                    .displayValue
                }}
              </span>
            </div>
          </div>
          <DevicesButton
            :label="isError ? 'Spróbuj ponownie' : 'Zamknij'"
            size="md"
            @click="isError ? onDialogOK() : goToMenu()"
          />
        </div>
      </template>
    </BaseDialogContent>
  </q-dialog>
</template>

<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import { useRouter } from "vue-router";
import { onMounted, type Ref, ref, computed } from "vue";
import { useDialogPluginComponent } from "quasar";
import BaseDialogContent from "@sheetsu/sl-frontend-packages/shared-components/BaseDialogContent.vue";
import { useGlobalStore } from "@/stores/globalStore/globalStore";
import { useCartStore } from "@views/menu/subViews/cart/stores/cartStore";
import { CreateOrderResponse } from "@/api/types/api.response";
import { useMenuStore } from "@views/menu/stores/menuStore";
import { formattedPrice } from "@views/shared/helpers/formattedPrice";
import successAnimation from "@/assets/lottie/success.json";
import errorAnimation from "@/assets/lottie/error.json";
import BaseIcon from "@sheetsu/sl-frontend-packages/shared-icons/BaseIcon.vue";
import { iconNames } from "@sheetsu/sl-frontend-packages/shared-icons/iconNames";
import DevicesButton from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesButton.vue";

type FundingItem = {
  name: string;
  value: number;
  icon?: iconNames;
  color?: "positive" | "info";
};

const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
});

const menuStore = useMenuStore();
const cartStore = useCartStore();
const globalStore = useGlobalStore();
const router = useRouter();
const { dialogRef, onDialogOK } = useDialogPluginComponent();

const paymentResult: Ref<CreateOrderResponse | null> = ref(null);
const isError = ref(false);

let extraFundingItems: Ref<FundingItem[]> = ref([]);

const modalAnimation = computed(() =>
  isError.value ? errorAnimation : successAnimation
);

const extraFunding = computed<FundingItem[]>(() => {
  return extraFundingItems.value.filter((item) => item.value > 0);
});

const fillExtraFundingItems = (): void => {
  extraFundingItems.value = [
    {
      name: "Rabat kredytowy",
      value: paymentResult.value!.companyBonusCents,
      icon: "discount",
      color: "info",
    },
    {
      name: "Dodatkowe dofinansowanie",
      value: paymentResult.value!.smartlunchBonusCents,
      icon: "bonus",
      color: "positive",
    },
    {
      name: "Dofinansowanie",
      value: paymentResult.value!.fundingCents,
      color: "positive",
    },
    {
      name: "Skarbonka",
      value: paymentResult.value!.moneyBoxCents,
    },
    {
      name: "Potrącenie z wynagrodzenia",
      value: paymentResult.value!.deductionCents,
    },
  ];
};

const goToMenu = (): void => {
  onDialogOK();
  router.push({ name: "menu" });
};

onMounted(async (): Promise<void> => {
  try {
    paymentResult.value = await globalStore.actions.createOrder({
      employeeId: props.userId,
      orderItems: cartStore.getters.orderItems,
    });
    fillExtraFundingItems();
    cartStore.actions.clearCart();
    await menuStore.actions.loadMenuItems();
  } catch (error) {
    isError.value = true;
    console.error("Error creating order: ", error);
  }
});
</script>

<style lang="scss" scoped>
.payment-modal {
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    height: 100%;
  }

  &__summary-header {
    display: flex;
    flex-direction: column;
    gap: $space-xxl;

    margin-bottom: 120px;
  }

  &__summary-headings {
    display: flex;
    flex-direction: column;
    gap: $space-lg;
    align-items: center;
  }

  &__summary-animation {
    $bg-color: #bdbddb;

    margin-bottom: $space-lg;

    background-color: rgba($bg-color, 0.1);
    border-radius: $space-xxl;
    border: dashed $space-xxs var(--dark-100);
  }

  &__summary-main {
    width: 100%;

    padding: $space-xxl;
    margin-bottom: $space-xxl;

    border-radius: $space-md;
    border: solid 1px var(--dark-100);
  }

  &__summary-main-heading {
    display: block;
    margin-bottom: $space-xxl;
  }

  &__extra-funding {
    display: flex;
    flex-direction: column;
    gap: $space-lg;
  }

  &__single-funding {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--bg-positive {
      background-color: var(--positive-100);
    }

    &--bg-info {
      background-color: var(--info-100);
    }

    &--filled {
      padding: $space-xxs $space-sm;
      border-radius: $space-sm;
    }
  }

  &__funding-icon-wrapper {
    display: flex;
    align-items: center;
    gap: $space-sm;
  }

  &__divider {
    width: 100%;
    height: 1px;

    margin: $space-lg 0;

    background-color: var(--dark-50);
  }

  &__summary-cost {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

:deep(.dialog-content__header) {
  padding: $space-xxl $space-xxl $space-lg $space-xxl;
}

:deep(.dialog-content__body) {
  padding-left: $space-xxl;
  padding-right: $space-xxl;
}

:deep(.dialog-content__footer) {
  justify-content: flex-end;

  padding: $space-lg $space-xxl $space-xxl $space-xxl;

  box-shadow: none !important;
}

:deep(.dialog-content__footer .q-btn) {
  flex: none;
}
</style>
