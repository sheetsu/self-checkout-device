<template>
  <div class="order-item">
    <div class="order-item__content-side">
      <span class="text-body-l">{{ itemData.name }}</span>
      <span class="text-h2 text-dark-700">
        {{ formattedPrice(itemData.totalPriceCents).displayValue }}
      </span>
    </div>
    <div class="order-item__delete cursor-pointer" @click="onRemove()">
      <BaseIcon name="remove" color="dark-500" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import type { MenuItem } from "@/views/menu/models/MenuItem";
import BaseIcon from "@sheetsu/sl-frontend-packages/shared-icons/BaseIcon.vue";
import { formattedPrice } from "@/views/shared/helpers/formattedPrice";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  itemData: {
    type: Object as PropType<MenuItem>,
    required: true,
  },
});

const emit = defineEmits<{
  onRemove: [id: number];
}>();

const onRemove = (): void => {
  emit("onRemove", props.id);
};
</script>

<style lang="scss" scoped>
.order-item {
  display: flex;

  background-color: var(--neutral-white);

  &:has(.order-item__delete:active) {
    background-color: var(--negative-100);
  }

  &__content-side {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    padding: $space-xxl;
  }

  &__delete {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 112px;
    min-height: 100%;

    border-left: solid 1px var(--dark-100);

    &:active {
      background-color: var(--negative-300);
    }
  }
}
</style>
