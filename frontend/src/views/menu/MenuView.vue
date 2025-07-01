<template>
  <BaseLayout>
    <div class="menu-view">
      <div class="menu-view__header">
        <img src="@/assets/svg/SmartlunchLogo.svg" alt="logo" />
        <LangSwitch />
      </div>
      <div class="menu-view__main">
        <span class="menu-view__menu-heading text-h1 text-dark-700">
          Wybierz produkt z listy
        </span>
        <div class="menu-view__menu">
          <MenuItem v-for="i in 10" :key="i" :limit="5" />
        </div>
      </div>
      <div class="menu-view__footer"></div>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from "@views/shared/layouts/BaseLayout.vue";
import MenuItem from "@views/menu/components/MenuItem.vue";
import LangSwitch from "@views/shared/components/LangSwitch.vue";
</script>

<style lang="scss" scoped>
.menu-view {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $space-xxl $space-xxl 0 $space-xxl;
  }

  &__main {
  }

  &__menu-heading {
    display: block;

    padding: 0 $space-xxl;
    margin-top: $space-xxxl;
    margin-bottom: $space-xxl;
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
