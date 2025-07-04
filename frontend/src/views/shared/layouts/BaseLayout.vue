<template>
  <div class="base-layout" :class="`base-layout--${theme}`">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { type PropType } from "vue";

defineProps({
  theme: {
    type: String as PropType<"dark" | "light">,
    default: "dark",
  },
});
</script>

<style lang="scss" scoped>
.base-layout {
  height: 100dvh;

  &--dark {
    background-color: var(--dark-15);
  }

  &--light {
    background-color: var(--neutral-white);
  }
}
</style>
