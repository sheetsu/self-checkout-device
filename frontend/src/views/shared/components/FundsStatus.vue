<template>
  <div
    class="funds-status"
    :class="{ 'funds-status--not-enough-funds': notEnoughFunds }"
  >
    <div class="funds-status__main-funds-container">
      <div class="funds-status__your-funds-wrapper">
        <span
          class="text-h2"
          :class="notEnoughFunds ? 'text-negative-700' : 'text-dark-700'"
        >
          Twoje środki:
        </span>
        <div class="funds-status__funds-value">
          <BaseIcon v-if="notEnoughFunds" name="warning" color="negative-700" />
          <span
            class="text-h1"
            :class="notEnoughFunds ? 'text-negative-700' : 'text-dark-700'"
          >
            {{ fundsValue }} zł
          </span>
        </div>
      </div>
      <div v-if="notEnoughFunds" class="funds-status__not-enough-funds-message">
        <span class="text-negative-700 text-body-m">
          Nie masz wystarczająco środków. Doładuj Skarbonkę.
        </span>
      </div>
      <div
        v-if="!notEnoughFunds && additionalFundingType !== ''"
        class="funds-status__additional-funding-container"
      >
        <div
          v-if="additionalFundingType === 'percentage-monthly'"
          class="funds-status__single-additional-funding"
        >
          <span class="text-body-m">Oraz dofinansowanie 50% posiłku</span>
          <span class="text-body-m">
            <b>do {{ fundingValue }} zł</b>
          </span>
        </div>
        <div class="funds-status__separator" />
        <div
          v-if="additionalFundingType === 'percentage-monthly'"
          class="funds-status__single-additional-funding"
        >
          <span class="text-body-m">
            Maks. miesięcznie <b>{{ maxMonthlyFundingValue }} zł</b>
          </span>
        </div>
        <div
          v-if="additionalFundingType === 'daily'"
          class="funds-status__single-additional-funding"
        >
          <span class="text-body-m">W tym dofinansowanie dzienne</span>
          <span class="text-body-m">{{ fundingValue }} zł</span>
        </div>
        <div
          v-if="additionalFundingType === 'monthly'"
          class="funds-status__single-additional-funding"
        >
          <span class="text-body-m">W tym dofinansowanie miesięczne</span>
          <span class="text-body-m">{{ fundingValue }} zł</span>
        </div>
        <div
          v-if="additionalFundingType === 'percentage'"
          class="funds-status__single-additional-funding"
        >
          <span class="text-body-m">Oraz dofinansowanie</span>
          <span class="text-body-m">50% kwoty posiłku</span>
        </div>
      </div>
    </div>
    <div v-if="deductionLimit > 0" class="funds-status__deduction-limit">
      <span class="text-dark-700 text-h2">Limit potrąceń z wynagrodzenia</span>
      <span class="text-dark-700 text-h1">{{ deductionLimit }} zł</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import BaseIcon from "@sheetsu/sl-frontend-packages/shared-icons/BaseIcon.vue";

defineProps({
  notEnoughFunds: {
    type: Boolean,
    default: false,
  },
  fundsValue: {
    type: Number,
    default: 0,
  },
  deductionLimit: {
    type: Number,
    default: 0,
  },
  additionalFundingType: {
    type: String as PropType<
      "daily" | "monthly" | "percentage" | "" | "percentage-monthly"
    >,
    default: "",
  },
  fundingValue: {
    type: Number,
    default: 0,
  },
  maxMonthlyFundingValue: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="scss" scoped>
.funds-status {
  $self: &;
  display: flex;
  flex-direction: column;
  gap: $space-xxl;

  &__main-funds-container {
    padding: $space-lg;

    border-radius: $space-md;
    border: 1px solid var(--dark-100);

    #{ $self }--not-enough-funds & {
      background-color: var(--negative-100);
      border: 0;
    }
  }

  &__your-funds-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__funds-value {
    display: flex;
    align-items: center;
    gap: $space-md;
  }

  &__not-enough-funds-message {
    margin-top: $space-lg;
  }

  &__additional-funding-container {
    margin-top: $space-xxl;
  }

  &__deduction-limit {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: $space-lg;

    border-radius: $space-md;
    border: 1px solid var(--dark-100);
  }

  &__single-additional-funding {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__separator {
    width: 100%;
    height: 1px;

    margin: $space-md 0;

    background-color: var(--dark-50);
  }
}
</style>
