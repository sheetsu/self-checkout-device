import { useGlobalStore } from "@/stores/globalStore/globalStore";

export const priceFormatToShow = (formattedPrice: string): string => {
  const globalStore = useGlobalStore();
  if (!formattedPrice) return `0,00 ${globalStore.state.currency}`;
  let formattedNumber = formattedPrice.toString().replace(/\./g, ",");
  formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formattedNumber} ${globalStore.state.currency}`;
};
