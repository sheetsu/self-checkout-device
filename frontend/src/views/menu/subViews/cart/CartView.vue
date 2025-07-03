<template>
  <BaseLayout>
    <div class="cart-view">
      <HeaderWithHeading heading="Potwierdź i zapłać" />
      <div class="cart-view__main">
        <DevicesCard>hello</DevicesCard>
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
import { useRouter } from "vue-router";

import BaseLayout from "@views/shared/layouts/BaseLayout.vue";
import DevicesButton from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesButton.vue";
import HeaderWithHeading from "@views/shared/components/HeaderWithHeading.vue";
import BaseIcon from "@sheetsu/sl-frontend-packages/shared-icons/BaseIcon.vue";
import DevicesCard from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesCard.vue";

const router = useRouter();

const goToMenu = (): void => {
  router.push({ name: "menu" });
};
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

  &__footer {
    padding: $space-xxl;
  }
}
</style>
