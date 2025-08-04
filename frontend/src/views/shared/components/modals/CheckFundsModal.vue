<template>
  <q-dialog ref="dialogRef">
    <BaseDialogContent class="check-funds-modal" width="984px">
      <template #header><span class="text-h1">Cześć, Monika !</span></template>
      <template #body>
        <FundsStatus
          additional-funding-type="monthly"
          :funds-value="130"
          :funding-value="25"
          :max-monthly-funding-value="150"
        />
      </template>
      <template #footer>
        <DevicesButton label="Zamknij" outline @click="onDialogOK()" />
      </template>
    </BaseDialogContent>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from "quasar";
import BaseDialogContent from "@sheetsu/sl-frontend-packages/shared-components/BaseDialogContent.vue";
import DevicesButton from "@sheetsu/sl-frontend-packages/shared-devices/components/DevicesButton.vue";
import FundsStatus from "@views/shared/components/FundsStatus.vue";

const { dialogRef, onDialogOK } = useDialogPluginComponent();
</script>

<style lang="scss" scoped>
:deep(.dialog-content__header) {
  padding: $space-xxl $space-xxl $space-lg $space-xxl;
}

:deep(.dialog-content__body) {
  padding-left: $space-xxl;
  padding-right: $space-xxl;
}

:deep(.dialog-content__footer) {
  justify-content: flex-end;

  padding: $space-lg $space-xxl $space-xxl $space-xxl;

  box-shadow: none !important;
}

:deep(.dialog-content__footer .q-btn) {
  flex: none;
}
</style>
