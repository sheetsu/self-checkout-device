<template>
  <div class="cart-empty-state">
    <div class="cart-empty-state__content">
      <div class="cart-empty-state__state-object">
        <img
          src="@/assets/svg/CanteenEmptyState.svg"
          alt="Canteen empty state image"
        />
        <div class="cart-empty-state__texts-wrapper">
          <span class="text-h1 text-dark-700">Trochę tu pusto</span>
          <span class="text-body-l text-dark-700">
            Wygląda na to, że nie masz dodanych żadnych produktów.
          </span>
        </div>
        <DevicesButton
          label="Wróć do listy produktów"
          size="lg"
          color="primary"
          @click="goToMenu()"
        >
          <template #pre-icon>
            <BaseIcon name="chevron" direction="left" />
          </template>
        </DevicesButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import DevicesButton from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesButton.vue";
import BaseIcon from "@sheetsu/sl-frontend-packages/shared-icons/BaseIcon.vue";

const router = useRouter();

const goToMenu = (): void => {
  router.push({ name: "menu" });
};
</script>

<style lang="scss" scoped>
.cart-empty-state {
  padding: 0 $space-xxl;
  height: 100%;

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;

    height: calc(100% - $space-xxl);

    border-radius: $space-md;
    border: solid 1px var(--dark-100);
  }

  &__state-object {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 808px;
  }

  &__texts-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-lg;

    margin-top: $space-xxl;
    margin-bottom: 120px;
  }
}
</style>
