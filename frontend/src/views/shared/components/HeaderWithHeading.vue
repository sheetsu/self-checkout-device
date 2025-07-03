<template>
  <div class="header-with-heading">
    <div class="header-with-heading__top-panel">
      <img src="@/assets/svg/SmartlunchLogo.svg" alt="logo" />
      <LangSwitch />
    </div>
    <span class="header-with-heading__heading text-h1 text-dark-700">
      {{ heading }}
    </span>
  </div>
</template>

<script setup lang="ts">
import LangSwitch from "@views/shared/components/LangSwitch.vue";

defineProps({
  heading: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.header-with-heading {
  padding: $space-xxl $space-xxl 0 $space-xxl;
  margin-bottom: $space-xxl;

  &__top-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__heading {
    display: block;

    margin-top: $space-xxxl;
  }
}
</style>
