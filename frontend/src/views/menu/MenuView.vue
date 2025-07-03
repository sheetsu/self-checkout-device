<template>
  <BaseLayout>
    <div class="menu-view">
      <HeaderWithHeading heading="Wybierz produkt z listy" />
      <div class="menu-view__main">
        <div class="menu-view__menu">
          <MenuItem v-for="i in 10" :key="i" :limit="5" />
        </div>
      </div>
      <div class="menu-view__footer">
        <SummaryPanel />
      </div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "@views/shared/layouts/BaseLayout.vue";
import MenuItem from "@views/menu/components/MenuItem.vue";
import HeaderWithHeading from "@views/shared/components/HeaderWithHeading.vue";
import SummaryPanel from "@views/menu/components/SummaryPanel.vue";
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

  &__footer {
  }
}
</style>
