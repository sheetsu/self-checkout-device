<template>
  <router-view v-slot="{ Component }">
    <Transition mode="out-in" appear name="route">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<style lang="scss" scoped>
.route-enter-active,
.route-leave-active {
  transition: all 0.2s ease-in-out;
}

.route-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-10%);
}

.route-enter-from {
  opacity: 0;
  transform: translateX(10%);
}
.route-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
