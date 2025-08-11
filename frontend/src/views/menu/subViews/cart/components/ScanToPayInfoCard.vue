<template>
  <div class="scan-to-pay-info-card">
    <div class="scan-to-pay-info-card__info-box">
      <span class="text-h1 text-info-700">Zeskanuj, aby zapłacić</span>
    </div>
    <span class="text-body-l text-dark-700">
      Użyj <b>karty</b> lub <b>bryloka pracowniczego</b>, lub
      <b>QR kodu</b>
    </span>
    <img
      class="scan-to-pay-info-card__image"
      src="@/assets/svg/Scan.svg"
      alt="Scan to pay image"
    />
  </div>
</template>

<style lang="scss" scoped>
@keyframes backgroundPulse {
  from {
    background-color: var(--info-100);
  }

  to {
    background-color: var(--info-300);
  }
}

.scan-to-pay-info-card {
  padding: $space-xxl;

  background-color: var(--neutral-white);
  border-radius: $space-md;

  text-align: center;

  &__info-box {
    padding: $space-xxl;
    margin-bottom: $space-lg;

    background-color: var(--info-100);
    animation: backgroundPulse 1.2s infinite alternate;
    border-radius: $space-md;

    text-align: center;
  }

  &__image {
    margin-top: $space-xxxl;
  }
}
</style>
