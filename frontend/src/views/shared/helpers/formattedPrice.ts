import { priceFormatToShow } from "@views/shared/helpers/priceFormatToShow";

export const formattedPrice = (number: number): { displayValue: string; value: string } => {
  const price = (+number / 100).toFixed(2);
  return { displayValue: priceFormatToShow(price.toString()), value: price };
};
