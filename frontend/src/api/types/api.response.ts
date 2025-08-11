import type { MenuItem } from "@views/menu/models/MenuItem";

export type GetMenuItemsResponse = MenuItem[];

export type GetPaymentFundsResponse = {
  totalPaymentFundsCents: number,
  deductionLimitCents: number | null,
  canPlaceOrder: boolean,
  fundingSettings: {
    percentFundingOptions: number | null,
    dailyFundingCents: number | null,
    monthlyFundingCents: number | null
  }
};

export type CreateOrderResponse = {
  orderIds: number[],
  totalPriceCents: number,
  fundingCents: number,
  moneyBoxCents: number,
  smartlunchBonusCents: number,
  companyBonusCents: number,
  cafeBonusCents: number,
  deductionCents: number
};
