<template>
  <component
    :is="IconComponent"
    :id="id"
    :class="iconClasses"
    :style="{ fill: `${hexColor} !important` }"
  />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, PropType } from "vue";
import { iconNames } from "./iconNames";

const props = defineProps({
  name: {
    type: String as PropType<iconNames>,
    required: true,
  },
  id: {
    type: String,
    default: "",
  },
  // Colored icons need do have -color in the name like this: "blik-color"
  color: {
    type: String as PropType<
      | "primary"
      | "primary-400"
      | "primary-700"
      | "primary-800"
      | "dark-200"
      | "dark-300"
      | "dark-400"
      | "dark-700"
      | "info"
      | "info-100"
      | "info-700"
      | "info-900"
      | "info-300"
      | "warning"
      | "warning-100"
      | "warning-700"
      | "warning-900"
      | "negative"
      | "negative-700"
      | "positive"
      | "dark-100"
      | "dark-500"
      | "positive-100"
      | "positive-700"
      | "black"
      | "white"
      | "positive-900"
      | "dark"
      | "unset"
      | "negative-900"
    >,
    required: false,
    default: "black",
  },
  isStroke: {
    type: Boolean,
    default: false,
    required: false,
  },
  hexColor: {
    type: String,
    required: false,
  },
  size: {
    type: String as PropType<"small" | "medium" | "large" | "semi-x-large" | "x-large">,
    required: false,
    default: "large",
  },
  direction: {
    type: String as PropType<"right" | "left" | "up" | "down">,
    required: false,
  },
});

const IconComponent = computed(() => defineAsyncComponent(() => import(`./icons/${props.name}.svg?component`)));
const colorClass = computed(() => `is-${props.color}`);

const iconClasses = computed(() => {
  const classes = ["base-icon", `base-icon--${props.size}`];

  if (props.isStroke) {
    classes.push(`base-icon--is-${props.color}-stroke`);
  } else if (!props.hexColor) {
    classes.push(`base-icon--${colorClass.value}`);
  }

  if (props.direction) {
    classes.push(`base-icon--is-${props.direction}`);
  }

  return classes;
});
</script>

<style scoped lang="scss">
$icon-sizes: (
  "small": 16px,
  "medium": 20px,
  "large": 24px,
  "semi-x-large": 32px,
  "x-large": 48px,
);

$directions: (
  "is-right": 90deg,
  "is-left": -90deg,
  "is-up": 0deg,
  "is-down": 180deg,
);

$fill-colors: (
  "is-black": var(--neutral-black),
  "is-primary-800": var(--primary-800),
  "is-white": var(--neutral-white),
  "is-dark-200": var(--dark-200),
  "is-dark-300": var(--dark-300),
  "is-dark-500": var(--dark),
  "is-primary": var(--primary),
  "is-primary-700": var(--primary-700),
  "is-primary-400": var(--primary-400),
  "is-positive": var(--positive),
  "is-positive-100": var(--positive-100),
  "is-positive-700": var(--positive-700),
  "is-positive-900": var(--positive-900),
  "is-warning-100": var(--warning-100),
  "is-warning-900": var(--warning-900),
  "is-warning-700": var(--warning-700),
  "is-warning": var(--warning),
  "is-dark-400": var(--dark-400),
  "is-dark-100": var(--dark-100),
  "is-info": var(--info),
  "is-info-100": var(--info-100),
  "is-info-900": var(--info-900),
  "is-info-300": var(--info-300),
  "is-dark-700": var(--dark-700),
  "is-negative-700": var(--negative-700),
  "is-negative": var(--negative),
  "is-info-700": var(--info-700),
  "is-negative-900": var(--negative-900),
  "is-dark": var(--dark),
  "is-additional-700": var(--additional-700),
  "is-additional-100": var(--additional-100),
  "is-unset": transparent,
);

$stroke-colors: (
  "is-primary-stroke": var(--primary),
  "is-white-stroke": var(--neutral-white),
  "is-dark-200-stroke": var(--dark-200),
  "is-primary-800-stroke": var(--primary-800),
  "is-info-stroke": var(--info),
  "is-negative-stroke": var(--negative),
  "is-dark-700-stroke": var(--dark-700),
);

.base-icon {
  fill: $neutral-white;
  flex-shrink: 0;

  @each $name, $size in $icon-sizes {
    &--#{$name} {
      height: $size;
      width: $size;
      flex-shrink: 0 !important;
    }
  }

  @each $name, $rotation in $directions {
    &--#{$name} {
      transform: rotate($rotation);
      transition: transform 0.3s ease-in-out;
    }
  }

  @each $name, $color in $fill-colors {
    &--#{$name} {
      fill: if(str-index($name, "unset"), $color, $color);
    }
  }

  @each $name, $color in $stroke-colors {
    &--#{$name} {
      stroke: $color;
    }
  }
}
</style>
