<template>
  <div class="lang-switch">
    <DevicesSelect
      :key="selectedLanguage.label"
      :model-value="selectedLanguage?.shortcut"
      :options="userLanguagesOptions"
      behavior="menu"
      :selected-icon="`flag-${selectedLanguage.shortcut}-color`"
      @update:model-value="handleLanguageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { locales } from "@/i18n";
import { useGlobalStore } from "@/stores/globalStore/globalStore";

import DevicesSelect from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesSelect.vue";

const globalStore = useGlobalStore();

const selectedLanguage = computed(() => {
  return locales.find((locale) => locale.shortcut === globalStore.state.lang);
});

const userLanguagesOptions = computed(() => {
  return locales.map((locale) => {
    return {
      label: locale.label,
      value: locale.shortcut,
      icon: `flag-${locale.shortcut}-color`,
    };
  });
});

const handleLanguageChange = (lang: string) => {
  globalStore.actions.changeLanguage(lang);
};
</script>

<style lang="scss" scoped>
:deep(.q-field__control) {
  padding: $space-md $space-xl;
  height: auto;

  border-radius: 45px;
  background-color: var(--dark-400);
}

:deep(.q-field__native div) {
  color: var(--neutral-white);
  opacity: 0.8;
}

:deep(.q-field__append .base-icon) {
  fill: var(--neutral-white);
}
</style>
