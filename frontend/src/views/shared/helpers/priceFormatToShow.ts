import { useGlobalStore } from "@/stores/globalStore/globalStore";

const globalStore = useGlobalStore();

export const priceFormatToShow = (formattedPrice: string): string => {
  if (!formattedPrice) return `0,00 ${globalStore.state.currency}`;
  let formattedNumber = formattedPrice.toString().replace(/\./g, ",");
  formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formattedNumber} ${globalStore.state.currency}`;
};
