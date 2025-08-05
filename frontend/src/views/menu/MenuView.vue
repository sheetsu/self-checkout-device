<template>
  <BaseLayout>
    <div class="menu-view">
      <HeaderWithHeading heading="Wybierz produkt z listy" />
      <div class="menu-view__main">
        <div class="menu-view__menu">
          <MenuItem
            v-for="item in menuItems"
            :key="item.id"
            :item-data="item"
          />
        </div>
      </div>
      <div class="menu-view__footer">
        <CheckFundsInfo />
        <SummaryPanel />
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useMenuStore } from "@views/menu/stores/menuStore";

import BaseLayout from "@views/shared/layouts/BaseLayout.vue";
import MenuItem from "@views/menu/components/MenuItem.vue";
import HeaderWithHeading from "@views/shared/components/HeaderWithHeading.vue";
import SummaryPanel from "@views/menu/components/SummaryPanel.vue";
import CheckFundsInfo from "@views/menu/components/CheckFundsInfo.vue";

const menuStore = useMenuStore();

const menuItems = computed(() => menuStore.state.menuItems);

const onInit = async (): Promise<void> => {
  await menuStore.actions.loadMenuItems();
};

onMounted(async () => {
  await onInit();
});
</script>

<style lang="scss" scoped>
.menu-view {
  display: flex;
  flex-direction: column;

  height: 100%;

  &__main {
    flex: 1;
  }

  &__menu {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-xs;

    max-height: 1064px;
    padding: 0 $space-xxl;

    overflow-y: auto;
  }
}
</style>
